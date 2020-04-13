'use strict'
/** @module */
import { load } from 'fah-pyon'

/**
 * @typedef {object} Token
 * @property {string} type
 * @property {any} [payload]
*/

export class Tokenizer {
  /**
   * @return {Token}
  */
  static empty () {
    return { type: 'empty' }
  }

  /**
  * @return {Token}
 */
  static prompt () {
    return { type: 'prompt' }
  }

  /**
 * @param {string} msg
  * @return {Token}
 */
  static text (msg) {
    return { type: 'text', payload: msg }
  }

  /**
 * @param {import("fah-pyon").Message} msg
  * @return {Token}
 */
  static pyon (msg) {
    return { type: 'PyON', payload: msg }
  }

  /**
 * @param {string} msg
  * @return {Token}
 */
  static findPyon (msg) {
    try {
      const parsed = load(msg)
      return Tokenizer.pyon(parsed)
    } catch (e) {
      return Tokenizer.text(msg)
    }
  }

  /**
  * @param {string} [prompt="\r\n"]
 */
  constructor (prompt = '\r\n') {
    this.prompt = prompt
  }

  /**
  * @param {string} msg
   * @return {Token[]}
 */
  tokenize (msg) {
    let tokens = []
    if (msg.endsWith(this.prompt)) {
      tokens = [
        Tokenizer.findPyon(msg.slice(0, -this.prompt.length)),
        Tokenizer.prompt()
      ]
    } else if (msg.startsWith(this.prompt)) {
      tokens = [
        Tokenizer.empty(),
        Tokenizer.prompt(),
        Tokenizer.findPyon(msg.slice(this.prompt.length))
      ]
    } else {
      tokens = [
        Tokenizer.findPyon(msg)
      ]
    }
    return tokens
  }
}
