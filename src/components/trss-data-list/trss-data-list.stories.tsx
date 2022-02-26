
import readme from './readme.md';

export default {
  title: 'Data List',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    source: { control: 'text', description: 'URL for the data this component will display' },
    header: { control: 'text', description: 'Header text above the block' },
    description: { control: 'text', description: 'The text description above the list.' }
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `
    <trss-data-list source="${args.source}" header="${args.header}" meta="${args.meta}">${args.description}</trss-data-list>
  `;
  };

export const Teaser = Template.bind({});
Teaser.args = {
  link: 'https://news.ucsc.edu/2022/01/supernova-2020tlf.html',
  meta: 'January 22, 2022',
  header: 'Objectively innovate empowered manufactured products whereas parallel platforms',
  description: 'Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.'
};
