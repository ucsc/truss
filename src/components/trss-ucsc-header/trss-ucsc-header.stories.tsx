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
      search-action=${args['search-action']}
      search-query=${args['search-query']}
    ></trss-ucsc-header>
  `,
};

export default meta;

export const UCSCHeader: StoryObj = {
  args: {
    'use-logo': true,
    'use-search': true,
    'search-action': 'https://news.ucsc.edu',
    'search-query': 'q',
  },
};
