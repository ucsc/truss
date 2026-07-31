import { newSpecPage } from '@stencil/core/testing';
import { TrssYouBelong } from '../trss-you-belong';

describe('trss-you-belong', () => {
  it('renders the banner with the appearance class and header slot', async () => {
    const page = await newSpecPage({
      components: [TrssYouBelong],
      html: `<trss-you-belong appearance="blue" header="You belong here"></trss-you-belong>`,
    });
    const root = page.root as HTMLElement;
    const wrapper = root.querySelector('.trss-you-belong');
    expect(wrapper).not.toBeNull();
    expect(wrapper!.getAttribute('role')).toBe('complementary');
    expect(wrapper!.className).toContain('trss-you-belong--blue');
    const heading = root.querySelector('h3');
    expect(heading).not.toBeNull();
    expect(heading!.getAttribute('slot')).toBe('header');
    expect(heading!.textContent).toContain('You belong here');
  });
});
