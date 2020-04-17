'use strict'
import test from 'ava'
import { Tokenizer } from './tokenizer.js'
const tokenizer = new Tokenizer()

test('PyON and prompt', t => {
  const input = 'PyON 1 test\n42\n---\n> '
  const result = tokenizer.tokenize(input)
  t.is(result.length, 2)
  t.is(result[0].type, 'PyON')
  t.is(result[0].payload.payload, 42)
})
