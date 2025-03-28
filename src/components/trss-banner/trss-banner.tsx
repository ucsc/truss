import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'trss-banner',
  styleUrl: 'trss-banner.scss',
  scoped: false,
})
export class TrssBanner {

  /**
   * This sets the color scheme for the alert.
   */
  @Prop() appearance: string = 'blue';

  /**
   * The text for the headline of the alert.
   */
  @Prop() header: string;

  /**
   * @slot header - Header content for the alert.
   * @slot description - Text content for alert.
   */

  private getAppearance(): string {
    return 'trss-banner trss-banner--' + this.appearance;
  }

  render() {
    const here = window.location.hostname;
    const sites = ["localhost","aarcc.ucsc.edu","airc.ucsc.edu","aapirc.ucsc.edu","basicneeds.ucsc.edu","baytreeconference.ucsc.edu","elcentro.ucsc.edu","collegenine.ucsc.edu","conflictresolution.ucsc.edu","caps.ucsc.edu","cowell.ucsc.edu","deanofstudents.ucsc.edu","drc.ucsc.edu","studentsuccess.ucsc.edu","childcare.ucsc.edu","eop.ucsc.edu","firstgen.ucsc.edu","hsi.ucsc.edu","johnrlewis.ucsc.edu","kresge.ucsc.edu","kresgeproject.ucsc.edu","lss.ucsc.edu","queer.ucsc.edu","merrill.ucsc.edu","oakes.ucsc.edu","oakescara.ucsc.edu","pocsc.ucsc.edu","porter.ucsc.edu","practicalactivism.ucsc.edu","rachelcarson.ucsc.edu","reporthate.ucsc.edu","respondent.ucsc.edu","families.ucsc.edu","someca.ucsc.edu","stars.ucsc.edu","stevenson.ucsc.edu","sfac.ucsc.edu","healthcenter.ucsc.edu","studenthealth.ucsc.edu","shop.ucsc.edu","soar.ucsc.edu","volunteer.ucsc.edu","caps.ucsc.edu","care.ucsc.edu","careers.ucsc.edu","catering.ucsc.edu","ches.ucsc.edu","conferenceservices.ucsc.edu","dining.ucsc.edu","nutrition.sa.ucsc.edu","orientation.ucsc.edu","renaissancescholars.ucsc.edu","resourcecenters.ucsc.edu","housing.ucsc.edu","womenscenter.ucsc.edu","undergroundscholars.ucsc.edu","ucenter.ucsc.edu","weareslugs.ucsc.edu","sua.ucsc.edu"];
    return (        
        <div class={this.appearance ? this.getAppearance() : 'trss-banner trss-banner--blue'} aria-hidden={sites.includes(here) ? 'false' : 'true' } role="complementary">
          <div class="trss-row__inner trss-narrow">      
            <h3 slot="header">You Belong Here</h3>
            <div slot="description">
              <p>The programs and services described here are open to all, consistent with state and federal law, as well as the University of California’s nondiscrimination policies. Every initiative—whether a student service, faculty program, or community event—is designed to be accessible, inclusive, and respectful of all identities.</p>
              <p>To learn more, please visit <a href="https://www.ucop.edu/operating-budget/fees-and-enrollments/policies-and-resources/nondiscrimination-statement.html">UC Nondiscrimination Statement</a> or <a href="https://policy.ucop.edu/doc/2710540/PACAOS-Appendix-C">Nondiscrimination Policy Statement for University of California Publications Regarding Student-Related Matters</a>.</p>
            </div>
          </div>
        </div>        
      );
  }

}



