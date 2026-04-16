# Add Storybook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Storybook v8 to Truss so contributors can preview Stencil web components locally, and migrate the 8 existing CSF v2 story files to CSF v3 with autodocs.

**Architecture:** Install `@storybook/web-components` with the Vite builder. A `.storybook/` config directory registers all `trss-*` elements by calling `defineCustomElements()` from Stencil's generated `loader/` bundle, and imports the global SCSS so components render with correct styling. A `storybook` npm script runs Stencil in watch mode alongside the Storybook dev server via `concurrently`, and `build-storybook` produces a static bundle in `storybook-static/`.

**Tech Stack:** StencilJS 3, Storybook 8 (`@storybook/web-components-vite`), Vite, lit-html, Sass, concurrently.

**Spec reference:** [docs/superpowers/specs/2026-04-16-add-storybook-design.md](../specs/2026-04-16-add-storybook-design.md)

---

## File Structure

Files created:

- `.storybook/main.ts` — Storybook framework + addon + stories-glob config
- `.storybook/preview.ts` — registers `trss-*` custom elements and imports global SCSS
- `.storybook/tsconfig.json` — TypeScript config scoped to Storybook (overrides root `jsx`/`jsxFactory`)

Files modified:

- `package.json` — adds dev dependencies and two npm scripts (`storybook`, `build-storybook`)
- `README.md` — adds a short "Running Storybook" section
- `src/components/trss-alert/trss-alert.stories.tsx` — rewrite to CSF3
- `src/components/trss-banner/trss-banner.stories.tsx` — rewrite to CSF3
- `src/components/trss-breadcrumbs/trss-breadcrumbs.stories.tsx` — rewrite to CSF3, fix element tag
- `src/components/trss-card/trss-card.stories.tsx` — rewrite to CSF3
- `src/components/trss-logo/trss-logo.stories.tsx` — rewrite to CSF3
- `src/components/trss-news-list/trss-news-list.stories.tsx` — rewrite to CSF3, fix element tag
- `src/components/trss-site-title/trss-site-title.stories.tsx` — rewrite to CSF3
- `src/components/trss-ucsc-header/trss-ucsc-header.stories.tsx` — rewrite to CSF3, fix element tag

Note: `storybook-static/` is already present in `.gitignore`; no change needed there.

## Testing strategy

Storybook setup and story files are not unit-testable in a meaningful way — the verification is visual (does the story render? do the controls work? does the Docs tab appear?). Each migration task therefore ends with a manual check against `http://localhost:6006`. Run the existing `npm run test` suite at the end of the plan to confirm nothing regressed.

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto)

- [ ] **Step 1: Install Storybook and supporting dev deps**

Run:
```bash
npm install --save-dev \
  storybook@^8 \
  @storybook/web-components@^8 \
  @storybook/web-components-vite@^8 \
  @storybook/addon-essentials@^8 \
  @storybook/addon-links@^8 \
  lit@^3 \
  vite@^5 \
  sass@^1 \
  concurrently@^8
```

Expected: installs complete; `package.json` now has a `devDependencies` block with all nine packages. No changes yet to `dependencies`.

- [ ] **Step 2: Verify install**

Run:
```bash
npx storybook --version
```

Expected: prints `8.x.x`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Storybook and supporting dev dependencies"
```

---

## Task 2: Add `storybook` and `build-storybook` scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add scripts**

Edit the `"scripts"` block in `package.json` to match:

```json
"scripts": {
  "dev": "stencil build --docs --watch --serve",
  "start": "stencil build --watch",
  "test": "stencil test --spec --e2e",
  "test.watch": "stencil test --spec --e2e --watchAll",
  "build": "stencil build --docs",
  "generate": "stencil generate",
  "storybook": "concurrently -k -n stencil,storybook \"stencil build --watch\" \"storybook dev -p 6006 --no-open\"",
  "build-storybook": "stencil build && storybook build -o storybook-static"
}
```

- [ ] **Step 2: Verify script registration**

Run:
```bash
npm run storybook --help 2>&1 | head -1 || true
npm run | grep -E "storybook|build-storybook"
```

Expected: the `npm run` output lists `storybook` and `build-storybook`.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: add storybook and build-storybook npm scripts"
```

---

## Task 3: Create `.storybook/main.ts`

**Files:**
- Create: `.storybook/main.ts`

- [ ] **Step 1: Create the config**

Write `.storybook/main.ts`:

```ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/main.ts
git commit -m "chore: add storybook main config"
```

---

## Task 4: Create `.storybook/preview.ts`

**Files:**
- Create: `.storybook/preview.ts`

Context: `defineCustomElements` is emitted by Stencil into `loader/` (resolved from the `loader` collection path configured in Stencil's default output). After a `stencil build`, `loader/index.js` exists and can be imported. The global stylesheet is imported directly from source so SCSS changes hot-reload.

- [ ] **Step 1: Create the preview**

Write `.storybook/preview.ts`:

```ts
import type { Preview } from '@storybook/web-components';
import { defineCustomElements } from '../loader';
import '../src/globals/ucsc-trss.scss';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/preview.ts
git commit -m "chore: add storybook preview with custom-element registration and global styles"
```

---

## Task 5: Create `.storybook/tsconfig.json`

**Files:**
- Create: `.storybook/tsconfig.json`

Context: the root `tsconfig.json` sets `"jsx": "react"` and `"jsxFactory": "h"` for Stencil's JSX factory. Storybook config and story files don't use JSX; override to avoid Stencil's factory being applied defensively.

- [ ] **Step 1: Create the tsconfig**

Write `.storybook/tsconfig.json`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "jsx": "preserve",
    "noUnusedLocals": false,
    "noUnusedParameters": false
  },
  "include": [
    "./**/*.ts",
    "../src/**/*.stories.tsx",
    "../src/**/*.stories.ts"
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/tsconfig.json
git commit -m "chore: add storybook tsconfig"
```

---

## Task 6: Verify Storybook boots

**Files:** none changed.

Context: this is a smoke test before touching the 8 story files. The existing `.stories.tsx` files are CSF v2 and will likely fail to load cleanly, but Storybook should still start and show either errors per-story or empty sidebars — the important thing is that the dev server starts, the preview iframe loads, and `defineCustomElements` runs without throwing.

- [ ] **Step 1: Build Stencil so `loader/` exists**

Run:
```bash
npm run build
```

Expected: completes successfully; `loader/` directory exists at repo root.

- [ ] **Step 2: Boot Storybook in the background**

Run:
```bash
npx storybook dev -p 6006 --no-open &
SB_PID=$!
sleep 15
```

- [ ] **Step 3: Check the server responded**

Run:
```bash
curl -sSf -o /dev/null -w "%{http_code}\n" http://localhost:6006
```

Expected: `200`.

- [ ] **Step 4: Stop the server**

Run:
```bash
kill $SB_PID 2>/dev/null || true
```

- [ ] **Step 5: No commit (no file changes).**

If the server failed to start, resolve by checking the Storybook output — most likely an issue in `.storybook/main.ts` or a dependency version mismatch. Do not proceed to Task 7 until this passes.

---

## Task 7: Migrate `trss-alert` story to CSF3

**Files:**
- Modify: `src/components/trss-alert/trss-alert.stories.tsx`

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-alert/trss-alert.stories.tsx` with:

```tsx
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
      description: 'This sets the color scheme of the alert ribbon.',
    },
    header: {
      control: 'text',
      description: 'The header text for the alert ribbon.',
    },
    description: {
      control: 'text',
      description: 'The text description of the alert ribbon.',
    },
  },
  render: (args) => html`
    <trss-alert appearance=${args.appearance}>
      <div slot="header">${args.header}</div>
      <div slot="description" .innerHTML=${args.description}></div>
    </trss-alert>
  `,
};

export default meta;

export const Alert: StoryObj = {
  args: {
    appearance: 'notice',
    header: 'Headline for the NOTICE appearance',
    description:
      'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.',
  },
};
```

Note: `.innerHTML` is used (instead of `${unsafeHTML(...)}`) so the description's embedded anchor tag renders, matching the original story's behavior without needing a `unsafeHTML` import.

- [ ] **Step 2: Visual verification**

Run:
```bash
npm run storybook
```

In another terminal, open `http://localhost:6006`. Expected:
- The sidebar shows `Banners > Alert`.
- The story renders a yellow notice bar with the headline text and the "Stay informed" link inline.
- The Controls panel shows `appearance` as a select, `header` and `description` as text inputs.
- The Docs tab shows an auto-generated Args table.

Stop Storybook (Ctrl+C) when satisfied.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-alert/trss-alert.stories.tsx
git commit -m "refactor(trss-alert): migrate story to Storybook CSF3 + autodocs"
```

---

## Task 8: Migrate `trss-banner` story to CSF3

**Files:**
- Modify: `src/components/trss-banner/trss-banner.stories.tsx`

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-banner/trss-banner.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/Banner',
  component: 'trss-banner',
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['notice', 'clear', 'warning', 'emergency'],
      description: 'This sets the color scheme of the alert ribbon.',
    },
    header: {
      control: 'text',
      description: 'The header text for the alert ribbon.',
    },
    description: {
      control: 'text',
      description: 'The text description of the alert ribbon.',
    },
  },
  render: (args) => html`
    <trss-banner appearance=${args.appearance}>
      <div slot="header">${args.header}</div>
      <div slot="description" .innerHTML=${args.description}></div>
    </trss-banner>
  `,
};

export default meta;

export const Banner: StoryObj = {
  args: {
    appearance: 'notice',
    header: 'Headline for the NOTICE appearance',
    description:
      'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Banners > Banner` renders a banner bar with the given text.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-banner/trss-banner.stories.tsx
git commit -m "refactor(trss-banner): migrate story to Storybook CSF3 + autodocs"
```

---

## Task 9: Migrate `trss-breadcrumbs` story to CSF3 (with tag fix)

**Files:**
- Modify: `src/components/trss-breadcrumbs/trss-breadcrumbs.stories.tsx`

Context: the existing story uses `<trss-crumbs>` but the component registers as `<trss-breadcrumbs>` (see [trss-breadcrumbs.tsx:4](src/components/trss-breadcrumbs/trss-breadcrumbs.tsx)). Migration corrects the tag so the story renders.

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-breadcrumbs/trss-breadcrumbs.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Navigation/Breadcrumbs',
  component: 'trss-breadcrumbs',
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Visual separator between links',
    },
  },
  render: (args) => html`
    <trss-breadcrumbs separator=${args.separator}>
      ${args.separator}
    </trss-breadcrumbs>
  `,
};

export default meta;

export const Breadcrumbs: StoryObj = {
  args: {
    separator: '/',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Navigation > Breadcrumbs` renders a breadcrumb trail (content depends on the component's internal behavior).

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-breadcrumbs/trss-breadcrumbs.stories.tsx
git commit -m "refactor(trss-breadcrumbs): migrate story to CSF3 and fix element tag"
```

---

## Task 10: Migrate `trss-card` story to CSF3

**Files:**
- Modify: `src/components/trss-card/trss-card.stories.tsx`

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-card/trss-card.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Blocks/Card',
  component: 'trss-card',
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Headline text for the block',
    },
    description: {
      control: 'text',
      description: 'The text description of the story the card is teasing.',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of the teaser image.',
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for the teaser image.',
    },
  },
  render: (args) => html`
    <trss-card
      header=${args.header}
      image-url=${args.imageUrl}
      image-alt=${args.imageAlt}
    >
      ${args.description}
    </trss-card>
  `,
};

export default meta;

export const Card: StoryObj = {
  args: {
    header:
      'Objectively innovate empowered manufactured products whereas parallel platforms',
    description:
      'Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.',
    imageUrl: 'https://via.placeholder.com/480x150',
    imageAlt: 'Text description for the image',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Blocks > Card` renders a card with image, headline, and description text.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-card/trss-card.stories.tsx
git commit -m "refactor(trss-card): migrate story to Storybook CSF3 + autodocs"
```

---

## Task 11: Migrate `trss-logo` story to CSF3

**Files:**
- Modify: `src/components/trss-logo/trss-logo.stories.tsx`

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-logo/trss-logo.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Global/Logo',
  component: 'trss-logo',
  tags: ['autodocs'],
  argTypes: {
    display: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Whether or not to display the logo in blue or white.',
    },
    width: {
      control: 'text',
      description:
        'How wide the logo should appear. Height is calculated automatically',
    },
    link: {
      control: 'text',
      description: 'Where the logo should link to. Default is https://www.ucsc.edu',
    },
  },
  render: (args) => html`
    <trss-logo
      width=${args.width}
      display=${args.display}
      link=${args.link}
    ></trss-logo>
  `,
};

export default meta;

export const Logo: StoryObj = {
  args: {
    display: 'dark',
    width: '320',
    link: 'https://www.ucsc.edu',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Global > Logo` renders the UCSC logo at 320px wide in dark variant. Switching `display` to `light` should flip the color.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-logo/trss-logo.stories.tsx
git commit -m "refactor(trss-logo): migrate story to Storybook CSF3 + autodocs"
```

---

## Task 12: Migrate `trss-news-list` story to CSF3 (with tag fix)

**Files:**
- Modify: `src/components/trss-news-list/trss-news-list.stories.tsx`

Context: the existing story uses `<trss-data-list>` but the component registers as `<trss-news-list>` (see [trss-news-list.tsx:5](src/components/trss-news-list/trss-news-list.tsx)). Migration corrects the tag and renames the story title from "Data List" to "News List".

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-news-list/trss-news-list.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'List/News List',
  component: 'trss-news-list',
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: 'text',
      description: 'URL for the data this component will display',
    },
    limit: {
      control: 'number',
      description: 'Number of items to show',
    },
    slot: {
      control: 'text',
      description: 'The HTML content shown above the list.',
    },
  },
  render: (args) => html`
    <trss-news-list source=${args.source} limit=${args.limit}>
      <div .innerHTML=${args.slot}></div>
    </trss-news-list>
  `,
};

export default meta;

export const NewsList: StoryObj = {
  args: {
    source: 'https://news.ucsc.edu/feeds/latest.json',
    limit: 10,
    slot:
      '<h2>Objectively innovate empowered manufactured products whereas parallel platforms</h2><p>Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.</p>',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `List > News List` renders the slot HTML above a news feed. Note: the feed fetch may fail in local dev due to CORS — that's OK; it's not a Storybook issue. The component should still render and the slot content should display.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-news-list/trss-news-list.stories.tsx
git commit -m "refactor(trss-news-list): migrate story to CSF3 and fix element tag"
```

---

## Task 13: Migrate `trss-site-title` story to CSF3

**Files:**
- Modify: `src/components/trss-site-title/trss-site-title.stories.tsx`

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-site-title/trss-site-title.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/Site Title',
  component: 'trss-site-title',
  tags: ['autodocs'],
  argTypes: {
    link: {
      control: 'text',
      description: 'URL target for the link',
    },
    text: {
      control: 'text',
      description: 'Site title text',
    },
  },
  render: (args) => html`
    <trss-site-title link=${args.link}>${args.text}</trss-site-title>
  `,
};

export default meta;

export const SiteTitle: StoryObj = {
  args: {
    link: 'https://news.ucsc.edu',
    text: 'Campus News',
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Banners > Site Title` renders "Campus News" as a linked title.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-site-title/trss-site-title.stories.tsx
git commit -m "refactor(trss-site-title): migrate story to Storybook CSF3 + autodocs"
```

---

## Task 14: Migrate `trss-ucsc-header` story to CSF3 (with tag fix)

**Files:**
- Modify: `src/components/trss-ucsc-header/trss-ucsc-header.stories.tsx`

Context: the existing story uses `<trss-ucsc-navbar>` but the component registers as `<trss-ucsc-header>` (see [trss-ucsc-header.tsx:4](src/components/trss-ucsc-header/trss-ucsc-header.tsx)). Migration corrects the tag and the attribute name (`use-logo` kept, since that matches `trss-ucsc-header`'s prop).

- [ ] **Step 1: Replace file contents**

Overwrite `src/components/trss-ucsc-header/trss-ucsc-header.stories.tsx` with:

```tsx
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Global/UCSC Header',
  component: 'trss-ucsc-header',
  tags: ['autodocs'],
  argTypes: {
    search: {
      control: 'text',
      description: 'Location where the search form will submit to',
    },
    logo: {
      control: 'boolean',
      description: 'Add UCSC logo to left side',
    },
  },
  render: (args) => html`
    <trss-ucsc-header
      use-logo=${args.logo}
      search=${args.search}
    ></trss-ucsc-header>
  `,
};

export default meta;

export const UCSCHeader: StoryObj = {
  args: {
    search: 'https://news.ucsc.edu',
    logo: true,
  },
};
```

- [ ] **Step 2: Visual verification**

Run `npm run storybook`. Expected: `Global > UCSC Header` renders the full UCSC site header bar with logo and search form.

- [ ] **Step 3: Commit**

```bash
git add src/components/trss-ucsc-header/trss-ucsc-header.stories.tsx
git commit -m "refactor(trss-ucsc-header): migrate story to CSF3 and fix element tag"
```

---

## Task 15: Smoke-test `build-storybook`

**Files:** none changed.

- [ ] **Step 1: Run the production build**

Run:
```bash
npm run build-storybook
```

Expected: completes with no errors and creates a `storybook-static/` directory containing `index.html`, `iframe.html`, and a JS bundle. No output to console about broken stories.

- [ ] **Step 2: Verify the output**

Run:
```bash
ls storybook-static/index.html storybook-static/iframe.html
```

Expected: both files exist.

- [ ] **Step 3: Clean up**

Run:
```bash
rm -rf storybook-static
```

(It's gitignored; removing it keeps the working tree clean.)

- [ ] **Step 4: No commit (no file changes).**

---

## Task 16: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a "Developing Truss" section**

Append the following to `README.md` (after the existing content, separated by a blank line). The `~~~` fences below are literal triple backticks in the final README — they're shown as tildes here only to avoid nested Markdown fencing in this plan document.

~~~markdown

## Developing Truss

### Running Storybook

Storybook is used to preview components interactively during development.

```bash
npm run storybook
```

This runs Stencil in watch mode alongside the Storybook dev server on [http://localhost:6006](http://localhost:6006). Editing a component or story file hot-reloads the preview.

To produce a static bundle for deployment:

```bash
npm run build-storybook
```

The output is written to `storybook-static/`.
~~~

So in `README.md`, every `~~~` above becomes a triple-backtick fence. The headings (`## Developing Truss`, `### Running Storybook`) and body text are inserted verbatim.

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document Storybook dev workflow in README"
```

---

## Task 17: Regression check

**Files:** none changed.

- [ ] **Step 1: Run existing tests**

Run:
```bash
npm test
```

Expected: passes. The existing spec/e2e suites should be unaffected — Storybook is purely additive.

- [ ] **Step 2: Re-run production build**

Run:
```bash
npm run build
```

Expected: Stencil production build completes with no new warnings or errors attributable to this change.

- [ ] **Step 3: Final sanity check — all 8 stories render**

Run:
```bash
npm run storybook
```

In the browser, click through each of the 8 stories in the sidebar:
- Banners > Alert
- Banners > Banner
- Banners > Site Title
- Blocks > Card
- Global > Logo
- Global > UCSC Header
- List > News List
- Navigation > Breadcrumbs

Each should render its component without console errors. Each should show a Docs tab with an Args table.

Stop Storybook (Ctrl+C).

- [ ] **Step 4: No commit (verification only).**

---

## Done

At this point:

- Storybook v8 is installed and configured.
- All 8 existing stories are migrated to CSF3 + autodocs and render correctly.
- `npm run storybook` starts the dev workflow.
- `npm run build-storybook` produces a deployable static bundle.
- Existing Stencil build and test flows are unchanged.
