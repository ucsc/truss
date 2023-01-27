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

  /**
   * @slot header - Header content for the alert.
   * @slot description - Text content for alert.
   */

  private getAppearance(): string {
    return 'trss-alert trss-alert--' + this.appearance;
  }

  render() {
    return (
      <div class={this.appearance ? this.getAppearance() : 'trss-alert trss-alert--notice'} role="complementary">
        <div class="ucsc-row__inner">
          <h3 class="header"><slot name="header" /></h3>
          <div class="description"><slot name="description" /></div>
        </div>
      </div>
    );
  }

}


