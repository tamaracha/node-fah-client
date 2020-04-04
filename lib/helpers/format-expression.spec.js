'use strict'
import test from 'ava'
import { formatExpression } from './format-expression.js'

test('format expression without space', t => {
  t.is(formatExpression('options'), '$options')
})

test('format expression with space', t => {
  t.is(formatExpression('options *'), '$(options *)')
})
