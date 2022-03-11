import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-breadcrumbs',
  styleUrl: 'trss-breadcrumbs.scss',
  shadow: false,
})
export class TrssBreadcrumbs {
  /**
   * The visual separator between links.
   */
  @Prop() separator: string = '/';

  render() {
    return (
      <Host class="trss-breadcrumbs">
        <slot />
      </Host>
    );
  }
}
