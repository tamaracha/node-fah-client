'use strict'
const { FahClient, control, options, slots, updates, work } = require('../../dist/index.js')

async function demo () {
  const fc = await FahClient.connect()
  fc.events.on('token', token => console.log(token.type))
  const updateCommands = [
    { id: 0, rate: 5, payload: control.heartbeat() },
    { id: 1, rate: 5, payload: slots.list() },
    { id: 2, rate: 5, payload: work.units() },
    { id: 3, rate: 5, payload: options.listByFilter('all') }
  ]
  await fc.dispatch(updates.clear())
  for (const c of updateCommands) {
    fc.dispatch(updates.create(c))
  }
  const list = await fc.dispatch(updates.list())
  console.log(list)
  await fc.end()
}
demo()
