import { Component, Host, h, Prop } from '@stencil/core';

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
   * Optional header above the list.
   */
  @Prop() header: string;

  /**
   * Optional text description below the header and above the list.
   */
  @Prop() description: string;

  render() {
    return (
      <Host class="trss-data-list">
        { this.header ? <h2 class="header">{this.header}</h2> : '' }
        { this.description ? <p class="intro">{this.description}</p> : '' }
        <ul>
          {this.data.items.map((item:any={})=>
            <li>
              <a href={item.url}>
                <span class="meta">{item._date_formatted.long}</span>
                <h3 class="header">{item.title}</h3>
                { item.summary ?
                  <p class="description">{item.summary}</p>
                : '' }
              </a>
            </li>
         )}
        </ul>
      </Host>
    );
  }

  data;

  async componentWillRender() {
    let getApi = await fetch(this.source,{method:'GET'})
    this.data = await getApi.json()
  }

}
