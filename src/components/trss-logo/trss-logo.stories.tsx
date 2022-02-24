
import readme from './readme.md';

export default {
  title: 'Global/Logo',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    display: {
      control: { type: 'select' },
      options: ['dark', 'light'],
      description: 'Whether or not to display the logo in blue or white.',
      defaultValue: { summary: 'dark' }
    },
    width: { control: 'text', description: 'How wide the logo should appear. Height is calculated automatically' },
    link: { control: 'text', description: 'Where the logo should link to. Default is https://www.ucsc.edu' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `
    <trss-logo width=${args.width} display=${args.display} link=${args.link} />
  `;
  };

export const Logo = Template.bind({});
Logo.args = {
  display: 'dark',
  width: '320',
  link: 'https://www.ucsc.edu'
};
