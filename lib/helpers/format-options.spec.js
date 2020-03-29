'use strict'
import test from 'ava'
import { formatOptions } from './format-options.js'

test('unset option with null', t => {
  t.is(formatOptions({ user: null }), 'user!')
})
test('unset option with empty string', t => {
  t.is(formatOptions({ 'pause-on-start': '' }), 'pause-on-start!')
})

test('set string option', t => {
  t.is(formatOptions({ user: 'tamaracha' }), 'user=tamaracha')
})
test('set integer option', t => {
  t.is(formatOptions({ 'check-point': 3 }), 'check-point=3')
})
test('set number option', t => {
  t.is(formatOptions({ 'some-fractional': 0.75 }), 'some-fractional=0.75')
})
test('set boolean option', t => {
  t.is(formatOptions({ 'pause-on-start': true }), 'pause-on-start=true')
})

test('wrong value types', t => {
  t.throws(() => formatOptions(null), { instanceOf: TypeError })
  t.throws(() => formatOptions(''), { instanceOf: TypeError })
  t.throws(() => formatOptions('random'), { instanceOf: TypeError })
  t.throws(() => formatOptions(42), { instanceOf: TypeError })
  t.throws(() => formatOptions(true), { instanceOf: TypeError })
  t.throws(() => formatOptions(false), { instanceOf: TypeError })
  t.throws(() => formatOptions([1, 2, 3]), { instanceOf: TypeError })
  const input = { 'pause-on-start': [1, 2, 3] }
  t.throws(() => formatOptions(input), { instanceOf: TypeError })
  t.throws(() => formatOptions({ 'pause-on-start': { a: 1, b: 2 } }), {
    instanceOf: TypeError
  })
  t.throws(() => formatOptions({ '': 0 }), { instanceOf: TypeError })
  t.throws(() => formatOptions({}))
})

test('object with three valid pairs', t => {
  const o = {
    user: 'tamaracha',
    team: null,
    'pause-on-start': true
  }
  t.is(formatOptions(o), 'user=tamaracha team! pause-on-start=true')
})
test('An object with two valid and one invalid pairs', t => {
  const o = {
    user: 'tamaracha',
    team: null,
    'pause-on-start': [1, 2, 3]
  }
  t.throws(() => formatOptions(o), { instanceOf: TypeError })
})
