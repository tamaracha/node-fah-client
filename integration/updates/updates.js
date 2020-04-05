'use strict'
import { FahClient, control, options, slots, updates, work } from '../../lib/index.js'
const fc = new FahClient()

async function demo () {
  const updateCommands = [
    { id: 0, rate: 5, payload: control.heartbeat() },
    { id: 1, rate: 5, payload: slots.list() },
    { id: 2, rate: 5, payload: work.units() },
    { id: 3, rate: 5, payload: options.listByFilter('all') }
  ]
  await fc.connect()
  await fc.dispatch(updates.clear())
  for (const c of updateCommands) {
    await fc.dispatch(updates.create(c))
  }
  const list = await fc.dispatch(updates.list())
  console.log(list)
  await fc.disconnect()
}
demo()
