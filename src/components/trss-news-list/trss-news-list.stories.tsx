import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feeds/News List',
  component: 'trss-news-list',
  tags: ['autodocs', 'beta'],
  argTypes: {
    source: {
      control: 'text',
      description: 'URL for the data this component will display',
    },
    limit: {
      control: 'number',
      description: 'Number of items to show',
    },
    teaser: {
      control: 'boolean',
      description: 'Whether or not to show the teaser text',
    },
    slot: {
      control: 'text',
      description: 'The HTML content shown above the list.',
    },
  },
  render: (args) => html`
    <trss-news-list source=${args.source} limit=${args.limit} teaser=${args.teaser}>
      <div .innerHTML=${args.slot}></div>
    </trss-news-list>
  `,
};

export default meta;

export const NewsList: StoryObj = {
  args: {
    source: 'https://news.ucsc.edu/feed/json',
    limit: 4,
    teaser: true,
    slot:
      '<h2>UCSC news</h2><p>Stay informed about developments at UC Santa Cruz.</p>',
  },
};
