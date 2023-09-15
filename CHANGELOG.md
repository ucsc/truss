# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.9](https://github.com/ucsc/truss/compare/v0.7.8...v0.7.9) (2023-09-15)


### Bug Fixes

* **Component:** 🐛 Horizontal padding is moved from the inner container to the bounding box ([bb1195f](https://github.com/ucsc/truss/commit/bb1195ff05d16caf1ec227e6773d1196549cf6d0))
* **Settings:** 📝 Default layout width is 1280, matching the WordPress defaults ([f87a8b2](https://github.com/ucsc/truss/commit/f87a8b20965d5120fc59e86fa79affe7a81922bf))

### [0.7.8](https://github.com/ucsc/truss/compare/v0.7.7...v0.7.8) (2023-09-15)


### Features

* **Component:** ✨ Add accessibility reporting link to footer. Fixes [#15](https://github.com/ucsc/truss/issues/15) ([3bc0e86](https://github.com/ucsc/truss/commit/3bc0e86914fa9960c0d4da078169ba28d0c5309a))
* **Component:** ✨ Add padding to header and remove gradient. Fixes [#11](https://github.com/ucsc/truss/issues/11) and fixes [#7](https://github.com/ucsc/truss/issues/7) ([36a348e](https://github.com/ucsc/truss/commit/36a348effc4b15cbd40e0be8b1459ff1c4396eff))
* **Component:** ✨ Update banana slug illustration in the footer. Fixes [#14](https://github.com/ucsc/truss/issues/14) ([7ad601f](https://github.com/ucsc/truss/commit/7ad601f16e67b328a266071b51f072c5897179f0))


### Bug Fixes

* 🐛 Manage left and right padding on small screen widths ([0ed4bfb](https://github.com/ucsc/truss/commit/0ed4bfba9c7ab224fb1e4e8d92bd03f6b362de4d)), closes [#7](https://github.com/ucsc/truss/issues/7)

### [0.7.7](https://github.com/ucsc/truss/compare/v0.7.6...v0.7.7) (2023-02-13)


### Bug Fixes

* **Component:** Fix style leaks into header, footer and logo ([49da04f](https://github.com/ucsc/truss/commit/49da04f4744a33f19b966460fb09832d27257106))

### [0.7.6](https://github.com/ucsc/truss/compare/v0.7.5...v0.7.6) (2023-02-13)


### Bug Fixes

* **Component:** 🐛 Fix mobile display of trss-ucsc-header ([74168ea](https://github.com/ucsc/truss/commit/74168eaf359f402b42bd85f43405ab6c6193b718))

### [0.7.5](https://github.com/ucsc/truss/compare/v0.7.4...v0.7.5) (2023-02-09)


### Bug Fixes

* build footer for production ([2e4f7d9](https://github.com/ucsc/truss/commit/2e4f7d9166db67c1658c7e48ae50526a800a93f4))

### [0.7.4](https://github.com/ucsc/truss/compare/v0.7.3...v0.7.4) (2023-02-09)


### Features

* **Component:** 🚀 trss-ucsc-footer is now in beta ([21680be](https://github.com/ucsc/truss/commit/21680bebcd1674d094c7778edf221ea5c026bccc))


### Bug Fixes

* Set default content width to match WordPress theme default ([88fa4a1](https://github.com/ucsc/truss/commit/88fa4a15e5841af9c2936c89aabcecbd9a4cb0ac))

### [0.7.3](https://github.com/ucsc/truss/compare/v0.7.2...v0.7.3) (2023-02-05)


### Bug Fixes

* **Styles:** force a CSS update to add recent changes to the package ([3333959](https://github.com/ucsc/truss/commit/3333959a704826407d53a1e5c65f142dbac68f47))

### [0.7.2](https://github.com/ucsc/truss/compare/v0.7.1...v0.7.2) (2023-02-05)


### Bug Fixes

* **Styles:** typo prevented desktop screen padding adjustment ([206eb57](https://github.com/ucsc/truss/commit/206eb57febc45b907645a1fa2b705553a93fd7b1))

### [0.7.1](https://github.com/ucsc/truss/compare/v0.7.0...v0.7.1) (2023-02-05)


### Bug Fixes

* **Styles:** set padding on inner row to 0 at 67.5rem ([fdb3a69](https://github.com/ucsc/truss/commit/fdb3a6959527b12704024584f41c2330b1cf381f))

## [0.7.0](https://github.com/ucsc/truss/compare/v0.6.8...v0.7.0) (2023-02-05)


### ⚠ BREAKING CHANGES

* `trss-content-width` is set globally, but can be changed for any component. Updated settings for distribution as well.
* **component:** trss-ucsc-header requires a CSS custom property `--trss-content-width` to set the inner width of the header.

### Features

* change `ucsc-content-width` to `trss-content-width` ([5d9cb85](https://github.com/ucsc/truss/commit/5d9cb850844e446c2eb362b3e02e5d64f9277302))
* **component:** set inner content width on `trss-ucsc-header` component ([1514249](https://github.com/ucsc/truss/commit/151424926369afecaa13e72a8877be19a1f5acf2))

### [0.6.8](https://github.com/ucsc/truss/compare/v0.6.7...v0.6.8) (2023-02-04)


### Features

* **component:** Add 'withAnimation' attribute to trss-logo ([53a8ac7](https://github.com/ucsc/truss/commit/53a8ac7c3e973dad4baa4f81633c7d3543b68739))
* **component:** Add animation to logo in trss-ucsc-header ([b5e23f0](https://github.com/ucsc/truss/commit/b5e23f0c5214ce9626cef1d8f72c9ce14495568f))


### Bug Fixes

* **Component:** Update UCSC header design ([8936183](https://github.com/ucsc/truss/commit/893618335d0cb70c11ea86f53ce93f2008a9ec4e))

### 0.6.7 (2022-03-11)


### Features

* ⬆️ Update Truss version and Stencil compiler ([d4800e8](https://github.com/ucsc/truss/commit/d4800e8be03c5484490d1b156df8cc74097855e8))
* 🔖 Version bump ([302c430](https://github.com/ucsc/truss/commit/302c4309c62f7d58b455b70bcc172d91ed83ec35))
* 🚀 Init Truss, the web component library for UC Santa Cruz ([013853e](https://github.com/ucsc/truss/commit/013853e57ad9cae03336fe258a21c8d5cdb604bd))
* **Component:** ⚡️ Data list can encode entities safely ([82a3148](https://github.com/ucsc/truss/commit/82a3148653f41e2da4b977e53d021e23b958a664))
* **Component:** ⚡️ Refactor trss-data-list ([06febf4](https://github.com/ucsc/truss/commit/06febf4798fe4f51f55e44f7178bbd910ef3556d))
* **Component:** ✨ Add alert component ([35d7ba6](https://github.com/ucsc/truss/commit/35d7ba6f316648e61205d4a8863d91d8bc882685))
* **Component:** ✨ Add breadcrumb component ([ca55691](https://github.com/ucsc/truss/commit/ca5569149324b36672b97bdc4dcd8dd4a593aa3c))
* **Component:** ✨ Add campus global navbar component ([a3601ba](https://github.com/ucsc/truss/commit/a3601ba79a5d4ff059128933f5142742fe65745c))
* **Component:** ✨ Add campus logo component ([3093bff](https://github.com/ucsc/truss/commit/3093bffa25ea85c91dda09521bcdc6ca23379108))
* **Component:** ✨ Add card component ([3581769](https://github.com/ucsc/truss/commit/35817694ff932ddd6bf13a193b0cbda4185dd28a))
* **Component:** ✨ Add site title component ([ccf2ea4](https://github.com/ucsc/truss/commit/ccf2ea443855436a5fb9b01326606acad1bb12b9))
* **Component:** ✨ Rename crumbs to breadcrumbs and add initial setup ([6eb0c4d](https://github.com/ucsc/truss/commit/6eb0c4d279ad9908b4b5506ed2a84bac056b2eb3))
* **Component:** ✨ trss-data-list now conforms to the JSON feed spec ([798f1bb](https://github.com/ucsc/truss/commit/798f1bbd2946e33f8aba8fb676cc5d6ec8c0c3a3))


### Bug Fixes

* 📝 Fix broken link to UCSC logo in docs ([07e19e3](https://github.com/ucsc/truss/commit/07e19e39d42f3a87fbb2cbf30e2092149bfc8aa7))
