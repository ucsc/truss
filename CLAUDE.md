# CLAUDE.md

## Project Overview

Truss (`@ucsantacruz/truss`) is a web component library for UC Santa Cruz websites, built with **StencilJS** and **Sass**. Components use the web components standard for cross-browser compatibility and are published to npm.

## Tech Stack

- **Framework:** StencilJS 3.x (web components compiler)
- **Styling:** Sass (via `@stencil/sass`)
- **Language:** TypeScript (target ES2017, JSX factory `h`)
- **Testing:** Jest + Puppeteer (spec + e2e)
- **Hosting:** Netlify (dev site)

## Project Structure

```
src/
  components/       # Web components (each in its own folder)
    trss-*/         # Component folders (tsx + scss + readme + tests)
  globals/          # Global styles and SCSS variables/mixins
    scss/
      variables.scss
      mixins.scss
    ucsc-trss.scss  # Global stylesheet
  stories/          # Story files
  utils/            # Shared utilities
  index.ts          # Entry point
  index.html        # Dev server page
```

## Key Commands

```bash
npm run dev        # Build with docs, watch, and serve (dev server)
npm run build      # Production build with docs
npm run test       # Run spec and e2e tests
npm run test.watch # Run tests in watch mode
npm run generate   # Scaffold a new component (interactive)
```

## Component Conventions

- All component tags are prefixed with `trss-` (e.g., `trss-alert`, `trss-ucsc-header`)
- Each component lives in `src/components/trss-<name>/` with:
  - `trss-<name>.tsx` — Component class using Stencil decorators (`@Component`, `@Prop`, `@State`, etc.)
  - `trss-<name>.scss` — Component styles
  - `readme.md` — Auto-generated docs (via `--docs` flag)
  - Optional test files
- Components use `scoped: false` (no shadow DOM) unless otherwise specified
- Props are documented with JSDoc comments (used for auto-generated docs)
- Slots are documented with `@slot` JSDoc tags

## Styling

- Global SCSS variables and mixins are auto-injected into all components via `stencil.config.ts`
- The global stylesheet is at `src/globals/ucsc-trss.scss`
- The Stencil namespace is `ucsc-trss`

## Changelog

Uses [Conventional Commits](https://www.conventionalcommits.org/) and standard-version for versioning. Commit messages should follow the format:

```
type(scope): description
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Repository

- GitHub: https://github.com/ucsc/truss
- npm: https://www.npmjs.com/package/@ucsantacruz/truss
