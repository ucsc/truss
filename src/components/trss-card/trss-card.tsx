import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-card',
  styleUrl: 'trss-card.scss',
  shadow: false,
})
export class TrssCard {

  /**
   * The image included in the card.
   */
  @Prop() imageUrl: string;

  /**
   * The alternative text for the card image.
   */
  @Prop() imageAlt: string;

  /**
   * The text for the headline of the card.
   */
  @Prop() header: string;

  render() {
    return (
      <div class="block">
        <div class="block-media">
          <img alt={this.imageAlt} class="block-image" src={this.imageUrl} />
        </div>
        <div class="block-body">
          <h3 class="block-title">{this.header}</h3>
          <p class="block-description">
            <slot />
          </p>
        </div>
      </div>
    );
  }

}
