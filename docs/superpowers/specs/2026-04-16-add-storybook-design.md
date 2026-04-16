# Design: Add Storybook to Truss

**Date:** 2026-04-16
**Branch:** `@knice/add-storybook`

## Goal

Add Storybook to the Truss component library so contributors can preview and interact with Stencil web components during development. Also make `build-storybook` available for future deployment, without wiring up hosting today.

## Context

- Truss is a StencilJS 3.x web component library (`@ucsantacruz/truss`).
- All components are tag-prefixed `trss-` and live in `src/components/trss-<name>/`.
- Eight components already have `.stories.tsx` files written in **Storybook CSF v2** (`Template.bind({})`, plain HTML string templates, `readme.md` imports via `parameters.markdown` / `parameters.notes`). No Storybook is installed — the config and dependencies are missing.
- Global styles live at `src/globals/ucsc-trss.scss` and are injected into components via Stencil's SCSS plugin.
- Stencil emits a `dist/loader` bundle with `defineCustomElements()` used to register all custom elements at runtime.

## Decisions

1. **Framework:** `@storybook/web-components` (Storybook v8) with the Vite builder. Use lit-html `html\`\`` templates in stories and CSF v3.
2. **Docs:** Autodocs — each story's meta is tagged `'autodocs'`; existing `readme.md` imports are removed. Storybook auto-generates a Docs page from `component` + `argTypes` metadata.
3. **Deployment:** Local dev only for now. A `build-storybook` script is added so a static build is available when hosting is wired up later. No Netlify changes in this project.
4. **Story location:** Unchanged — stays colocated at `src/components/trss-<name>/trss-<name>.stories.tsx`.

## Architecture

### Dependencies (dev)

- `storybook` (CLI)
- `@storybook/web-components`
- `@storybook/web-components-vite`
- `@storybook/addon-essentials`
- `@storybook/addon-links`
- `lit` — for `html\`\`` template literals in stories
- `vite` — required by the Vite builder
- `sass` — required for Storybook to compile `ucsc-trss.scss` directly (Stencil bundles its own copy; Storybook's Vite pipeline needs its own)
- `concurrently` — to run Stencil watch + Storybook dev in a single script

### `.storybook/` config

Three files:

**`main.ts`**
```ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  docs: { autodocs: 'tag' },
};
export default config;
```

**`preview.ts`**
```ts
import type { Preview } from '@storybook/web-components';
import { defineCustomElements } from '../loader';
import '../src/globals/ucsc-trss.scss';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};
export default preview;
```

**`tsconfig.json`** — extends root `tsconfig.json`, but overrides `jsx` so Stencil's `h` factory is not applied inside the `.storybook/` preview or migrated story files. Story files keep their `.tsx` extension (no rename) to minimize diff noise; since post-migration they contain no JSX, the override is only defensive.

### Scripts (additions to `package.json`)

```json
{
  "storybook": "concurrently -k -n stencil,storybook \"stencil build --watch\" \"storybook dev -p 6006\"",
  "build-storybook": "stencil build && storybook build -o storybook-static"
}
```

Existing `dev`, `build`, `start`, `test`, `test.watch`, `generate` scripts are untouched.

### Stencil integration

- Storybook's preview iframe calls `defineCustomElements()` once at startup, registering every `trss-*` element.
- The Stencil watch process rebuilds `dist/loader` on `.tsx` changes. Because `preview.ts` imports from `../loader`, Storybook's Vite server reloads when the loader bundle changes.
- The global stylesheet is imported directly from source (`../src/globals/ucsc-trss.scss`) so Storybook picks up style changes without waiting for Stencil to rebuild.

## Story migration

All 8 existing `.stories.tsx` files are rewritten to CSF v3 + lit-html + autodocs. Example (`trss-alert`):

```ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/Alert',
  component: 'trss-alert',
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['notice', 'clear', 'warning', 'emergency'],
    },
    header: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args) => html`
    <trss-alert appearance=${args.appearance}>
      <div slot="header">${args.header}</div>
      <div slot="description">${args.description}</div>
    </trss-alert>
  `,
};
export default meta;

export const Alert: StoryObj = {
  args: {
    appearance: 'notice',
    header: 'Headline for the NOTICE appearance',
    description: 'Indoor face covering requirements remain in effect.',
  },
};
```

Changes applied uniformly:

- Remove `import readme from './readme.md'` and `parameters.markdown` / `parameters.notes` entries.
- Replace `Template.bind({})` with a CSF3 `StoryObj`.
- Replace plain string templates with lit `html\`\`` templates so attribute bindings are properly escaped.
- Add `component: 'trss-<tag>'` and `tags: ['autodocs']` on meta.
- Keep existing story `title` strings (e.g., `Banners/Alert`, `Cards/Card`) so the sidebar organization is preserved.

Stories to migrate:

1. `trss-alert`
2. `trss-banner`
3. `trss-breadcrumbs`
4. `trss-card`
5. `trss-logo`
6. `trss-news-list`
7. `trss-site-title`
8. `trss-ucsc-header`

## Dev workflow

```
npm run storybook
```

Runs `stencil build --watch` and `storybook dev -p 6006` concurrently.

- Editing a component `.tsx` → Stencil rebuilds `dist/loader` → Storybook HMR reloads.
- Editing a `.stories.tsx` → Storybook hot-reloads instantly.
- Editing `src/globals/ucsc-trss.scss` → Storybook Vite HMR reloads styles.

## Implementation order

1. Install dev dependencies (`storybook`, `@storybook/web-components`, `@storybook/web-components-vite`, `@storybook/addon-essentials`, `@storybook/addon-links`, `lit`, `vite`, `sass`, `concurrently`).
2. Add `storybook` and `build-storybook` scripts to `package.json`.
3. Create `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/tsconfig.json`.
4. Run `stencil build` once so `dist/loader` exists; verify `npm run storybook` boots with no stories loaded successfully.
5. Migrate the 8 `.stories.tsx` files one at a time to CSF v3 / lit-html / autodocs. Verify each in the browser before moving on.
6. Smoke-test `npm run build-storybook`; confirm `storybook-static/` output is produced.
7. Add `storybook-static/` to `.gitignore`.
8. Update `README.md` with a short "Running Storybook" section referencing `npm run storybook`.

## Out of scope

- Deployment (Netlify, GitHub Pages, Chromatic).
- Stories for components without existing story files (`trss-carousel`, `trss-events-list`, `trss-ucsc-footer`).
- Visual regression testing.
- Interaction / `play()` tests.
- Changes to the untracked `lit-components/` directory.

## Success criteria

- `npm run storybook` launches Storybook on `http://localhost:6006` with all 8 migrated stories visible and interactive.
- Each story renders its component with the global stylesheet applied.
- Each story has an auto-generated Docs tab with an Args table populated from meta.
- `npm run build-storybook` produces a static bundle in `storybook-static/` without errors.
- Existing `npm run dev`, `npm run build`, `npm run test` behavior is unchanged.
