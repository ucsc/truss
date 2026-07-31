import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import searchMenuIconUri from './assets/search-menu-icon.svg';

// Stencil inlines .svg imports as base64 data URIs; decode back to markup so
// the icon renders inline and its strokes inherit currentColor. (The Jest
// mock resolves to '', which has no data: prefix and passes through.)
const searchMenuIcon = searchMenuIconUri.startsWith('data:')
  ? atob(searchMenuIconUri.split(',')[1])
  : searchMenuIconUri;

let headerInstances = 0;

@Component({
  tag: 'trss-ucsc-header',
  styleUrl: 'trss-ucsc-header.scss',
  shadow: false,
  scoped: true
})
export class TrssUcscHeader {

  /**
   * Must match $max-width in _variables.scss (56.25rem at a 16px root) —
   * the compact tier covers everything below the classic single-row layout.
   */
  private static readonly COMPACT_MAX_PX = 900;

  @Element() el: HTMLElement;

  /**
    * Display the UCSC logo
    */
  @Prop() useLogo: boolean = true;

  /**
    * Display the UCSC search form
    */
  @Prop() useSearch: boolean = true;

  /**
   * URL for the search action
   */
  @Prop() searchAction: string = '/';

  /**
   * Query parameter for search
   */
  @Prop() searchQuery: string = 'q';

  /**
   * Display a search scope selector ("This site" / "All of UCSC")
   */
  @Prop() useSearchScope: boolean = false;

  /**
   * URL for the campus-wide search action, used when the search scope
   * selector is set to "All of UCSC"
   */
  @Prop() globalSearchAction: string = 'https://www.ucsc.edu/search/';

  @State() searchScope: 'site' | 'ucsc' = 'site';

  private uid = `trss-ucsc-header-${++headerInstances}`;

  private resizeObserver?: ResizeObserver;

  connectedCallback() {
    // The full-screen panel only exists at the compact tier; if the header
    // grows past it while the panel is open, close the panel so it does not
    // linger in the top layer.
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width ?? 0;
        if (width <= TrssUcscHeader.COMPACT_MAX_PX) {
          return;
        }
        const panel = this.el.querySelector<HTMLElement>('.trss-ucsc-header__panel');
        if (panel && 'popover' in HTMLElement.prototype && panel.matches(':popover-open')) {
          panel.hidePopover();
        }
      });
      this.resizeObserver.observe(this.el);
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  private handleScopeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.searchScope = select.value === 'ucsc' ? 'ucsc' : 'site';
  };

  render() {
    const panelId = `${this.uid}-panel`;
    const inputId = `${this.uid}-search`;
    const action = this.useSearchScope && this.searchScope === 'ucsc'
      ? this.globalSearchAction
      : this.searchAction;

    return (
      <Host role="banner">
      <div class="trss-row__full trss-ucsc-header">
        <slot />
        <div class={this.useLogo ? 'has-logo trss-row__inner' : 'trss-row__inner'}>
          {this.useLogo ? (
            <div class="trss-ucsc-header__left">
              <trss-logo width="132" display='light' with-animation />
            </div>
          ) : null}
          <button type="button" class="trss-ucsc-header__menu-button" popoverTarget={panelId} aria-label="Search and campus links">
            <span class="trss-ucsc-header__icon" aria-hidden="true" innerHTML={searchMenuIcon}></span>
          </button>
          <div class="trss-ucsc-header__panel" id={panelId} popover="auto">
            <button type="button" class="trss-ucsc-header__close" popoverTarget={panelId} popoverTargetAction="hide" aria-label="Close">
              <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" />
              </svg>
            </button>
            {this.useSearch ? (
            <div class="trss-ucsc-header__search">
              <form role="search" method="get" action={action} class="cse-search-box">
                {this.useSearchScope ? (
                  <select class="trss-ucsc-header__scope" aria-label="Search scope" onInput={this.handleScopeChange}>
                    <button type="button"><selectedcontent></selectedcontent></button>
                    <option value="site" selected={this.searchScope === 'site'}>This site</option>
                    <option value="ucsc" selected={this.searchScope === 'ucsc'}>All of UCSC</option>
                  </select>
                ) : null}
                <label class="trss-hide" htmlFor={inputId}>Search</label>
                <input class="query" id={inputId} name={this.searchQuery} placeholder="Search" type="search" enterKeyHint="search" />
                <button class="trss-ucsc-header__submit" type="submit" aria-label="Search">
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" stroke-width="2" />
                    <path d="M10.5 10.5L15 15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </form>
            </div>
            ) : null}
            <nav class="trss-ucsc-header__nav" aria-label="UCSC campus navigation">
              <ul class="trss-ucsc-header__navigation">
                <li><a href="https://my.ucsc.edu" title="The student portal">MyUCSC</a></li>
                <li><a href="https://www.ucsc.edu/people/" title="Campus directory">People</a></li>
                <li><a href="https://www.ucsc.edu/calendars/" title="Upcoming events, academic, and administrative calendars">Calendars</a></li>
                <li><a href="https://www.ucsc.edu/campus/visit/maps-directions/">Maps</a></li>
                <li><a href="https://www.ucsc.edu/azindex/" title="A to Z index of UCSC websites">A-Z Index</a></li>
                <li><a href="https://alumni.ucsc.edu" title="Alumni information">Alumni</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </Host>
    );
  }

}
