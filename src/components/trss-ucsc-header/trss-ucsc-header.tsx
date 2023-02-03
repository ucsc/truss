import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-header',
  styleUrl: 'trss-ucsc-header.scss',
  shadow: false,
})
export class TrssUcscHeader {

  @Prop() search: string;

  @Prop({reflect: true}) useLogo: boolean;

  private parentClasses(): string {
    return 'ucsc-header has-logo ucsc-row__inner';
  }

  render() {
    return (
      <div class="ucsc-row__full two-blues">
        <div class={this.useLogo ? this.parentClasses() : 'ucsc-header'}>
          {this.useLogo ? (
              <div class="ucsc-header__left">
                <trss-logo width="110" display='light' />
              </div>
            ) : null}
          {/* <input type="checkbox" id="ucsc-header__toggle" /> */}
          <div class="ucsc-header__right" id="ucsc-header__show">
            <ul class="ucsc-header__navigation">
              <li><a href="https://my.ucsc.edu" title="The student portal">MyUCSC</a></li>
              <li><a href="tools/people.html" title="Campus directory">People</a></li>
              <li><a href="tools/calendars.html" title="Upcoming events, academic, and administrative calendars">Calendars</a></li>
              <li><a href="visit/maps-directions.html">Maps</a></li>
              <li><a href="tools/azindex.html" title="A to Z index of UCSC websites">A-Z Index</a></li>
            </ul>
            <div class="ucsc-header__search" role="search">
              <form action={this.search} id="cse-search-box">
                <div>
                  <input name="ie" type="hidden" value="UTF-8"/>
                  <label class="hide" htmlFor="q">Search</label>
                  <input class="query" id="q" name="q" placeholder="Search UCSC" type="text" value=""/>
                  <input class="srchBtn" type="submit" value="Search"/>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
