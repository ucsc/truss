/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface TrssAlert {
        /**
          * This sets the color scheme for the alert.
         */
        "appearance": string;
        /**
          * The text for the headline of the alert.
         */
        "header": string;
    }
    interface TrssBreadcrumbs {
        /**
          * The visual separator between links.
         */
        "separator": string;
    }
    interface TrssCard {
        /**
          * The text for the headline of the card.
         */
        "header": string;
        /**
          * The alternative text for the card image.
         */
        "imageAlt": string;
        /**
          * The image included in the card.
         */
        "imageUrl": string;
    }
    interface TrssCarousel {
    }
    interface TrssDataList {
        /**
          * Limit the number of items displayed.
         */
        "limit": number;
        /**
          * The JSON source for the content list in this component.
         */
        "source": string;
    }
    interface TrssLogo {
        /**
          * Sets the color of the logo (blue or white)
         */
        "display": string;
        /**
          * The URL target for the logo.
         */
        "link": string;
        /**
          * Sets the width of the logo.
         */
        "width": string;
        /**
          * Set whether or not the logo will animate on hover
         */
        "withAnimation": boolean;
    }
    interface TrssSiteTitle {
        /**
          * Sets the URL for the title link.
         */
        "link": string;
    }
    interface TrssUcscFooter {
    }
    interface TrssUcscHeader {
        /**
          * The URL for the search form action attribute
         */
        "searchAction": string;
        /**
          * The query parameter for the search string
         */
        "searchQuery": string;
        /**
          * Whether or not to display the UCSC logo
         */
        "useLogo": boolean;
    }
}
declare global {
    interface HTMLTrssAlertElement extends Components.TrssAlert, HTMLStencilElement {
    }
    var HTMLTrssAlertElement: {
        prototype: HTMLTrssAlertElement;
        new (): HTMLTrssAlertElement;
    };
    interface HTMLTrssBreadcrumbsElement extends Components.TrssBreadcrumbs, HTMLStencilElement {
    }
    var HTMLTrssBreadcrumbsElement: {
        prototype: HTMLTrssBreadcrumbsElement;
        new (): HTMLTrssBreadcrumbsElement;
    };
    interface HTMLTrssCardElement extends Components.TrssCard, HTMLStencilElement {
    }
    var HTMLTrssCardElement: {
        prototype: HTMLTrssCardElement;
        new (): HTMLTrssCardElement;
    };
    interface HTMLTrssCarouselElement extends Components.TrssCarousel, HTMLStencilElement {
    }
    var HTMLTrssCarouselElement: {
        prototype: HTMLTrssCarouselElement;
        new (): HTMLTrssCarouselElement;
    };
    interface HTMLTrssDataListElement extends Components.TrssDataList, HTMLStencilElement {
    }
    var HTMLTrssDataListElement: {
        prototype: HTMLTrssDataListElement;
        new (): HTMLTrssDataListElement;
    };
    interface HTMLTrssLogoElement extends Components.TrssLogo, HTMLStencilElement {
    }
    var HTMLTrssLogoElement: {
        prototype: HTMLTrssLogoElement;
        new (): HTMLTrssLogoElement;
    };
    interface HTMLTrssSiteTitleElement extends Components.TrssSiteTitle, HTMLStencilElement {
    }
    var HTMLTrssSiteTitleElement: {
        prototype: HTMLTrssSiteTitleElement;
        new (): HTMLTrssSiteTitleElement;
    };
    interface HTMLTrssUcscFooterElement extends Components.TrssUcscFooter, HTMLStencilElement {
    }
    var HTMLTrssUcscFooterElement: {
        prototype: HTMLTrssUcscFooterElement;
        new (): HTMLTrssUcscFooterElement;
    };
    interface HTMLTrssUcscHeaderElement extends Components.TrssUcscHeader, HTMLStencilElement {
    }
    var HTMLTrssUcscHeaderElement: {
        prototype: HTMLTrssUcscHeaderElement;
        new (): HTMLTrssUcscHeaderElement;
    };
    interface HTMLElementTagNameMap {
        "trss-alert": HTMLTrssAlertElement;
        "trss-breadcrumbs": HTMLTrssBreadcrumbsElement;
        "trss-card": HTMLTrssCardElement;
        "trss-carousel": HTMLTrssCarouselElement;
        "trss-data-list": HTMLTrssDataListElement;
        "trss-logo": HTMLTrssLogoElement;
        "trss-site-title": HTMLTrssSiteTitleElement;
        "trss-ucsc-footer": HTMLTrssUcscFooterElement;
        "trss-ucsc-header": HTMLTrssUcscHeaderElement;
    }
}
declare namespace LocalJSX {
    interface TrssAlert {
        /**
          * This sets the color scheme for the alert.
         */
        "appearance"?: string;
        /**
          * The text for the headline of the alert.
         */
        "header"?: string;
    }
    interface TrssBreadcrumbs {
        /**
          * The visual separator between links.
         */
        "separator"?: string;
    }
    interface TrssCard {
        /**
          * The text for the headline of the card.
         */
        "header"?: string;
        /**
          * The alternative text for the card image.
         */
        "imageAlt"?: string;
        /**
          * The image included in the card.
         */
        "imageUrl"?: string;
    }
    interface TrssCarousel {
    }
    interface TrssDataList {
        /**
          * Limit the number of items displayed.
         */
        "limit"?: number;
        /**
          * The JSON source for the content list in this component.
         */
        "source"?: string;
    }
    interface TrssLogo {
        /**
          * Sets the color of the logo (blue or white)
         */
        "display"?: string;
        /**
          * The URL target for the logo.
         */
        "link"?: string;
        /**
          * Sets the width of the logo.
         */
        "width"?: string;
        /**
          * Set whether or not the logo will animate on hover
         */
        "withAnimation"?: boolean;
    }
    interface TrssSiteTitle {
        /**
          * Sets the URL for the title link.
         */
        "link"?: string;
    }
    interface TrssUcscFooter {
    }
    interface TrssUcscHeader {
        /**
          * The URL for the search form action attribute
         */
        "searchAction"?: string;
        /**
          * The query parameter for the search string
         */
        "searchQuery"?: string;
        /**
          * Whether or not to display the UCSC logo
         */
        "useLogo"?: boolean;
    }
    interface IntrinsicElements {
        "trss-alert": TrssAlert;
        "trss-breadcrumbs": TrssBreadcrumbs;
        "trss-card": TrssCard;
        "trss-carousel": TrssCarousel;
        "trss-data-list": TrssDataList;
        "trss-logo": TrssLogo;
        "trss-site-title": TrssSiteTitle;
        "trss-ucsc-footer": TrssUcscFooter;
        "trss-ucsc-header": TrssUcscHeader;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "trss-alert": LocalJSX.TrssAlert & JSXBase.HTMLAttributes<HTMLTrssAlertElement>;
            "trss-breadcrumbs": LocalJSX.TrssBreadcrumbs & JSXBase.HTMLAttributes<HTMLTrssBreadcrumbsElement>;
            "trss-card": LocalJSX.TrssCard & JSXBase.HTMLAttributes<HTMLTrssCardElement>;
            "trss-carousel": LocalJSX.TrssCarousel & JSXBase.HTMLAttributes<HTMLTrssCarouselElement>;
            "trss-data-list": LocalJSX.TrssDataList & JSXBase.HTMLAttributes<HTMLTrssDataListElement>;
            "trss-logo": LocalJSX.TrssLogo & JSXBase.HTMLAttributes<HTMLTrssLogoElement>;
            "trss-site-title": LocalJSX.TrssSiteTitle & JSXBase.HTMLAttributes<HTMLTrssSiteTitleElement>;
            "trss-ucsc-footer": LocalJSX.TrssUcscFooter & JSXBase.HTMLAttributes<HTMLTrssUcscFooterElement>;
            "trss-ucsc-header": LocalJSX.TrssUcscHeader & JSXBase.HTMLAttributes<HTMLTrssUcscHeaderElement>;
        }
    }
}
