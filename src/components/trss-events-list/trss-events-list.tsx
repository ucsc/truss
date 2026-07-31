import { Component, Element, Host, h, Prop } from '@stencil/core';
import { decode_entities, fetch_cached_json, friendly_date, safe_url } from '../../utils/utils';

/**
 * A single event from the Tribe Events REST API. All fields are optional since
 * they come from an external feed; `image` is `false` when an event has no
 * featured image (see ROADMAP #3).
 */
interface EventImage {
  url?: string;
}

interface EventItem {
  image?: EventImage | false;
  url?: string;
  title?: string;
  start_date?: string;
  summary?: string;
}

@Component({
  tag: 'trss-events-list',
  styleUrl: 'trss-events-list.scss',
  shadow: false,
})
export class TrssEventsList {
  @Element() el!: HTMLElement;

  /**
   * The JSON source for the content list in this component.
   */
  @Prop() source: string = 'https://events.ucsc.edu/wp-json/tribe/events/v1/events';

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
   * @slot header - Content that appears above the list. We recommend a header and description.
   * @slot footer - Content that appears below the list.
   * @slot fallback - Content shown when the feed cannot be loaded or is empty. Falls back to a default message.
   */

  eventData: { events: EventItem[] } = { events: [] };

  async componentWillRender() {
    const data = await fetch_cached_json(this.source, 'trss-events-list-');
    // Always keep `events` an array so the render below can never crash on a
    // malformed, empty, or failed response (see ROADMAP #4).
    this.eventData = { events: Array.isArray(data?.events) ? data.events : [] };
  }

  private hasFallbackContent(): boolean {
    return !!this.el.querySelector('[slot="fallback"]');
  }

  render() {
    const events = this.eventData.events.slice(0, this.limit);
    return (
      <Host class="trss-events-list">
        <slot name="header" />
        {events.length > 0 ? (
          <ul>
            {events.map((event: EventItem) => (
              <li>
                {event.image && event.image.url && this.image ? <img src={safe_url(event.image.url)} alt="" /> : ''}
                <p class="title">
                  <a href={safe_url(event.url)}>{decode_entities(event.title)}</a>
                </p>
                <span class="meta">{friendly_date(event.start_date)}</span>
                {event.summary && this.teaser ? <p class="description">{decode_entities(event.summary)}</p> : ''}
              </li>
            ))}
          </ul>
        ) : (
          <div class="trss-events-list__fallback" role="status">
            {this.hasFallbackContent() ? <slot name="fallback" /> : <p>No upcoming events found.</p>}
          </div>
        )}
        <slot name="footer" />
      </Host>
    );
  }
}
