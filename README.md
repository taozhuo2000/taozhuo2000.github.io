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

- Homepage: `_pages/about.md`
- CV: `_pages/cv.md`
- Publications: `_publications/`
- Site settings: `_config.yml`
- Navigation: `_data/navigation.yml`

Personal phone numbers, birth information, and other private CV fields are intentionally excluded from the public site.
