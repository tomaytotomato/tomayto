# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A customised fork of the Ghost **Casper** theme (v5.x). It uses Handlebars templates rendered by Ghost, PostCSS for styles, and Gulp as the build tool.

## Commands

```bash
yarn install        # install dependencies
yarn dev            # build + watch (livereload on CSS/JS/HBS changes)
yarn zip            # production build → dist/casper.zip
yarn test           # gscan theme validation (runs `gulp build` first)
yarn test:ci        # gscan with --fatal --verbose (used in CI)
```

There are no unit tests — validation is done by gscan, which checks Ghost theme API compliance.

## Architecture

### Build pipeline (`gulpfile.js`)

- **CSS**: `assets/css/*.css` → PostCSS (easy-import, color-mod, autoprefixer, cssnano) → `assets/built/screen.css`
- **JS**: `assets/js/lib/*.js` + `assets/js/*.js` → concat + uglify → `assets/built/casper.js`
- **Locales**: merges `locales-local/` overrides into `locales/` via `@tryghost/theme-translations`

Always edit source files in `assets/css/` and `assets/js/` — never touch `assets/built/` directly.

### Template hierarchy

- `default.hbs` — root layout; wraps all pages with `<head>`, nav, footer, and Ghost hooks (`{{ghost_head}}`, `{{ghost_foot}}`)
- `index.hbs` — post feed (home page)
- `post.hbs` / `page.hbs` — individual content
- `tag.hbs` / `author.hbs` — archive pages
- `error.hbs` / `error-404.hbs` — error pages

Partials live in `partials/`: `post-card.hbs`, `lightbox.hbs`, and `icons/` (inline SVGs included with `{{> "icons/<name>"}}`).

Custom slug templates (e.g. `page-about.hbs`) override the generic template for that slug.

### Custom theme settings

Declared in the `config.custom` block of `package.json`. Ghost Admin exposes these as UI controls. Current settings: `navigation_layout`, `title_font`, `body_font`, `color_scheme`, `header_style`, `feed_layout`, `post_image_style`, `email_signup_text`, `show_recent_posts_footer`, `show_publication_cover`.

### Social links

The footer renders social accounts via the `{{#social_accounts @site}}` helper (added in v5.11.1). Icons are resolved by `type` from `partials/icons/`; unknown platforms fall back to a `<span>` with the platform name.

### Localisation

Strings are wrapped with `{{t "..."}}`. Translation files live in `locales/<lang>.json`. Local overrides go in `locales-local/` and are merged at build time.

## Distribution

`yarn zip` produces `dist/casper.zip`, which is uploaded directly to Ghost Admin under Design → Change theme.
