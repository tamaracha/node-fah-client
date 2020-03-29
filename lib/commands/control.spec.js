'use strict'
import test from 'ava'
import { pause, resume, finish, shutdown } from './control.js'

test('pause command without slot', t => {
  t.is(pause().text, 'pause')
})

test('pause command with slot', t => {
  t.is(pause(0).text, 'pause 0')
})

test('resume command without slot', t => {
  t.is(resume().text, 'unpause')
})

test('resume command with slot', t => {
  t.is(resume(0).text, 'unpause 0')
})

test('finish command without slot', t => {
  t.is(finish().text, 'finish')
})

test('finish command with slot', t => {
  t.is(finish(0).text, 'finish 0')
})

test('shutdown command', t => {
  t.is(shutdown().text, 'shutdown')
})
