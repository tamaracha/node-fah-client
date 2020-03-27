'use strict'
const { describe } = require('riteway')
async function run () {
const { listByFilter, listByNames, update, formatOptions } = await import('./options.js')

describe('list by filter', async assert => {
  assert({
    given: 'no args',
    should: 'return command for explicit options',
    actual: listByFilter().text,
    expected: 'options'
  })
  assert({
    given: 'filter for explicitly set options',
    should: 'return command for explicit options',
    actual: listByFilter('explicit').text,
    expected: 'options'
  })
  assert({
    given: 'filter for explicitly and implicitly set options',
    should: 'return command for explicit and implicit options',
    actual: listByFilter('implicit').text,
    expected: 'options -d'
  })
  assert({
    given: 'filter for explicitly and implicitly set and unset options',
    should: 'return command for explicit options',
    actual: listByFilter('unset').text,
    expected: 'options -a'
  })
  assert({
    given: 'filter for all options',
    should: 'return command for all options',
    actual: listByFilter('all').text,
    expected: 'options *'
  })
})

describe('list by names', async assert => {
  assert({
    given: 'array with option names',
    should: 'return command for the options in the given array',
    actual: listByNames(['user', 'team']).text,
    expected: 'options user team'
  })
  assert({
    given: 'array with option names and slot 0',
    should: 'return command for the slot options in the given array',
    actual: listByNames(['user', 'team'], 0).text,
    expected: 'slot-options 0 user team'
  })
})

describe('update', async assert => {
  assert({
    given: 'array with option names',
    should: 'return command for the options in the given array',
    actual: update({ user: 'x', team: 'y' }).text,
    expected: 'options user=x team=y'
  })
})

const shouldNull = 'return a null value'
const shouldformatOptions =
  'return a serialization for the FAH interface to set the given options'

describe('formatOptions in options command', async assert => {
  const shouldSet =
    'return the serialization for the FAH interface to set that option'
  const shouldUnset =
    'return the serialization for the FAH interface to unset that option'
  assert({
    given: 'a key value pair with a null value',
    should: shouldUnset,
    actual: formatOptions({ user: null }),
    expected: 'user!'
  })
  assert({
    given: 'a key value pair with a string value',
    should: shouldSet,
    actual: formatOptions({ user: 'tamaracha' }),
    expected: 'user=tamaracha'
  })
  assert({
    given: 'a key value pair with an integer value',
    should: shouldSet,
    actual: formatOptions({ 'check-point': 3 }),
    expected: 'check-point=3'
  })
  assert({
    given: 'a key value pair with a number value',
    should: shouldSet,
    actual: formatOptions({ 'some-fractional': 0.75 }),
    expected: 'some-fractional=0.75'
  })
  assert({
    given: 'a key value pair with a boolean value',
    should: shouldSet,
    actual: formatOptions({ 'pause-on-start': true }),
    expected: 'pause-on-start=true'
  })
  assert({
    given: 'a key value pair with an empty string value',
    should: shouldUnset,
    actual: formatOptions({ 'pause-on-start': '' }),
    expected: 'pause-on-start!'
  })
  assert({
    given: 'a key value pair with an array value',
    should: shouldNull,
    actual: formatOptions({ 'pause-on-start': [1, 2, 3] }),
    expected: ''
  })
  assert({
    given: 'a key value pair with an object value',
    should: shouldNull,
    actual: formatOptions({ 'pause-on-start': { a: 1, b: 2 } }),
    expected: ''
  })
  assert({
    given: 'a key value pair with an empty key',
    should: shouldNull,
    actual: formatOptions({ '': 0 }),
    expected: ''
  })
  assert({
    given: 'A null value',
    should: shouldNull,
    actual: formatOptions(null),
    expected: ''
  })
  assert({
    given: 'A string value',
    should: shouldNull,
    actual: formatOptions('random'),
    expected: ''
  })
  assert({
    given: 'A number value',
    should: shouldNull,
    actual: formatOptions(42),
    expected: ''
  })
  assert({
    given: 'A truthy boolean value',
    should: shouldNull,
    actual: formatOptions(true),
    expected: ''
  })
  assert({
    given: 'A falsy boolean value',
    should: shouldNull,
    actual: formatOptions(false),
    expected: ''
  })
  assert({
    given: 'An array value',
    should: shouldNull,
    actual: formatOptions([1, 2, 3]),
    expected: ''
  })
  assert({
    given: 'An empty object',
    should: 'return an empty string',
    actual: formatOptions({}),
    expected: ''
  })
  assert({
    given: 'An object with one valid pair',
    should: shouldformatOptions,
    actual: formatOptions({ user: 'tamaracha' }),
    expected: 'user=tamaracha'
  })
  assert({
    given: 'An object with three valid pairs',
    should: shouldformatOptions,
    actual: formatOptions({
      user: 'tamaracha',
      team: null,
      'pause-on-start': true
    }),
    expected: 'user=tamaracha team! pause-on-start=true'
  })
  assert({
    given: 'An object with two valid and one invalid pairs',
    should: 'skip the invalid pairs and formatOptions the valid pairs',
    actual: formatOptions({
      user: 'tamaracha',
      team: null,
      'pause-on-start': [1, 2, 3]
    }),
    expected: 'user=tamaracha team!'
  })
})
}
run()
