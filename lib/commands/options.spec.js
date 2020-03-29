'use strict'
import test from 'ava'
import { listByFilter, listByNames, update } from './options.js'

test('listByFilter without args', t => {
  t.is(listByFilter().text, 'options')
})
test('list explicitly set options', t => {
  t.is(listByFilter('explicit').text, 'options')
})
test('list explicitly and implicitly set options', t => {
  t.is(listByFilter('implicit').text, 'options -d')
})
test('list explicitly and implicitly set and unset options', t => {
  t.is(listByFilter('unset').text, 'options -a')
})
test('list all options', t => {
  t.is(listByFilter('all').text, 'options *')
})

test('list named options', t => {
  t.is(listByNames(['user', 'team']).text, 'options user team')
})

test('list named slot options', t => {
  t.is(listByNames(['user', 'team'], 0).text, 'slot-options 0 user team')
})

test('update options', t => {
  t.is(update({ user: 'x', team: 'y' }).text, 'options user=x team=y')
})
