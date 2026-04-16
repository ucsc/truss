import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Banners/Site Title',
  component: 'trss-site-title',
  tags: ['autodocs'],
  argTypes: {
    link: {
      control: 'text',
      description: 'URL target for the link',
    },
    text: {
      control: 'text',
      description: 'Site title text',
    },
  },
  render: (args) => html`
    <trss-site-title link=${args.link}>${args.text}</trss-site-title>
  `,
};

export default meta;

export const SiteTitle: StoryObj = {
  args: {
    link: 'https://news.ucsc.edu',
    text: 'Campus News',
  },
};
