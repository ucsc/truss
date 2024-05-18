import { Component, Host, h, Prop } from '@stencil/core';
import { friendly_date } from '../../utils/utils';

@Component({
  tag: 'trss-data-list',
  styleUrl: 'trss-data-list.scss',
  shadow: false,
})
export class TrssDataList {
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
      <Host class="trss-data-list">
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
    if (!sessionStorage.getItem('trssFetchedData') || sessionStorage.getItem('trssFetchedData') === '{}') {
      let getApi = await fetch(this.source, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      sessionStorage.setItem('trssFetchedData', JSON.stringify(await getApi.json()));
      this.listData = JSON.parse(sessionStorage.getItem('trssFetchedData'));
    } else {
      this.listData = JSON.parse(sessionStorage.getItem('trssFetchedData'));
    }
  }

  private getEncodedText(text): string {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    const regex = /<script[\d\D]*?>[\d\D]*?<\/script>/gm;
    const result = textArea.value.replace(regex, '');
    return result;
  }
}
