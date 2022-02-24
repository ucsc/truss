import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-alert',
  styleUrl: 'trss-alert.scss',
  scoped: false,
})
export class TrssAlert {

  /**
   * This sets the color scheme for the alert.
   */
  @Prop() appearance: string = 'notice';

  /**
   * The text for the headline of the alert.
   */
  @Prop() header: string;

  private getAppearance(): string {
    return 'ribbon ribbon-' + this.appearance;
  }

  render() {
    return (
      <div class={this.appearance ? this.getAppearance() : 'ribbon ribbon-notice'} role="complementary">
        <div class="row">
          <h3 class="header">{this.header}</h3>
          <slot />
        </div>
      </div>
    );
  }

}


