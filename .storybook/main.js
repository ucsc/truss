module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-notes',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    '@geometricpanda/storybook-addon-badges',
  ],
  framework: '@storybook/html',
};
