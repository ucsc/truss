import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-footer',
  styleUrl: 'trss-ucsc-footer.scss',
  assetsDirs: ['assets'],
  shadow: false,
  scoped: true
})
export class TrssUcscFooter {

  /**
 * The numeric year we use for the copyright.
 */
  @Prop() year: string = new Date().getFullYear().toString();

  render() {
    return (

      <div class="trss-ucsc-footer__outer">
        <div class="trss-ucsc-footer" role="contentinfo">
          <div class="trss-ucsc-footer__inner">

            <div class="trss-ucsc-footer__inner-left">
              <trss-logo width="180" display='light' with-animation />
            </div>

            <div class="trss-ucsc-footer__inner-right">
              <ul>
                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSdoZLrRfU3L1ZiUuCn2E24ph7aB0O9ytIGHbZfTpTG1PlJVww/viewform">Report an accessibility barrier</a></li>
                <li><a href="https://www.ucsc.edu/land-acknowledgment">Land Acknowledgment</a></li>
                <li><a href="https://jobs.ucsc.edu">Employment</a></li>
                <li><a href="https://its.ucsc.edu/terms/">Privacy</a></li>
                <li><a href="https://academicaffairs.ucsc.edu/accreditation/">Accreditation</a></li>
                <li>&copy;{this.year} UC Regents</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }

}
