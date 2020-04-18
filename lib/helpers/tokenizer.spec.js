'use strict'
import test from 'ava'
import { Tokenizer } from './tokenizer.js'
const tokenizer = new Tokenizer()

test('PyON before prompt', t => {
  const input = 'PyON 1 test\n42\n---\n> '
  const result = tokenizer.tokenize(input)
  t.is(result.length, 2)
  t.is(result[0].type, 'test')
  t.is(result[0].payload, 42)
})

test('Text before prompt', t => {
  const input = 'xyz\n> '
  const result = tokenizer.tokenize(input)
  t.is(result.length, 2)
  t.is(result[0].type, 'none')
  t.is(result[0].payload, 'xyz')
})

test('PyON after prompt', t => {
  const input = '\n> PyON 1 test\n42\n---'
  const result = tokenizer.tokenize(input)
  t.is(result.length, 3)
  t.is(result[1].type, 'prompt')
  t.is(result[2].type, 'test')
  t.is(result[2].payload, 42)
})

test('Text after prompt', t => {
  const input = '\n> xyz'
  const result = tokenizer.tokenize(input)
  t.is(result.length, 3)
  t.is(result[1].type, 'prompt')
  t.is(result[2].type, 'none')
  t.is(result[2].payload, 'xyz')
})

test('PyON without prompt', t => {
  const input = 'PyON 1 test\n42\n---'
  const result = tokenizer.tokenize(input)
  t.is(result.length, 1)
  t.is(result[0].type, 'test')
  t.is(result[0].payload, 42)
})

test('text without prompt', t => {
  const input = 'xyz'
  const result = tokenizer.tokenize(input)
  t.is(result.length, 1)
  t.is(result[0].type, 'none')
  t.is(result[0].payload, 'xyz')
})
