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

- English and Chinese homepages: `_pages/about.md`, `_pages/about-zh.md`
- News: `_news/`
- English and Chinese CV pages: `_pages/cv.md`, `_pages/cv-zh.md`
- Publications: `_publications/`
- Blog posts: `_posts/`
- Site settings: `_config.yml`
- Navigation: `_data/navigation.yml`

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
