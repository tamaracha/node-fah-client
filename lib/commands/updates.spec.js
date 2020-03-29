'use strict'
import test from 'ava'
import { control, updates } from './index.js'

test('create update with heartbeat', t => {
  t.is(
    updates.create(0, 5, control.heartbeat()).text,
    'updates add 0 5 $heartbeat'
  )
})
