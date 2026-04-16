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

