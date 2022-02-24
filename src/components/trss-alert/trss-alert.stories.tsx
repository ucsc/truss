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
    content: { control: 'text', description: 'The text description of the alert ribbon.' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain content string!
  return `<trss-alert appearance="${args.appearance}" header="${args.header}">${args.content}</trss-alert>`;
};

export const Notice = Template.bind({});
Notice.args = {
  appearance: 'notice',
  header: 'Headline for the NOTICE appearance',
  content: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};

export const Clear = Template.bind({});
Clear.args = {
  appearance: 'clear',
  header: 'Headline for the CLEAR appearance',
  content: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};

export const Warning = Template.bind({});
Warning.args = {
  appearance: 'warning',
  header: 'Headline for the WARNING appearance',
  content: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};

export const Emergency = Template.bind({});
Emergency.args = {
  appearance: 'emergency',
  header: 'Headline for the EMERGENCY appearance',
  content: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};
