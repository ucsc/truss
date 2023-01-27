
import readme from './readme.md';

export default {
  title: 'Global/UCSC Nav Bar',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    search: { control: 'text', description: 'Location where the search form will go' },
    logo: { control: 'boolean', description: 'Add UCSC logo to left side' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<trss-ucsc-navbar use-logo="${args.logo}" search="${args.search}"/>`;
  };

export const UCSCNavBar = Template.bind({});
UCSCNavBar.args = {
  search: 'https://news.ucsc.edu',
  logo: true
};
