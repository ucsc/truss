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
