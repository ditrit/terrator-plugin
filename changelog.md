# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Fixed

- Add missing icon for aws provider and aws db instance
- Fix oversize of all icons
- Fix container metadata in aws metadata
- Fix empty display for aws provider
- Add default values to metadata properties `attributes` and `isContainer`

## [0.1.2] - 2022/10/05

### Fixed

- Fix icons size in models

## [0.1.1] - 2022/10/05

### Changed

- Update plugin-core to version 0.6.0

## [0.1.0] - 2022/09/20

### Added

- Setup GitHub workflow
- Setup default plugin structure
- Set default metadata parser and validator
- Add metadata for aws
- Add parser for terraform files
- Add renderer for terraform files
- Import metadata instead of passing it through constructor in TerraformMetadata

[0.1.2]: https://github.com/ditrit/terrator-plugin/blob/0.1.2/changelog.md
[0.1.1]: https://github.com/ditrit/terrator-plugin/blob/0.1.1/changelog.md
[0.1.0]: https://github.com/ditrit/terrator-plugin/blob/0.1.0/changelog.md
