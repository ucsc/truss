import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-header',
  styleUrl: 'trss-ucsc-header.scss',
  shadow: false,
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
    return 'has-logo ucsc-row__inner';
  }

  render() {
    return (
      <div class="ucsc-row__full trss-ucsc-header">
        <slot />
        <div class={this.useLogo ? this.parentClasses() : 'ucsc-row__inner'}>
          {this.useLogo ? (
            <div class="trss-ucsc-header__left">
              <trss-logo width="114" display='light' with-animation />
            </div>
          ) : null}
          {/* <input type="checkbox" id="trss-ucsc-header__toggle" /> */}
          <div class="trss-ucsc-header__right" id="trss-ucsc-header__show">
            <ul class="trss-ucsc-header__navigation">
              <li><a href="https://my.ucsc.edu" title="The student portal">MyUCSC</a></li>
              <li><a href="https://www.ucsc.edu/tools/people.html" title="Campus directory">People</a></li>
              <li><a href="https://www.ucsc.edu/tools/calendars.html" title="Upcoming events, academic, and administrative calendars">Calendars</a></li>
              <li><a href="https://www.ucsc.edu/visit/maps-directions.html">Maps</a></li>
              <li><a href="https://www.ucsc.edu/tools/azindex.html" title="A to Z index of UCSC websites">A-Z Index</a></li>
            </ul>
            <div class="trss-ucsc-header__search" role="search">
              <form role="search" method="get" action={this.searchAction} id="cse-search-box">
                <div>
                  <label class="hide" htmlFor={this.searchQuery}>Search</label>
                  <input class="query" id={this.searchQuery} name={this.searchQuery} placeholder="Search" type="text" value="" />
                  <input type="submit" value="Search" />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
