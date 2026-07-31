import { newSpecPage } from '@stencil/core/testing';
import { TrssNewsList } from '../trss-news-list';

describe('trss-news-list', () => {
  it('renders the fallback when the feed cannot be loaded', async () => {
    // No `fetch` in the spec environment, so fetch_cached_json returns null and
    // the component renders its empty/error fallback (see ROADMAP #4).
    const page = await newSpecPage({
      components: [TrssNewsList],
      html: `<trss-news-list></trss-news-list>`,
    });
    const root = page.root as HTMLElement;
    const fallback = root.querySelector('.trss-news-list__fallback');
    expect(fallback).not.toBeNull();
    expect(fallback!.getAttribute('role')).toBe('status');
    expect(fallback!.textContent).toContain('No news links to display.');
  });
});
