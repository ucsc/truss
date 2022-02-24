import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-navbar',
  styleUrl: 'trss-ucsc-navbar.scss',
  shadow: false,
})
export class TrssUcscNavbar {

  @Prop() search: string;

  @Prop({reflect: true}) useLogo: boolean;

  private parentClasses(): string {
    return 'page-top has-logo';
  }

  render() {
    return (
      <div class={this.useLogo ? this.parentClasses() : 'page-top'}>
        {this.useLogo ? (
            <div class="page-top-left">
              <trss-logo width="160" />
            </div>
          ) : null}
        <div class="page-top-right">
          <ul class="ucsc-navigation" id="topNav">
            <li><a href="https://my.ucsc.edu" title="The student portal">MyUCSC</a></li>
            <li><a href="tools/people.html" title="Campus directory">People</a></li>
            <li><a href="tools/calendars.html" title="Upcoming events, academic, and administrative calendars">Calendars</a></li>
            <li><a href="visit/maps-directions.html">Maps</a></li>
            <li><a href="tools/azindex.html" title="A to Z index of UCSC websites">A-Z Index</a></li>
          </ul>
          <div class="ucsc-search" role="search">
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
    );
  }

}
