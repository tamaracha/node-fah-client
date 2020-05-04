'use strict'
const { FahClient, control } = require('../../dist/')

// create commands
const cmd = control.heartbeat()

async function demo () {
  try {
  // connect to the fah interface
  const fah = await FahClient.connect()
    fah.events.once('ready', init => console.log('init: ', init))
  const heartbeat = await fah.dispatch(cmd)
  console.log(heartbeat)
  // After work is done, disconnect from fah interface
  await fah.end()
    console.log('Goodbye')
  } catch (e) {
    console.log(e)
  }
}
demo()
