import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Global/Logo',
  component: 'trss-logo',
  tags: ['autodocs', 'stable'],
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
