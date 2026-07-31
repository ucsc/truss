import { newSpecPage } from '@stencil/core/testing';
import { TrssBreadcrumbs } from '../trss-breadcrumbs';

describe('trss-breadcrumbs', () => {
  it('renders an accessible navigation landmark', async () => {
    const page = await newSpecPage({
      components: [TrssBreadcrumbs],
      html: `<trss-breadcrumbs></trss-breadcrumbs>`,
    });
    const root = page.root as HTMLElement;
    const nav = root.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav!.getAttribute('aria-label')).toBe('Breadcrumb');
    expect(nav!.className).toContain('trss-breadcrumbs');
  });
});
