# fah-client
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

The Folding@home project's background program (FahClient) provides a telnet-based [third party client interface](https://github.com/FoldingAtHome/fah-control/wiki/3rd-party-FAHClient-API) for client programs to monitor the current folding status.
This interface is meant to be used by other software and humans as well, which results in an API that feels more like a shell frontend.
A client program must generate syntactically correct string commands and parse the responses coming from FahClient.
Partially, the responses are serialized in a data serialization format called PYON (wtf).
PYON parsing is done by my [fah-pyon package](https://github.com/tamaracha/node-fah-pyon).
Fah-client is intended to be an abstraction of that string-based shell interface for node.js.
It contains helper functions and types to generate fah commands and connect to the fah interface.

## Install
Currently this is not published to npm, but there are installable package tarballs attached to the github releases.
Add this package to your npm project.
Make sure you have folding@home installed and running on your system before using this package.

```sh
npm i https://github.com/tamaracha/node-fah-client/releases/download/v0.2.0/fah-client-0.2.0.tgz
```

## Usage
The central part of this package is the `FahClient` class.
It communicates with the FahClient program and can receive Command objects.
A command contains a textual input representation for the fah interface and information about the expected response type.
Users of this package are not supposed to create these Command objects manually, but should use the factory methods provided in this package.
A FahClient instance inputs the command text to the fah interface and tries to parse the response.
Please view the [API docs](https://tamaracha.github.io/node-fah-client) for usage details.

```node
/** demo.mjs */
'use strict'
import { FahClient, work } from 'fah-client'

// create commands for getting units and simulation info
const cmd1 = work.units()
const cmd2 = work.simulation(0)

async function demo () {
  const fah = new FahClient()
  try {
  // connect to the fah interface
  await fah.connect()
    // if connected, fetch units in queue
  const units = await fah.dispatch(cmd1)
  console.log(units)
    // Fetch simulation data in slot 0 …
  const simulation = await fah.dispatch(cmd2)
  console.log(simulation)
  // After work is done, disconnect from fah interface
  await fah.disconnect()
    console.log('Goodbye')
  } catch (e) {
    console.log(e)
  }
}
demo()
```


## License
MIT
