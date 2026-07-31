import { newSpecPage } from '@stencil/core/testing';
import { TrssLogo } from '../trss-logo';

describe('trss-logo', () => {
  it('renders a linked, labelled SVG logo', async () => {
    const page = await newSpecPage({
      components: [TrssLogo],
      html: `<trss-logo></trss-logo>`,
    });
    const root = page.root as HTMLElement;
    const link = root.querySelector('a.trss-logo');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toBe('https://www.ucsc.edu');
    const svg = root.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg!.getAttribute('aria-label')).toBe('UC Santa Cruz');
  });
});
