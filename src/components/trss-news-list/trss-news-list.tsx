import { Component, Host, h, Prop } from '@stencil/core';
import { friendly_date } from '../../utils/utils';

@Component({
  tag: 'trss-news-list',
  styleUrl: 'trss-news-list.scss',
  shadow: false,
})
export class TrssNewsList {
  /**
   * The JSON source for the content list in this component.
   */
  @Prop() source: string;

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
                <a href={item.url}>{this.getEncodedText(item.title)}</a>
              </h3>
              <span class="meta">{friendly_date(item.date_published)}</span>
              {item.summary && this.teaser ? <p class="description">{this.getEncodedText(item.summary)}</p> : ''}
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

  private getEncodedText(text: string) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    const regex = /<script[\d\D]*?>[\d\D]*?<\/script>/gm;
    const result = textArea.value.replace(regex, '');
    return result;
  }

  private getFeedId(url: string) {
    const pattern = /https\:\/\/news\.ucsc\.edu\/(.*)\/feed\/json\/?$/;
    const match = url.match(pattern);

    if (!match) {
      return self.crypto.randomUUID();
    }

    const substring = match[1];
    return substring.replace(/\//g, '-');
  }
}
