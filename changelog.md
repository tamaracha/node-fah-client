# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Publish package binaries in github releases

### Fixed
- Importing commonjs modules via default import syntax in ESM is now emitted correctly by typescript via esModuleInterop flag
- Added some basic integration test scripts to verify that ESM version and typescript's output is working

## [0.1.0] - 2020-04-02
### Added
- FahClient class that connects to the Fah interface and can process command objects. Commands can be created and stored anywhere and can be intercepted before passing them to the dispatch method of a FahClient instance.
- Command class that knows to parse responses from the Fah interface
- Modules containing factory functions to create commands without having to worry about the command text formatting prescribed by the Fah interface. These could also be static class members, but I wanted them to be namespaced and more decoupled from the Command class.
- Type definitions for response messages coming from Fah interface
- Unit tests using Ava
- Write source code as ES modules, but use typescript to transpile and generate declarations from jsdoc comments for Node v12.
- README and CHANGELOG files
- Generate docs and deploy to gh-pages via github actions.
- Use [Javascript Standard Style](https://github.com/standard/standard) for code linting and formatting.

[Unreleased]: https://github.com/tamaracha/node-fah-client/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/tamaracha/node-fah-client/releases/tag/v0.1.0
