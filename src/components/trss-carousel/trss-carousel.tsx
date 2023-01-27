import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'trss-carousel',
  styleUrl: 'trss-carousel.scss',
  shadow: false,
})
export class TrssCarousel {

  render() {
    return (
      <Host>
        <section aria-label="Header">
          <div class="trss-carousel">

            <button class="trss-hero-button prev">&larr;</button>
            <button class="trss-hero-button next">&rarr;</button>

            <ul>
              <li class="frame">
                <img src="https://source.unsplash.com/5SPIwSCxOGI/" alt="Camera" />
              </li>
              <li class="frame">
                <img src="https://source.unsplash.com/Q1PcwcvuFa0/" alt="Camera" />
              </li>
              <li class="frame">
                <img src="https://source.unsplash.com/-bX6sdYw48s/" alt="Camera" />
              </li>
            </ul>

          </div>
        </section>
      </Host>
    );
  }

}
