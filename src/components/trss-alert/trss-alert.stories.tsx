import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/Alert',
  component: 'trss-alert',
  tags: ['autodocs', 'stable'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['notice', 'clear', 'warning', 'emergency'],
      description: 'The color scheme of the alert ribbon.',
    },
    header: {
      control: 'text',
      description: 'The heading text for the headline in the alert ribbon.',
    },
    description: {
      control: 'text',
      description: 'The text beneath the headline in the alert ribbon.',
    },
  },
  render: (args) => html`
    <trss-alert appearance=${args.appearance}>
      <div slot="header" .innerHTML=${args.header}></div>
      <div slot="description" .innerHTML=${args.description}></div>
    </trss-alert>
  `,
};

export default meta;

export const Alert: StoryObj = {
  args: {
    appearance: 'notice',
    header: '<h3>Headline for the NOTICE appearance</h3>',
    description:
      '<p>Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.</p>',
  },
};

