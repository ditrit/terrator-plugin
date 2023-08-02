# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Changed

- Update aws metadada

## [0.4.0] - 2023/07/21

### Added

- Add reference to resources and variables handling
- Parsing and rendering of `variable`, `output` and `locals` objects

### Fixed

- Fix parsing error where lists of numbers were always parsed as strings

## [0.3.1] - 2023/07/05

### Changed

- Update plugin-core to version 0.17.0.

### Fixed

- Fix empty list attribute, [bug link](https://github.com/ditrit/terrator-plugin/issues/78).

## [0.3.0] - 2023/06/06

### Added

- Add `getModels` function in `TerraformParser` to get the list of folder paths that represent a model.
- Add default terraform icon.

### Changed

- Update plugin-core to version 0.16.0.

## [0.2.0] - 2023/04/19

### Added

- Differentiate between attribute blocks and dynamic blocks.
- Script to generate the parser from the grammar using npm cli.
- Add events related to parsing and rendering.
- Configuration for syntax color in Monaco.

### Changed

- Update plugin-core to version 0.15.1.
- ANTLR parser and lexer with [official ANTLR terraform grammar](https://github.com/antlr/grammars-v4/tree/master/terraform).

### Fixed

- Parsing error when a component had an empty body.
- Fix missing object attribute definition, [bug link](https://github.com/ditrit/terrator-plugin/issues/67).

## [0.1.12] - 2023/02/09

### Changed

- Update plugin-core to version 0.13.0.

## [0.1.11] - 2023/02/07

### Fixed

- Update plugin-core to version 0.12.1 to fix some bugs.

## [0.1.10] - 2023/02/02

### Changed

- Update plugin-core to version 0.12.0.

## [0.1.9] - 2023/01/31

### Changed

- Template of models (container and component).
- Icons size to fit into the new models.
- Update all project dependencies.

### Fixed

- Parsing error when having a component with object inside object, [bug link](https://github.com/ditrit/terrator-plugin/issues/41).
- Fix parsing error when file content is null, [bug link](https://github.com/ditrit/terrator-plugin/issues/43).
- Fix render of an object attribute, [bug link](https://github.com/ditrit/terrator-plugin/issues/46).
- Fix missing attribute definition for an object, [bug link](https://github.com/ditrit/terrator-plugin/issues/48).

## [0.1.8] - 2023/01/16

### Changed

- Replace documentation generation library ESDoc by JSDoc.
- Update plugin-core to version 0.11.0.

### Removed

- Children management in parser and render.

## [0.1.7] - 2022/11/28

### Fixed

- Fix package-lock of plugin-core.

## [0.1.6] - 2022/11/28

### Changed

- Update plugin-core to version 0.10.0.

## [0.1.5] - 2022/11/25

### Fixed

- Fix default file name for new component.

## [0.1.4] - 2022/11/24

### Changed

- Update plugin-core to version 0.9.1.

### Fixed

- Fix provider rendering, [bug link](https://github.com/ditrit/terrator-plugin/issues/22).
- Fix module rendering, [bug link](https://github.com/ditrit/terrator-plugin/issues/25).

## [0.1.3] - 2022/10/07

### Fixed

- Add missing icon for aws provider and aws db instance.
- Fix oversize of all icons.
- Fix container metadata in aws metadata.
- Fix empty display for aws provider.
- Add default values to metadata properties `attributes` and `isContainer`.

## [0.1.2] - 2022/10/05

### Fixed

- Fix icons size in models.

## [0.1.1] - 2022/10/05

### Changed

- Update plugin-core to version 0.6.0.

## [0.1.0] - 2022/09/20

### Added

- Setup GitHub workflow.
- Setup default plugin structure.
- Set default metadata parser and validator.
- Add metadata for aws.
- Add parser for terraform files.
- Add renderer for terraform files.
- Import metadata instead of passing it through constructor in TerraformMetadata.

[0.4.0]: https://github.com/ditrit/terrator-plugin/blob/0.4.0/changelog.md
[0.3.1]: https://github.com/ditrit/terrator-plugin/blob/0.3.1/changelog.md
[0.3.0]: https://github.com/ditrit/terrator-plugin/blob/0.3.0/changelog.md
[0.2.0]: https://github.com/ditrit/terrator-plugin/blob/0.2.0/changelog.md
[0.1.12]: https://github.com/ditrit/terrator-plugin/blob/0.1.12/changelog.md
[0.1.11]: https://github.com/ditrit/terrator-plugin/blob/0.1.11/changelog.md
[0.1.10]: https://github.com/ditrit/terrator-plugin/blob/0.1.10/changelog.md
[0.1.9]: https://github.com/ditrit/terrator-plugin/blob/0.1.9/changelog.md
[0.1.8]: https://github.com/ditrit/terrator-plugin/blob/0.1.8/changelog.md
[0.1.7]: https://github.com/ditrit/terrator-plugin/blob/0.1.7/changelog.md
[0.1.6]: https://github.com/ditrit/terrator-plugin/blob/0.1.6/changelog.md
[0.1.5]: https://github.com/ditrit/terrator-plugin/blob/0.1.5/changelog.md
[0.1.4]: https://github.com/ditrit/terrator-plugin/blob/0.1.4/changelog.md
[0.1.3]: https://github.com/ditrit/terrator-plugin/blob/0.1.3/changelog.md
[0.1.2]: https://github.com/ditrit/terrator-plugin/blob/0.1.2/changelog.md
[0.1.1]: https://github.com/ditrit/terrator-plugin/blob/0.1.1/changelog.md
[0.1.0]: https://github.com/ditrit/terrator-plugin/blob/0.1.0/changelog.md
