import readme from './readme.md';

export default {
  title: 'List/Data List',
  parameters: {
    markdown: readme,
    notes: readme,
  },
  argTypes: {
    source: { control: 'text', description: 'URL for the data this component will display' },
    limit: { control: 'number', description: 'Number of items to show' },
    slot: { control: 'text', description: 'The HTML content shown above the list.' },
  },
};

const Template = ({ label, ...args }) => {
  // You can either use a function to create DOM elements or use a plain html string!
  return `
    <trss-data-list source="${args.source}" limit="${args.limit}">
      ${args.slot}
    </trss-data-list>
  `;
};

export const DataList = Template.bind({});
DataList.args = {
  source: 'https://news.ucsc.edu/feeds/latest.json',
  limit: 10,
  slot: '<h2>Objectively innovate empowered manufactured products whereas parallel platforms</h2><p>Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis cutting-edge deliverables.</p>',
};
