'use strict'
const { describe } = require('riteway')
const { pause, resume, finish, shutdown } = require('./control')

describe('control commands', async assert => {
  assert({
    given: 'Return value of pause command without slot',
    should: 'return correct pause command',
    actual: pause().text,
    expected: 'pause'
  })
  assert({
    given: 'Return value of pause command with slot',
    should: 'return correct pause command',
    actual: pause(0).text,
    expected: 'pause 0'
  })
  assert({
    given: 'Return value of resume command without slot',
    should: 'return correct unpause command',
    actual: resume().text,
    expected: 'unpause'
  })
  assert({
    given: 'Return value of resume command with slot',
    should: 'return correct unpause command',
    actual: resume(3).text,
    expected: 'unpause 3'
  })
  assert({
    given: 'Return value of finish command',
    should: 'return correct finish command',
    actual: finish().text,
    expected: 'finish'
  })
  assert({
    given: 'Return value of finish command with slot',
    should: 'return correct finish command',
    actual: finish(7).text,
    expected: 'finish 7'
  })
  assert({
    given: 'Return value of shutdown command',
    should: 'return correct shutdown command',
    actual: shutdown().text,
    expected: 'shutdown'
  })
})
