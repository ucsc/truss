import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Blocks/Card',
  component: 'trss-card',
  tags: ['autodocs', 'alpha'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Headline text for the block',
    },
    description: {
      control: 'text',
      description: 'The text description of the story the card is teasing.',
    },
    imageUrl: {
      control: 'text',
      description: 'URL of the teaser image.',
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for the teaser image.',
    },
  },
  render: (args) => html`
    <trss-card
      header=${args.header}
      image-url=${args.imageUrl}
      image-alt=${args.imageAlt}
    >
      ${args.description}
    </trss-card>
  `,
};

export default meta;

export const Card: StoryObj = {
  args: {
    header:
      'Objectively innovate empowered manufactured products whereas parallel platforms',
    description:
      'Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.',
    imageUrl: 'https://via.placeholder.com/480x150',
    imageAlt: 'Text description for the image',
  },
};
