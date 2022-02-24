
import readme from './readme.md';

export default {
  title: 'Banners/Site Title',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    link: { control: 'text', description: 'URL target for the link' },
    text: { control: 'text', description: 'Latin American &amp; Latino Studies' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `<trss-site-title link="${args.link}">${args.text}</trss-site-title>`;
  };

export const SiteTitle = Template.bind({});
SiteTitle.args = {
  link: 'https://news.ucsc.edu',
  text: 'Campus News',
};
