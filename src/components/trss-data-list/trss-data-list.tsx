import { Component, Host, h, Prop } from '@stencil/core';
import { friendly_date } from '../../utils/utils';

@Component({
  tag: 'trss-data-list',
  styleUrl: 'trss-data-list.scss',
  shadow: false,
})
export class TrssDataList {

  /**
   * The URL source for the remote content of this component.
   */
  @Prop() source: string;

  /**
   * Limit the number of items displayed.
   */
  @Prop() limit: number = 10;

  /**
 * @slot default - Any content you wish to appear above the list. We recommend a header and description.
 */

  private getEncodedText(text): string {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }


  render() {
    return (
      <Host class="trss-data-list">
        <div>
          <slot />
        </div>
        <ul>
          {this.listData.items.slice(0, this.limit).map((item:any={})=>
            <li>
              <a href={item.url}>
                <span class="meta">{friendly_date(item.date_published)}</span>
                <h3 class="header">{item.title}</h3>
                { item.summary ?
                  <p class="description">{this.getEncodedText(item.summary)}</p>
                : '' }
              </a>
            </li>
         )}
        </ul>
      </Host>
    );
  }

  listData = { items: [] };

  async componentWillRender() {
    let getApi = await fetch(this.source,{method:'GET', headers: { 'Content-Type': 'application/json',}});
    this.listData = await getApi.json()
  }

}
