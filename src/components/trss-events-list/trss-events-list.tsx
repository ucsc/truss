import { Component, Host, h, Prop } from '@stencil/core';
import { friendly_date } from '../../utils/utils';

@Component({
  tag: 'trss-events-list',
  styleUrl: 'trss-events-list.scss',
  shadow: false,
})
export class TrssEventsList {

  /**
   * The JSON source for the content list in this component.
   */
  @Prop() source: string;

  /**
   * Limit the number of items displayed.
   */
  @Prop() limit: number = 5;

  /**
   * Whether or not to display the event location.
   */
  @Prop() location: boolean = false;

  /**
   * Whether or not to display the event teaser.
   */
  @Prop() teaser: boolean = false;

  /**
   * Whether or not to display the event teaser.
   */
  @Prop() image: boolean = false;

  /**
   * Layout style of the event list.
   */
  @Prop() layout: string = 'list';

  /**
   * @slot default - Content that appears above the list. We recommend a header and description.
   */

  render() {
    if (this.eventData.events) {
      return (
        <Host class="trss-events-list">
          <slot name="header" />
          <ul>
            {this.eventData.events.slice(0, this.limit).map((event: any = {}) => (
              <li>
                {event.image.url && this.image ? <img src={event.image.url} alt="" /> : '' }
                <p class="title">
                  <a href={event.url}>{this.getEncodedText(event.title)}</a>
                </p>
                <span class="meta">{friendly_date(event.start_date)}</span>
                {event.summary && this.teaser ? <p class="description">{this.getEncodedText(event.summary)}</p> : ''}
              </li>
            ))}
          </ul>
          <slot name="footer" />
        </Host>
      );

    } else {
      return (
        <Host class="trss-events-list">
          <slot name="header" />
          <p>No upcoming events found.</p>
          <slot name="footer" />
        </Host>
      );
    }
  }

  eventData = { events: [] };

  async componentWillRender() {
    let feed = this.getFeedId(this.source);
    if (!sessionStorage.getItem('trss-events-list-' + feed) || sessionStorage.getItem('trss-events-list-' + feed) === '{}') {
      let getApi = await fetch(this.source, { method: 'GET', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
      sessionStorage.setItem('trss-events-list-' + feed, JSON.stringify(await getApi.json()));
      this.eventData = JSON.parse(sessionStorage.getItem('trss-events-list-' + feed));
    } else {
      this.eventData = JSON.parse(sessionStorage.getItem('trss-events-list-' + feed));
    }
  }

  private getEncodedText(text: string) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    const regex = /<script[\d\D]*?>[\d\D]*?<\/script>/gm;
    const result = textArea.value.replace(regex, '');
    return result;
  }

  private getFeedId(url: string) {
    const pattern = /[?&](?<entity>organizer|venue|categories|tags)=(?<value>[^&]+)/;
    const match = url.match(pattern);

    if (!match || !match.groups.value) {
      return self.crypto.randomUUID();
    }

    console.log(match);
    const substring = match.groups.entity + '-' + match.groups.value;
    return substring;
  }

}
