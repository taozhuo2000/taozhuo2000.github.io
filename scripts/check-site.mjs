#!/usr/bin/env node
// Run against an already-built local preview:
// PLAYWRIGHT_MODULE=/path/to/playwright node scripts/check-site.mjs http://127.0.0.1:4000
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = new URL(process.argv[2] || 'http://127.0.0.1:4000');
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
const failures = [];
let assertions = 0;

function check(condition, message, detail = '') {
  assertions += 1;
  if (!condition) failures.push(`${message}${detail ? `: ${detail}` : ''}`);
}

async function newPage(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  page.on('pageerror', error => failures.push(`JavaScript error at ${page.url()}: ${error.message}`));
  page.on('response', response => {
    if (new URL(response.url()).origin === base.origin && response.status() >= 400) {
      failures.push(`HTTP ${response.status()} ${response.url()}`);
    }
  });
  // Local functionality should remain usable independently of optional CDN resources.
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.protocol.startsWith('http') && url.origin !== base.origin ? route.abort() : route.continue();
  });
  return { page, context };
}

async function navigate(page, path, initialized = true) {
  await page.goto(new URL(path, base).href, { waitUntil: 'load' });
  if (initialized) await page.locator('.navigation-ready').waitFor();
}

async function theme(page) {
  return await page.locator('html').getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

try {
  for (const locale of ['', '/zh']) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const { page, context } = await newPage({ viewport: { width, height: 900 }, colorScheme: 'light' });
      const label = `${locale || 'en'} ${width}px`;
      await navigate(page, `${locale}/`);
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(image => {
          image.loading = 'eager';
          return image.decode().catch(() => {});
        }));
      });
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        mainCount: document.querySelectorAll('main').length,
        h1Count: document.querySelectorAll('h1').length,
        brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
        emptyLinks: [...document.querySelectorAll('a')].filter(link => !link.textContent.trim() && !link.getAttribute('aria-label') && !link.querySelector('img[alt]')).map(link => link.outerHTML),
      }));
      check(metrics.scrollWidth <= metrics.width, `${label} horizontal overflow`, JSON.stringify(metrics));
      check(metrics.h1Count === 1 && metrics.mainCount === 1, `${label} page landmarks`, JSON.stringify(metrics));
      check(metrics.brokenImages.length === 0, `${label} broken images`, metrics.brokenImages.join(', '));
      check(metrics.emptyLinks.length === 0, `${label} unnamed links`, metrics.emptyLinks.join(', '));

      if (width <= 760) {
        const menu = page.locator('#site-menu');
        const toggle = page.locator('.site-menu-toggle');
        check(!await menu.isVisible(), `${label} menu starts collapsed`);
        await toggle.click();
        check(await menu.isVisible() && await toggle.getAttribute('aria-expanded') === 'true', `${label} menu opens`);
        check(await page.evaluate(() => document.activeElement === document.querySelector('#site-menu a')), `${label} menu focuses first link`);
        await page.keyboard.press('Escape');
        check(!await menu.isVisible() && await toggle.getAttribute('aria-expanded') === 'false', `${label} Escape closes menu`);
        check(await toggle.evaluate(element => document.activeElement === element), `${label} Escape restores focus`);
        await toggle.click();
        const mastheadBox = await page.locator('.masthead').boundingBox();
        await page.mouse.click(width - 8, mastheadBox.y + mastheadBox.height + 20);
        check(!await menu.isVisible(), `${label} outside click closes menu`);
        await toggle.click();
        await menu.locator('a').first().click();
        check(!await menu.isVisible(), `${label} link click closes menu`);
        await page.locator('.site-menu-toggle').click();
        await page.setViewportSize({ width: 1024, height: 900 });
        await page.waitForFunction(() => document.querySelector('.site-menu-toggle').getAttribute('aria-expanded') === 'false');
        check(await toggle.getAttribute('aria-expanded') === 'false', `${label} desktop resize resets menu`);
      } else {
        check(await page.locator('#site-menu').isVisible(), `${label} desktop navigation visible`);
      }
      await context.close();
      console.log(`Checked ${label}`);
    }
  }

  const { page: linksPage, context: linksContext } = await newPage();
  const destinations = new Set();
  for (const locale of ['', '/zh']) {
    await navigate(linksPage, `${locale}/`);
    const localLinks = await linksPage.locator('a[href]').evaluateAll(elements => elements.map(element => element.href));
    for (const href of localLinks) {
      const url = new URL(href);
      if (url.origin === base.origin) destinations.add(url.href);
    }
    const publication = linksPage.locator('.publication-card__title a, .publication-card h3 a, .publication-card h2 a').first();
    check(await publication.count() > 0, `${locale || 'en'} publication detail link exists`);
    if (await publication.count()) {
      await publication.click();
      check(new URL(linksPage.url()).pathname.startsWith(`${locale}/publication/`), `${locale || 'en'} publication detail route`, linksPage.url());
      const detailPath = new URL(linksPage.url()).pathname;
      await linksPage.locator('.language-switcher__btn').click();
      check(new URL(linksPage.url()).pathname === (locale ? detailPath.replace(/^\/zh/, '') : `/zh${detailPath}`), `${locale || 'en'} publication language switch pairs detail routes`, linksPage.url());
    }
    await navigate(linksPage, `${locale}/`);
    await linksPage.locator('.writing-item h3 a').first().click();
    check(new URL(linksPage.url()).pathname.startsWith(`${locale}/blog/`), `${locale || 'en'} blog detail route`, linksPage.url());
    const hreflangLinks = await linksPage.locator('link[rel="alternate"][hreflang]').evaluateAll(elements => elements.map(element => element.href));
    for (const href of hreflangLinks) {
      const url = new URL(href);
      // Production canonical hosts are valid in a statically served build.
      destinations.add(new URL(url.pathname + url.search + url.hash, base).href);
    }
    const blogPath = new URL(linksPage.url()).pathname;
    await linksPage.locator('.language-switcher__btn').click();
    check(new URL(linksPage.url()).pathname === (locale ? blogPath.replace(/^\/zh/, '') : `/zh${blogPath}`), `${locale || 'en'} blog language switch pairs detail routes`, linksPage.url());
  }
  for (const href of destinations) {
    const url = new URL(href);
    const response = await linksPage.request.get(href);
    check(response.ok(), 'Local link resolves', `${response.status()} ${href}`);
    if (url.hash && response.ok()) {
      await navigate(linksPage, url.pathname);
      check(await linksPage.evaluate(id => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1))), 'Local anchor exists', href);
    }
  }
  await linksContext.close();
  console.log(`Checked ${destinations.size} local destinations`);

  const { page: themePage, context: themeContext } = await newPage({ colorScheme: 'dark' });
  await navigate(themePage, '/');
  check(await theme(themePage) === 'dark', 'Initial OS dark preference applies');
  await themePage.emulateMedia({ colorScheme: 'light' });
  await themePage.waitForFunction(() => document.documentElement.getAttribute('data-theme') !== 'dark');
  check(await theme(themePage) === 'light', 'OS changes apply before user choice');
  await themePage.locator('#theme-toggle').click();
  check(await theme(themePage) === 'dark', 'Theme toggle sets dark');
  await themePage.reload({ waitUntil: 'load' });
  await themePage.locator('.navigation-ready').waitFor();
  check(await theme(themePage) === 'dark', 'Explicit theme persists on reload');
  await themePage.emulateMedia({ colorScheme: 'dark' });
  await themePage.emulateMedia({ colorScheme: 'light' });
  check(await theme(themePage) === 'dark', 'OS changes preserve user choice');
  await navigate(themePage, '/zh/');
  check(await theme(themePage) === 'dark', 'Explicit theme persists across languages');
  await themeContext.close();

  const { page: blockedPage, context: blockedContext } = await newPage({ colorScheme: 'dark' });
  await blockedContext.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Storage blocked', 'SecurityError'); } });
  });
  await navigate(blockedPage, '/');
  check(await theme(blockedPage) === 'dark', 'Blocked storage honors OS preference');
  await blockedPage.locator('#theme-toggle').click();
  check(await theme(blockedPage) === 'light', 'Blocked storage allows theme switching');
  await blockedContext.close();

  for (const locale of ['', '/zh']) {
    const { page, context } = await newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
    await navigate(page, `${locale}/`, false);
    check(await page.locator('#site-menu').isVisible(), `${locale || 'en'} no-JavaScript navigation visible`);
    check(!await page.locator('.site-menu-toggle').isVisible(), `${locale || 'en'} no-JavaScript menu button hidden`);
    check(!await page.locator('#theme-toggle').isVisible(), `${locale || 'en'} no-JavaScript theme button hidden`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${locale || 'en'} no-JavaScript no overflow`);
    await page.locator('#site-menu a').nth(1).click();
    check(new URL(page.url()).origin === base.origin, `${locale || 'en'} no-JavaScript navigation works`);
    await context.close();
  }
} catch (error) {
  failures.push(error.stack || error.message);
} finally {
  await browser.close();
}

console.log(`\n${assertions} assertions; ${failures.length} failures.`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exitCode = 1;
}
