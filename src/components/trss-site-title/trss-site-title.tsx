import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-site-title',
  styleUrl: 'trss-site-title.scss',
  shadow: false,
})
export class TrssSiteTitle {

  /**
   * Sets the URL for the title link.
   */
  @Prop() link: string;

  render() {
    return (
      <div class="trss-row__full">
        <div class="site-title trss-row__inner">
          <p><a href={this.link}><slot /></a></p>
        </div>
      </div>
    );
  }

}
