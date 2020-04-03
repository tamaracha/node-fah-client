'use strict'
const { FahClient, control } = require('../../dist')

// create commands
const cmd = control.heartbeat()

async function demo () {
  const fah = new FahClient()
  try {
  // connect to the fah interface
  await fah.connect()
  const heartbeat = await fah.dispatch(cmd)
  console.log(heartbeat)
  // After work is done, disconnect from fah interface
  await fah.disconnect()
    console.log('Goodbye')
  } catch (e) {
    console.log(e)
  }
}
demo()
