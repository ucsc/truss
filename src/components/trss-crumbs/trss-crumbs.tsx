import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'trss-crumbs',
  styleUrl: 'trss-crumbs.scss',
  shadow: false,
})
export class TrssCrumbs {

  render() {
    return (
      <Host class="breadcrumbs">
        <p>
          <slot/>
        </p>        
      </Host>
    );
  }

}
