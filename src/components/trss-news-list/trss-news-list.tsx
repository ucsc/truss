import { Component, Host, h, Prop } from '@stencil/core';
import { decode_entities, friendly_date, hash_string, safe_url } from '../../utils/utils';

@Component({
  tag: 'trss-news-list',
  styleUrl: 'trss-news-list.scss',
  shadow: false,
})
export class TrssNewsList {
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
   */

  render() {
    return (
      <Host class="trss-news-list">
        <slot />
        <ul>
          {this.listData.items.slice(0, this.limit).map((item: any = {}) => (
            <li>
              <h3 class="header">
                <a href={safe_url(item.url)}>{decode_entities(item.title)}</a>
              </h3>
              <span class="meta">{friendly_date(item.date_published)}</span>
              {item.summary && this.teaser ? <p class="description">{decode_entities(item.summary)}</p> : ''}
            </li>
          ))}
        </ul>
      </Host>
    );
  }

  listData = { items: [] };

  async componentWillRender() {
    let feed = this.getFeedId(this.source);
    if (!sessionStorage.getItem('trss-news-list-' + feed) || sessionStorage.getItem('trss-news-list-' + feed) === '{}') {
      let getApi = await fetch(this.source, { method: 'GET', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
      sessionStorage.setItem('trss-news-list-' + feed, JSON.stringify(await getApi.json()));
      this.listData = JSON.parse(sessionStorage.getItem('trss-news-list-' + feed));
    } else {
      this.listData = JSON.parse(sessionStorage.getItem('trss-news-list-' + feed));
    }
  }

  private getFeedId(url: string) {
    // Stable, deterministic key derived from the full source URL so cached
    // responses are actually reused across renders (see ROADMAP #5).
    return hash_string(url);
  }
}
