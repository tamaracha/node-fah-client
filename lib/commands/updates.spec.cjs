'use strict'
const { describe } = require('riteway')

async function run () {
  const { control, updates } = await import('./index.js')
  describe('create updates', async assert => {
    assert({
      given: 'create update command with heartbeat',
      should: 'return command',
      actual: updates.create(0, 5, control.heartbeat()).text,
      expected: 'updates add 0 5 $heartbeat'
    })
  })
}
run()
