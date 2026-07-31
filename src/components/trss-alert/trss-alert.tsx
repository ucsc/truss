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
   * @slot header - Header content for the alert.
   * @slot description - Text content for alert.
   */

  private getAppearance(): string {
    return 'trss-alert trss-alert--' + this.appearance;
  }

  /**
   * Announce urgent alerts assertively (`role="alert"`) and informational ones
   * politely (`role="status"`). Both are live regions, so screen readers surface
   * the alert — unlike the previous `role="complementary"`, which they ignored.
   */
  private getRole(): string {
    return this.appearance === 'emergency' || this.appearance === 'warning' ? 'alert' : 'status';
  }

  render() {
    return (
      <div class={this.appearance ? this.getAppearance() : 'trss-alert trss-alert--notice'} role={this.getRole()}>
        <div class="trss-row__inner">
          <div class="header"><slot name="header" /></div>
          <div class="description"><slot name="description" /></div>
        </div>
      </div>
    );
  }

}


