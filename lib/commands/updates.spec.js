'use strict'
import test from 'ava'
import { control, updates } from './index.js'

test('create update with heartbeat', t => {
  t.is(
    updates.create({ id: 0, rate: 5, payload: control.heartbeat() }).text,
    'updates add 0 5 $heartbeat'
  )
})
