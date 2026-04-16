import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'List/News List',
  component: 'trss-news-list',
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: 'text',
      description: 'URL for the data this component will display',
    },
    limit: {
      control: 'number',
      description: 'Number of items to show',
    },
    slot: {
      control: 'text',
      description: 'The HTML content shown above the list.',
    },
  },
  render: (args) => html`
    <trss-news-list source=${args.source} limit=${args.limit}>
      <div .innerHTML=${args.slot}></div>
    </trss-news-list>
  `,
};

export default meta;

export const NewsList: StoryObj = {
  args: {
    source: 'https://news.ucsc.edu/feeds/latest.json',
    limit: 10,
    slot:
      '<h2>Objectively innovate empowered manufactured products whereas parallel platforms</h2><p>Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.</p>',
  },
};
