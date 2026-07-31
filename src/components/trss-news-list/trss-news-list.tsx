import { Component, Element, Host, h, Prop } from '@stencil/core';
import { decode_entities, fetch_cached_json, friendly_date, safe_url } from '../../utils/utils';

/**
 * A single item from a JSON Feed (https://www.jsonfeed.org/) news source.
 * All fields are optional since they come from an external feed.
 */
interface NewsItem {
  url?: string;
  title?: string;
  date_published?: string;
  summary?: string;
}

@Component({
  tag: 'trss-news-list',
  styleUrl: 'trss-news-list.scss',
  shadow: false,
})
export class TrssNewsList {
  @Element() el!: HTMLElement;

  /**
   * The JSON source for the content list in this component.
   */
  @Prop() source: string = 'https://news.ucsc.edu/feed/json';

  /**
   * Limit the number of items displayed.
   */
  @Prop() limit: number = 5;

  /**
   * Whether or not to display the teaser text.
   */
  @Prop() teaser: boolean = false;

  /**
   * @slot default - Content that appears above the list. We recommend a header and description.
   * @slot fallback - Content shown when the feed cannot be loaded or is empty. Falls back to a default message.
   */

  listData: { items: NewsItem[] } = { items: [] };

  async componentWillRender() {
    const data = await fetch_cached_json(this.source, 'trss-news-list-');
    // Always keep `items` an array so the render below can never crash on a
    // malformed, empty, or failed response (see ROADMAP #4).
    this.listData = { items: Array.isArray(data?.items) ? data.items : [] };
  }

  private hasFallbackContent(): boolean {
    return !!this.el.querySelector('[slot="fallback"]');
  }

  render() {
    const items = this.listData.items.slice(0, this.limit);
    return (
      <Host class="trss-news-list">
        <slot />
        {items.length > 0 ? (
          <ul>
            {items.map((item: NewsItem) => (
              <li>
                <h3 class="header">
                  <a href={safe_url(item.url)}>{decode_entities(item.title)}</a>
                </h3>
                <span class="meta">{friendly_date(item.date_published)}</span>
                {item.summary && this.teaser ? <p class="description">{decode_entities(item.summary)}</p> : ''}
              </li>
            ))}
          </ul>
        ) : (
          <div class="trss-news-list__fallback" role="status">
            {this.hasFallbackContent() ? <slot name="fallback" /> : <p>No news links to display.</p>}
          </div>
        )}
      </Host>
    );
  }
}
