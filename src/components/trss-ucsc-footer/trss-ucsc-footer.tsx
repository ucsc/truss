import { Component, h } from '@stencil/core';

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

      <div class="trss-ucsc-footer__outer">
        <div class="trss-ucsc-footer" role="contentinfo">
          <div class="trss-ucsc-footer__inner">

            <div class="trss-ucsc-footer__inner-left">
              <trss-logo width="130" display='light' with-animation />
            </div>

            <div class="trss-ucsc-footer__inner-right">
              <ul>
                <li><a href="https://academicaffairs.ucsc.edu/accreditation/">Accreditation</a></li>
                <li><a href="https://www.ucsc.edu/about/employment.html">Employment</a></li>
                <li><a href="https://its.ucsc.edu/terms/">Privacy</a></li>
                <li>&copy;2023 UC Regents</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    );
  }

}
