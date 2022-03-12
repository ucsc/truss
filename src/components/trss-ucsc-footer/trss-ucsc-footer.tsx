import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'trss-ucsc-footer',
  styleUrl: 'trss-ucsc-footer.scss',
  assetsDirs: ['assets'],
  shadow: false,
  scoped: true
})
export class TrssUcscFooter {

  render() {
    return (
      <Host>

        <div class="trss-ucsc-footer" role="contentinfo">

          <div class="row" id="footer">

            <div class="footer-left">
              <img alt="University of California" class="seal" height="84"
                src="https://static.ucsc.edu/_responsive/images/logos/uc-seal.svg" width="84" />
              <div class="address home">
                <div class="location">UC Santa Cruz, 1156 High Street, Santa Cruz, Ca 95064</div>
                <div class="copyright">©2022 Regents of the University of California. All Rights Reserved.</div>
              </div>
            </div>

            <div class="footer-right">
              <slot></slot>
            </div>
          </div>

          <div class="sub-footer row">
            <div class="legal">
              <ul class="legal">
                <li><a href="https://academicaffairs.ucsc.edu/accreditation/">Accreditation</a></li>
                <li><a
                    href="https://diversity.ucsc.edu/eeo-aa/images/non-discrimination-policy.pdf">Non-Discrimination&nbsp;Policy</a>
                </li>
                <li><a href="land-acknowledgement/index.html">Land Acknowledgement</a></li>
                <li><a href="https://www.ucsc.edu/about/employment.html">Employment</a></li>
                <li><a href="https://its.ucsc.edu/terms/">Privacy&nbsp;Policy&nbsp;&amp;&nbsp;Terms&nbsp;of&nbsp;Use</a></li>
                <li><a href="https://titleix.ucsc.edu/index.html">Sexual Violence Prevention &amp; Response (Title IX)</a></li>
              </ul>

              <p class="page-meta">
                Last modified: March 8, 2022
              </p>
            </div>
          </div>
        </div>


      </Host>
    );
  }

}
