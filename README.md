# Zhuo Tao's Academic Homepage

Source code for [taozhuo2000.github.io](https://taozhuo2000.github.io), the bilingual academic homepage of Zhuo Tao (陶卓).

The site is based on the [Academic Pages](https://github.com/academicpages/academicpages.github.io) Jekyll template.

## Local development on macOS

The site uses Ruby 3.3 and the GitHub Pages dependency set.

```bash
bundle install
bundle exec jekyll serve -l -H 127.0.0.1
```

Then open <http://127.0.0.1:4000>.

## Content

- English and Chinese homepage routes: `_pages/about.md`, `_pages/about-zh.md`
- Bilingual homepage copy: `_data/home.yml`; shared layout: `_layouts/home.html`
- Homepage research illustration: `_includes/research-visual.html`
- Shared visual design and responsive styles: `_sass/_refinement.scss`
- News: `_news/`
- English and Chinese CV pages: `_pages/cv.md`, `_pages/cv-zh.md`
- Publications: `_publications/`
- Blog posts: `_posts/`
- Site settings: `_config.yml`
- Navigation: `_data/navigation.yml`

Publication cards are generated from `_publications/`. Use `selected: true` to feature a paper on the homepage, `venue_short` for its venue badge, and `teaser` / `teaser_alt` for its conceptual figure. Keep each English and Chinese record paired. Only add `codeurl` when a public code release exists.

After changing JavaScript in `assets/js/_main.js`, run `npm run build:js` to regenerate the committed browser bundle. Build the site with `bundle exec jekyll build`. Add `mathjax: true` to a page's front matter if it needs mathematical typesetting; the homepage does not load MathJax.

For browser regression checks, run `node scripts/check-site.mjs http://127.0.0.1:4000` against a running preview, with Playwright and Chrome available. Set `PLAYWRIGHT_MODULE` to an existing Playwright package path if it is not installed locally. The check covers both languages, responsive layouts, local links, navigation, themes, and operation without JavaScript.

## Publishing a bilingual blog post

1. Copy `templates/blog-post-en.md` and `templates/blog-post-zh.md` into `_posts/`.
2. Rename them using Jekyll's `YYYY-MM-DD-slug.md` convention. Use different filenames for the paired files, for example `2026-07-10-agent-notes-en.md` and `2026-07-10-agent-notes-zh.md`.
3. Keep the same URL slug in the paired `permalink` values. English posts use `/blog/slug/`; Chinese posts use `/zh/blog/slug/`.
4. Point each file's `alternate_url` to the other language version.
5. Update `title`, `date`, `excerpt`, `categories`, and `tags`, then write the article body.
6. Preview locally before pushing:

```bash
bundle exec jekyll serve -l -H 127.0.0.1
```

Posts with `lang: en` appear only in the English blog archive. Posts with `lang: zh` appear only in the Chinese archive. The language button on each post uses `alternate_url` to switch to its paired translation.

Personal phone numbers, birth information, and other private CV fields are intentionally excluded from the public site.
