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
