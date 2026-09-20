/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs
const PLOTLY_URL = "https://cdn.jsdelivr.net/npm/plotly.js@3.6.0/dist/plotly.min.js";
const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
let themePreference = readThemePreference();

function readThemePreference() {
  try {
    const storedTheme = window.localStorage.getItem('theme');
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'system';
  } catch (error) {
    return 'system';
  }
}

// Determine the computed theme, which can be "dark" or "light".
function determineComputedTheme() {
  return themePreference === 'system'
    ? (systemTheme && systemTheme.matches ? 'dark' : 'light')
    : themePreference;
}

// Set the theme on page load or when explicitly called
function setTheme(theme) {
  const useDark = (theme || determineComputedTheme()) === 'dark';
  const root = document.documentElement;
  if (useDark) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  const button = document.getElementById('theme-toggle');
  if (button) button.setAttribute('aria-pressed', String(useDark));
}

// Toggle the theme manually
function toggleTheme() {
  themePreference = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  try {
    window.localStorage.setItem('theme', themePreference);
  } catch (error) {
    // Keep the choice for this page even when browser storage is blocked.
  }
  setTheme();
  redrawPlotly();
}

function initializeNavigation() {
  const navigation = document.querySelector('.site-navigation');
  if (!navigation) return;
  const toggle = navigation.querySelector('.site-menu-toggle');
  const menu = document.getElementById('site-menu');
  if (!toggle || !menu) return;

  function setOpen(open, restoreFocus) {
    navigation.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    setOpen(willOpen);
    // The collapsed list precedes the compact controls in the desktop layout.
    // Start at its first link so keyboard users can continue through the menu.
    const firstLink = menu.querySelector('a');
    if (willOpen && firstLink) firstLink.focus();
  });
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (!navigation.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false, navigation.contains(document.activeElement));
    }
  });
  navigation.addEventListener('focusout', function (event) {
    if (event.relatedTarget && !navigation.contains(event.relatedTarget)) setOpen(false);
  });
  if (window.matchMedia) {
    const mobile = window.matchMedia('(max-width: 760px)');
    const closeOnResize = function () { setOpen(false); };
    if (mobile.addEventListener) mobile.addEventListener('change', closeOnResize);
    else if (mobile.addListener) mobile.addListener(closeOnResize);
  }
  navigation.classList.add('navigation-ready');
}

// Defer the loading of Mermaid to only if there is a field on the page to be rendered
let mermaidElements = document.querySelectorAll("pre>code.language-mermaid");
if (mermaidElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Append the Mermaid module to the DOM
    const moduleScript = document.createElement('script');
    moduleScript.type = 'module';
    moduleScript.textContent = `
      import mermaid from '${MERMAID_URL}';
      mermaid.initialize({startOnLoad:true, theme:'default'});
      await mermaid.run({querySelector:'code.language-mermaid'});
    `;
    document.body.appendChild(moduleScript);
  });
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is
// actually present on the page.
//
// NOTE that plotlyDarkLayout and plotlyLightLayout will be exposed in the minimized file
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", function() {
    // Return if not ready
    if (document.readyState !== "complete") {
      return;
    }

    // Prepare to load Plotly from the CDN
    const script = document.createElement('script');
    script.src = PLOTLY_URL;
    script.async = true;

    // Once loaded, update the page elements to work with it
    script.onload = function() {
      plotlyElements.forEach(function(elem) {
        // Parse the Plotly JSON data and hide it
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
        }
        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }

    // Add the script to the document
    document.head.appendChild(script);
  });
}

function redrawPlotly() {
  if (typeof Plotly === 'undefined') return;
  plotlyElements.forEach(function(elem) {
    // Parse the Plotly JSON data
    let jsonData = JSON.parse(elem.textContent);

    // Get the Plotly node
    let chartElement = $(elem).parent().next().get(0);
    if (!chartElement) return;

    // Set the theme for the plot and render it
    const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
    if (jsonData.layout) {
      jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
    } else {
      jsonData.layout = { template: theme };
    }
    Plotly.react(chartElement, jsonData.data, jsonData.layout);
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  if (systemTheme) {
    const syncSystemTheme = function () {
      if (themePreference === 'system') {
        setTheme();
        redrawPlotly();
      }
    };
    if (systemTheme.addEventListener) systemTheme.addEventListener('change', syncSystemTheme);
    else if (systemTheme.addListener) systemTheme.addListener(syncSystemTheme);
  }
  window.addEventListener('storage', function (event) {
    if (event.key === 'theme' || event.key === null) {
      themePreference = readThemePreference();
      setTheme();
      redrawPlotly();
    }
  });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);
  initializeNavigation();

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("padding-bottom", "0");
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});
