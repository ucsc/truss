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
    expect(wrapper!.getAttribute('role')).toBe('complementary');
    expect(wrapper!.className).toContain('trss-alert--warning');
    expect(root.querySelector('.header')).not.toBeNull();
    expect(root.querySelector('.description')).not.toBeNull();
  });
});
