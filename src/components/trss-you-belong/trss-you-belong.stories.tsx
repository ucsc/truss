import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/You Belong',
  component: 'trss-you-belong',
  tags: ['autodocs', 'stable'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['gold', 'blue'],
      description: 'This sets the color scheme of the banner.',
    },
    header: {
      control: 'text',
      description: 'The header text for the banner.',
    }
  },
  render: (args) => html`
    <trss-you-belong appearance=${args.appearance} header=${args.header}></trss-you-belong>`,
};

export default meta;

export const YouBelong: StoryObj = {
  args: {
    appearance: 'gold',
    header: 'You belong here'
  },
};

