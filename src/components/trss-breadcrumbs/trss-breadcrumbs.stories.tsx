import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Navigation/Breadcrumbs',
  component: 'trss-breadcrumbs',
  tags: ['autodocs', 'beta'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Visual separator between links',
    },
    trailing_link: {
      control: 'boolean',
      description: 'Whether or not the last item should look like a link',
    },
  },
  render: (args) => html`
    <trss-breadcrumbs trailing_link="${args.trailing_link}" style="--trss-breadcrumbs-separator: '${args.separator}'">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Category</a></li>
        <li><a href="#">Subcategory</a></li>
        <li><a href="#">Current Page</a></li>
      </ul>
    </trss-breadcrumbs>
  `,
};

export default meta;

export const Breadcrumbs: StoryObj = {
  args: {
    separator: '/',
    trailing_link: true,
  },
};
