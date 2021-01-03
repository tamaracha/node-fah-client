# fah-client

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![Coverage Status](https://coveralls.io/repos/github/tamaracha/node-fah-client/badge.svg?branch=main)](https://coveralls.io/github/tamaracha/node-fah-client?branch=main)

The Folding@home project's background program (FahClient)
provides a telnet-based [third party client interface]
for client programs to monitor the current folding status.
This interface is meant to be used by other software as well as by humans,
which results in an API that feels more like a shell frontend.
A client program must generate syntactically correct string commands
and parse the responses coming from FahClient.
Partially, the responses are serialized in a data format named PYON.
PYON parsing is done by my [fah-pyon package].
Fah-client is intended to be an abstraction
of that string-based interface for node.js.
It contains helper functions and types
to generate fah commands and connect to the fah interface.

## Install

Currently this is not published to npm,
but there are installable package tarballs attached to the github releases.
Add the [current release package] to your npm project.
Make sure you have folding@home installed and running on your system
before using this package.

```sh
npm i https://github.com/tamaracha/node-fah-client/releases/download/v<version>/fah-client-<version>.tgz
```

## Usage

### Commands and parsing

fah-client/commands handles the raw telnet input and output strings
and contains the logic for command serialization and response parsing.

The commands subpackage is built around the `Command` and `Tokenizer` class.
A command contains a textual input representation for the fah interface
and information about the expected response type.
Users of this package are not supposed to create these Command objects manually,
but should use the factory methods provided in this package.

`Tokenizer` splits an output string from the fah interface into a sequence
of objects (tokens) that fulfill the Message type in the [fah-pyon package].
Clients can operate on this token stream without having to care about strings.
Most responses are either PyON messages or empty strings,
so tokens can be one of the following:

- PyON messages output by fah-pyon's `safeLoad` function
- empty response messages: `{ type: 'empty', payload: null }`
- prompts: `{ type: 'prompt', payload: '\n> ' }`

### Client usage

fah-client/client contains the `FahClient` class
which connects to the fah interface and utilizes fah-client/commands
for the string processing work.
Users can implement their own client around the commands subpackage.

A FahClient instance inputs the command text to the fah interface
and tries to parse the response.
It emits the tokens as token event,
and tokens that are not part of a command response as message event.

```node
/** demo.mjs */
'use strict'
// ESM or typescript
import { FahClient, work } from 'fah-client'
// or commonjs
// const { FahClient, work } = require('fah-client')

// create commands for getting units and simulation info
const unitsCmd = work.units()
const simulationCmd = work.simulation(0)

async function demo () {
  try {
  // connect to the fah interface and display the welcome message
    const { fah, init } = await fah.connect()
    console.log(init)
    // if connected, fetch units in queue
    const units = await fah.dispatch(unitsCmd)
    console.log(units)
    // Fetch simulation data in slot 0 …
    const simulation = await fah.dispatch(simulationCmd)
    console.log(simulation)
    // FahClient takes care of sending commands sequentially,
    // so dispatch can be called synchronously
    await Promise.all([
      fah.dispatch(unitsCmd)
      fah.dispatch(simulationCmd)
    ]).then(([unit, simulation]) => console.log(unit, simulation))
    // After work is done, disconnect from fah interface
    await fah.disconnect()
    console.log('Goodbye')
  } catch (e) {
    console.log(e)
  }
}
demo()
```

## Docs

[API docs]

## License

MIT

[current release package]: https://github.com/tamaracha/node-fah-client/releases/download/v0.5.0/fah-client-0.5.0.tgz
[API docs]: https://tamaracha.github.io/node-fah-client
[third party client interface]: https://github.com/FoldingAtHome/fah-control/wiki/3rd-party-FAHClient-API
[fah-pyon package]: https://github.com/tamaracha/node-fah-pyon
