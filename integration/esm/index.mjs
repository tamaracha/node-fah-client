'use strict'
import { FahClient, control } from '../../lib/index.js'

// create commands
const cmd = control.heartbeat()

async function demo () {
  try {
  // connect to the fah interface
  const { fah, init } = await FahClient.connect()
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
