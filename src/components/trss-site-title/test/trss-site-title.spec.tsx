import { newSpecPage } from '@stencil/core/testing';
import { TrssSiteTitle } from '../trss-site-title';

describe('trss-site-title', () => {
  it('renders the title wrapper and link', async () => {
    const page = await newSpecPage({
      components: [TrssSiteTitle],
      html: `<trss-site-title link="https://news.ucsc.edu">Campus News</trss-site-title>`,
    });
    const root = page.root as HTMLElement;
    expect(root.querySelector('.site-title')).not.toBeNull();
    const link = root.querySelector('a');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('https://news.ucsc.edu');
  });
});
