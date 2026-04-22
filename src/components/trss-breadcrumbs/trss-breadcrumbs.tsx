import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-breadcrumbs',
  styleUrl: 'trss-breadcrumbs.scss',
  shadow: false,
})
export class TrssBreadcrumbs {
  /**
   * Should the last item in the list look like a link?
   */
  @Prop() trailing_link: boolean = true;

  render() {
    return (
      <nav class={this.trailing_link ? 'trss-breadcrumbs' : 'trss-breadcrumbs trss-breadcrumbs__no-trailing-link'} role="navigation" aria-label="Breadcrumb">
        <slot />
      </nav>
    );
  }
}
