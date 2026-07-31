import { newSpecPage } from '@stencil/core/testing';
import { TrssUcscFooter } from '../trss-ucsc-footer';

describe('trss-ucsc-footer', () => {
  it('renders the contentinfo landmark, links, and the given year', async () => {
    // Pass an explicit year so the assertion is deterministic (the prop
    // otherwise defaults to the current year).
    const page = await newSpecPage({
      components: [TrssUcscFooter],
      html: `<trss-ucsc-footer year="2024"></trss-ucsc-footer>`,
    });
    const root = page.root as HTMLElement;
    const footer = root.querySelector('.trss-ucsc-footer');
    expect(footer).not.toBeNull();
    expect(footer!.getAttribute('role')).toBe('contentinfo');
    expect(root.querySelector('.trss-has-sammy')).not.toBeNull();
    expect(root.querySelectorAll('.trss-ucsc-footer__inner-right a').length).toBe(5);
    expect(root.textContent).toContain('©2024');
  });
});
