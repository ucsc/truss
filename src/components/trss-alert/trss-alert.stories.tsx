import readme from './readme.md';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Banners/Alert',
  parameters: {
    markdown: readme,
    notes: readme,
    badges: [BADGE.STABLE],
  },
  argTypes: {
    appearance: {
      control: { type: 'select' },
      options: ['notice', 'clear', 'warning', 'emergency'],
      description: 'This sets the color scheme of the alert ribbon.',
      defaultValue: { summary: 'notice' }
    },
    header: { control: 'text', description: 'The header text for the alert ribbon.' },
    description: { control: 'text', description: 'The text description of the alert ribbon.' }
  },
};

const Template = ({ label, ...args }) => {
  return `<trss-alert appearance="${args.appearance}"><div slot="header">${args.header}</div> <div slot="description">${args.description}</div></trss-alert>`;
};

export const Alert = Template.bind({});
Alert.args = {
  appearance: 'notice',
  header: 'Headline for the NOTICE appearance',
  description: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};

