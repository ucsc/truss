import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Global/UCSC Footer',
  component: 'trss-ucsc-footer',
  tags: ['autodocs', 'stable'],
  argTypes: {
    hasSammy: {
      control: 'boolean',
      description: 'Whether or not to display the Sammy illustration.',
    },
    year: {
      control: 'text',
      description: 'The copyright year shown in the footer.',
    },
  },
  render: (args) => html`
    <trss-ucsc-footer
      has-sammy=${args.hasSammy}
      year=${args.year}
    ></trss-ucsc-footer>
  `,
};

export default meta;

export const UCSCFooter: StoryObj = {
  args: {
    hasSammy: true,
    year: String(new Date().getFullYear()),
  },
};

export const WithoutSammy: StoryObj = {
  args: {
    hasSammy: false,
    year: String(new Date().getFullYear()),
  },
};
