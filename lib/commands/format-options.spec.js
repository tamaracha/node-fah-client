'use strict'
import test from 'ava'
import { formatOptions } from './options.js'

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
  t.is(formatOptions({ 'pause-on-start': [1, 2, 3] }), '')
  t.is(formatOptions({ 'pause-on-start': { a: 1, b: 2 } }), '')
  t.is(formatOptions({ '': 0 }), '')
  t.is(formatOptions(null), '')
  t.is(formatOptions('random'), '')
  t.is(formatOptions(42), '')
  t.is(formatOptions(true), '')
  t.is(formatOptions(false), '')
  t.is(formatOptions([1, 2, 3]), '')
  t.is(formatOptions({}), '')
})

test('object with valid pair', t => {
  t.is(formatOptions({ user: 'tamaracha' }), 'user=tamaracha')
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
  t.is(formatOptions(o), 'user=tamaracha team!')
})
