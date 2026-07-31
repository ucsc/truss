import { newSpecPage } from '@stencil/core/testing';
import { TrssAlert } from '../trss-alert';

describe('trss-alert', () => {
  it('renders with the appearance-driven class and slot containers', async () => {
    const page = await newSpecPage({
      components: [TrssAlert],
      html: `<trss-alert appearance="warning"></trss-alert>`,
    });
    const root = page.root as HTMLElement;
    const wrapper = root.querySelector('div');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.className).toContain('trss-alert--warning');
    expect(root.querySelector('.header')).not.toBeNull();
    expect(root.querySelector('.description')).not.toBeNull();
  });

  it('announces urgent appearances assertively via role="alert"', async () => {
    const page = await newSpecPage({
      components: [TrssAlert],
      html: `<trss-alert appearance="emergency"></trss-alert>`,
    });
    expect((page.root as HTMLElement).querySelector('div')!.getAttribute('role')).toBe('alert');
  });

  it('announces informational appearances politely via role="status"', async () => {
    const page = await newSpecPage({
      components: [TrssAlert],
      html: `<trss-alert appearance="notice"></trss-alert>`,
    });
    expect((page.root as HTMLElement).querySelector('div')!.getAttribute('role')).toBe('status');
  });
});
