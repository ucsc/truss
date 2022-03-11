
import readme from './readme.md';

export default {
  title: 'Navigation/Breadcrumbs',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    separator: { control: 'text', description: 'Visual separator between links' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<trss-crumbs separator="${args.separator}">${args.separator}</trss-crumbs>`;
  };

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  link: 'https://news.ucsc.edu',
  text: 'Campus News',
};
