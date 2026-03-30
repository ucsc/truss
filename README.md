# Truss (in active development)

Truss is a component library for anyone building a UC Santa Cruz website.

> Please note that the visual design of Truss components is dependent on the design choices in the [UCSC 2022 WordPress theme](https://github.com/ucsc/ucsc-2022), which is still in development. Consider Truss to be beta in both design and functionality.

Truss contains branded web components built with StencilJS. Truss components use the web components standard so they are cross-browser compatible.

## Component status

### In use today (status)

- [trss-ucsc-header](src/components/trss-ucsc-header) (stable)
- [trss-ucsc-footer](src/components/trss-ucsc-footer) (stable)
- [trss-news-list](src/components/trss-news-list) (beta)
- [trss-logo](src/components/trss-logo) (stable)

## In development (status)

- [trss-site-title](src/components/trss-site-title) (beta)
- [trss-events-list](src/components/trss-data-list) (beta)
- [trss-alert](src/components/trss-alert) (beta)
- [trss-breadcrumbs](src/components/trss-breadcrumbs) (pre-alpha)
- [trss-card](src/components/trss-card) (pre-alpha)
- [trss-carousel](src/components/trss-carousel) (pre-alpha)

## Using Truss components

The simplest way to get started with Truss is to add the released CSS and Javascript files to the bottom of your webpage.

````html
<!-- Script and style to include Truss components.  -->
<script type="module" src="https://truss.ucsc.edu/ucsc-trss/ucsc-trss.esm.js"></script>
<link rel="stylesheet" href="https://truss.ucsc.edu/ucsc-trss/ucsc-trss.css">
````

After you've added the two files to your page, you can use any of the custom elements in Truss anywhere on your page. See [the README file for each component](tree/main/src/components) for a list of attributes you can add to an element.

````html
<trss-ucsc-header use-logo="true" search-action="/" search-query="s" style="--trss-content-width:80rem;"></trss-ucsc-header>
```` 