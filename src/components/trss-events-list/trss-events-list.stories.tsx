import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feeds/Events List',
  component: 'trss-events-list',
  tags: ['autodocs', 'experimental'],
  argTypes: {
    source: {
      control: 'text',
      description: 'URL for the data this component will display',
    },
    limit: {
      control: 'number',
      description: 'Number of items to show',
    },
    location: {
      control: 'boolean',
      description: 'Whether or not to show the event location',
    },
    teaser: {
      control: 'boolean',
      description: 'Whether or not to show the teaser text',
    },
    image: {
      control: 'boolean',
      description: 'Whether or not to show the event image',
    },
    layout: {
      control: 'select',
      options: ['list', 'card', 'grid'],
      description: 'The layout style of the event list',
     },
    header: {
      control: 'text',
      description: 'The HTML content shown above the list.',
    },
    footer: {
      control: 'text',
      description: 'The HTML content shown below the list.',
    }

  },
  render: (args) => html`
    <trss-events-list source=${args.source} limit=${args.limit} image=${args.image} layout=${args.layout} teaser=${args.teaser} location=${args.location}>
      <slot name="header">${args.header}</slot>
      <slot name="footer">${args.footer}</slot>
    </trss-events-list>
  `,
};

export default meta;

export const EventsList: StoryObj = {
  args: {
    source: 'https://events.ucsc.edu/wp-json/tribe/events/v1/events?organizer=368&per_page=10',
    limit: 4,
    location: true,
    teaser: true,
    image: true,
    layout: 'list',
    header: '<h2>UCSC events</h2><p>Stay informed about upcoming events at UC Santa Cruz.</p>',
    footer: '<button>See more events</button>',
  },
};
