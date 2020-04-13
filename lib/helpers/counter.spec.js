'use strict'
import test from 'ava'
import { counter } from './counter.js'

const c = counter(-1)
test('counter', t => {
  t.is(c.current(), -1)
  t.is(c.next(), 0)
  t.is(c.next(), 1)
  t.is(c.next(), 2)
  t.is(c.has(1), true)
  t.is(c.prev(), 1)
})
