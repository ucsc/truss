import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

// Arg keys must match the CEM attribute names (dash-case) exactly, otherwise
// Storybook autodocs renders a separate inferred row per arg in addition to
// the CEM-derived attribute rows. See .storybook/stencil-to-cem.ts.
const meta: Meta = {
  title: 'Global/UCSC Header',
  component: 'trss-ucsc-header',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <trss-ucsc-header
      use-logo=${args['use-logo']}
      use-search=${args['use-search']}
      use-search-scope=${args['use-search-scope']}
      search-action=${args['search-action']}
      search-query=${args['search-query']}
      global-search-action=${args['global-search-action']}
    ></trss-ucsc-header>
  `,
};

export default meta;

const defaultArgs = {
  'use-logo': true,
  'use-search': true,
  'use-search-scope': false,
  'search-action': 'https://news.ucsc.edu',
  'search-query': 'q',
  'global-search-action': 'https://www.ucsc.edu/search/',
};

export const UCSCHeader: StoryObj = {
  args: defaultArgs,
};

// The header responds to its own inline size (container queries), so a
// constrained wrapper demonstrates each tier without resizing the viewport.
// There is no intermediate stacked layout: as soon as the classic row no
// longer fits (below 900px of container width) the header collapses to the
// compact bar.
export const CollapsedTablet: StoryObj = {
  name: 'Collapsed (704px container)',
  parameters: {
    docs: {
      description: {
        story:
          'Below 900px of container width the header collapses straight to the compact bar — no stacked intermediate layout.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 44rem;">
      <trss-ucsc-header search-action="https://news.ucsc.edu"></trss-ucsc-header>
    </div>
  `,
};

export const CompactTier: StoryObj = {
  name: 'Compact tier (384px container)',
  parameters: {
    docs: {
      description: {
        story:
          'The compact bar: a combined search-and-menu icon button opens a full-screen popover panel containing the search box and the campus links.',
      },
    },
  },
  render: () => html`
    <div style="max-width: 24rem;">
      <trss-ucsc-header search-action="https://news.ucsc.edu"></trss-ucsc-header>
    </div>
  `,
};

export const WithSearchScope: StoryObj = {
  name: 'With search scope select',
  parameters: {
    docs: {
      description: {
        story:
          'Opt-in scope selector ("This site" / "All of UCSC") rendered as a customizable select (`appearance: base-select`) in supporting browsers, falling back to a native select elsewhere. Hidden at the compact tier.',
      },
    },
  },
  args: {
    ...defaultArgs,
    'use-search-scope': true,
  },
};
