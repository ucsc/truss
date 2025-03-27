import readme from './readme.md';

export default {
  title: 'Banners/Banner',
  parameters: {
    markdown: readme,
    notes: readme
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
  return `<trss-banner appearance="${args.appearance}"><div slot="header">${args.header}</div> <div slot="description">${args.description}</div></trss-banner>`;
};

export const Banner = Template.bind({});
Banner.args = {
  appearance: 'notice',
  header: 'Headline for the NOTICE appearance',
  description: 'Indoor face covering requirements remain in effect.&nbsp;<a href="https://slugstrong.ucsc.edu">Stay informed</a>.'
};

