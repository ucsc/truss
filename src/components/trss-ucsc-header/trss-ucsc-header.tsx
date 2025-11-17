import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-header',
  styleUrl: 'trss-ucsc-header.scss',
  shadow: false,
  scoped: true
})
export class TrssUcscHeader {

  /**
    * Whether or not to display the UCSC logo
    */
  @Prop() useLogo: boolean;

  /**
   * The URL for the search form action attribute
   */
  @Prop() searchAction: string;

  /**
   * The query parameter for the search string
   */
  @Prop() searchQuery: string;


  private parentClasses(): string {
    return 'has-logo trss-row__inner';
  }

  render() {
    return (
      <Host role="banner">
      <div class="trss-row__full trss-ucsc-header">
        <slot />
        <div class={this.useLogo ? this.parentClasses() : 'trss-row__inner'}>
          {this.useLogo ? (
            <div class="trss-ucsc-header__left">
              <trss-logo width="132" display='light' with-animation />
            </div>
          ) : null}
          {/* <input type="checkbox" id="trss-ucsc-header__toggle" /> */}
          <div class="trss-ucsc-header__right" role="navigation" id="trss-ucsc-header__show">
            <ul class="trss-ucsc-header__navigation" aria-label="UCSC global navigation">
              <li><a href="https://my.ucsc.edu" title="The student portal">MyUCSC</a></li>
              <li><a href="https://www.ucsc.edu/people/" title="Campus directory">People</a></li>
              <li><a href="https://www.ucsc.edu/calendars/" title="Upcoming events, academic, and administrative calendars">Calendars</a></li>
              <li><a href="https://www.ucsc.edu/campus/visit/maps-directions/">Maps</a></li>
              <li><a href="https://www.ucsc.edu/azindex/" title="A to Z index of UCSC websites">A-Z Index</a></li>
            </ul>
            <div class="trss-ucsc-header__search" role="search">
              <form role="search" method="get" action={this.searchAction} id="cse-search-box">
                <div>
                  <label class="trss-hide" htmlFor={this.searchQuery}>Search</label>
                  <input class="query" id={this.searchQuery} name={this.searchQuery} placeholder="Search" type="text" value="" />
                  <input type="submit" value="Search" />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
      </Host>
    );
  }

}
