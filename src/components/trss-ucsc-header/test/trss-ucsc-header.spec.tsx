import { newSpecPage } from '@stencil/core/testing';
import { TrssUcscHeader } from '../trss-ucsc-header';

describe('trss-ucsc-header', () => {
  it('renders the banner with navigation and search', async () => {
    const page = await newSpecPage({
      components: [TrssUcscHeader],
      html: `<trss-ucsc-header></trss-ucsc-header>`,
    });
    const root = page.root as HTMLElement;
    expect(root.getAttribute('role')).toBe('banner');
    expect(root.querySelectorAll('.trss-ucsc-header__navigation a').length).toBe(5);
    expect(root.querySelector('.trss-ucsc-header__search')).not.toBeNull();
  });

  it('hides the search form when useSearch is false', async () => {
    const page = await newSpecPage({
      components: [TrssUcscHeader],
      html: `<trss-ucsc-header></trss-ucsc-header>`,
    });
    (page.root as any).useSearch = false;
    await page.waitForChanges();
    expect((page.root as HTMLElement).querySelector('.trss-ucsc-header__search')).toBeNull();
  });
});
