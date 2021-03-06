# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Migrated to typescript 4.x

## [0.6.1] - 2020-05-05

### Fixed

#### Typescript declarations of FahClient

Node module import was emitted as node/stream.
There seem to be some edge cases of esm import syntax
which result in incorrect declarations.

## [0.6.0] - 2020-05-04

### changed

- moved everything related to serializing and parsing fah commands
  to the commands subpackage
  and everything related to fah communication to the client subpackage.
- FahClient is implemented using net.Socket and events.EventEmitter
  (removed telnet-client dependency).
- FahClient uses the transform stream created by tokenizer.getTokenStream
  and operates on a stream of tokens at the readable side.
- new FahClient instances are created through the static FahClient.connect method
- Split fahClient.disconnect method into .end and .destroy methods
- Renamed tokenizer.tokenize to tokenizer.getTokens

### Added

- tokenizer.getTokenStream method which creates a transform stream
  to convert a stream of telnet messages to tokens
- missing status field in Slot type
- Command class can find response either from tokens
  or from string and optionally given tokenizer
- ability to create commands with custom parse callback to parse non-pyon responses

### Fixed

- FahClient takes care of sequential command execution
- parsing of simulation-info messages
  (failed because dashes were not allowed in message name)
- types of Command.emptyCommand and Command.customCommand methods

### Removed

- id field from Command class because tracking a command's id
  is more a client matter than of serializing and parsing

## [0.5.0] - 2020-04-19

### Breaking

- Tokenizer does not return its own Token type anymore,
  but Message objects from fah-pyon, or of type prompt or empty.

### Changed

- updated fah-pyon to the newest nearley-based version
- The FahClient class becomes less important.
  It acts as an example client implementation.
  Tokenizer can be used in conjunction with any socket connection
  for response message parsing.
  I have successfully implemented an rxjs-based client
  using tokenizer for another project.

## [0.4.0] - 2020-04-13

### Added

- Tokenizer which splits telnet-emitted messages up into parts/tokens
  (prompt, text, or PyON).
- Tokenizing augments the command specific parsing and will maybe replace it
- Each created command gets a unique id assigned via counter.

## [0.3.0]

### Added

- Update type which describes an update configuration

### Changed

- Response parsing of the updates.list command:
  The message is parsed from tsv into an array of update description objects.
  Maybe this will be merged with the Update type.
- Response parsing of the updates.create command:
  The response seems to be the first update value,
  so it is parsed as the response type of the respective payload command
- The updates.create function now expects an object of type Update

## [0.2.0] - 2020-04-04

### Added

- ability to format update expressions containing whitespace (wrap them into `$()`)
- missing updates.reset command

## [0.1.1] - 2020-04-03

### Changed

- Publish package binaries in github releases

### Fixed

- Importing commonjs modules via default import syntax in ESM
  is now emitted correctly by typescript via esModuleInterop flag
- Added some basic integration test scripts
  to verify that ESM version and typescript's output is working

## [0.1.0] - 2020-04-02

### Added

- FahClient class that connects to the Fah interface and can process command objects.
  Commands can be created and stored anywhere and can be intercepted
  before passing them to the dispatch method of a FahClient instance.
- Command class that knows to parse responses from the Fah interface
- Modules containing factory functions to create commands
  without having to worry about the command text formatting
  prescribed by the Fah interface.
  These could also be static class members, but I wanted them to be namespaced
  and more decoupled from the Command class.
- Type definitions for response messages coming from Fah interface
- Unit tests using Ava
- Write source code as ES modules, but use typescript to transpile for Node v12
and generate declarations from jsdoc comments.
- README and CHANGELOG files
- Generate docs and deploy to gh-pages via github actions.
- Use [Javascript Standard Style](https://github.com/standard/standard)
  for code linting and formatting.

[Unreleased]: https://github.com/tamaracha/node-fah-client/compare/v0.6.1...HEAD
[0.6.1]: https://github.com/tamaracha/node-fah-client/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/tamaracha/node-fah-client/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/tamaracha/node-fah-client/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/tamaracha/node-fah-client/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/tamaracha/node-fah-client/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tamaracha/node-fah-client/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/tamaracha/node-fah-client/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/tamaracha/node-fah-client/releases/tag/v0.1.0
<!-- markdownlint-configure-file { "MD024": { "siblings_only": true }} -->
