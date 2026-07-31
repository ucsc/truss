export {};

// Elements newer than Stencil's bundled JSX typings.
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      /**
       * Mirrors the selected <option> inside a customizable <select>
       * (`appearance: base-select`). Inert in non-supporting browsers.
       */
      selectedcontent: { [key: string]: any };
    }
  }
}
