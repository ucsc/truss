import { newE2EPage } from '@stencil/core/testing';

describe('trss-events-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<trss-events-list></trss-events-list>');

    const element = await page.find('trss-events-list');
    expect(element).toHaveClass('hydrated');
  });
});
