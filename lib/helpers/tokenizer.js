'use strict'
/** @module */
import { safeLoad } from 'fah-pyon'

export class Tokenizer {
  /**
   * @return {import("fah-pyon").Message}
  */
  static empty () {
    return { type: 'empty', payload: null }
  }

  /**
 * @param {string} value
   * @return {import("fah-pyon").Message}
 */
  static prompt (value) {
    return { type: 'prompt', payload: value }
  }

  /**
  * @param {string} [prompt="\r\n"]
 */
  constructor (prompt = '\n> ') {
    this.prompt = prompt
  }

  /**
 * Splits a string from telnet into a sequence of messages and prompts
  * @param {string} msg - A telnet response to parse
   * @return {import("fah-pyon").Message[]} An array of messages which can be of type empty, prompt, or were produced by fah-pyon's safeLoad function
 */
  tokenize (msg) {
    let tokens = []
    if (msg.endsWith(this.prompt)) {
      tokens = [
        safeLoad(msg.slice(0, -this.prompt.length)),
        Tokenizer.prompt(this.prompt)
      ]
    } else if (msg.startsWith(this.prompt)) {
      tokens = [
        Tokenizer.empty(),
        Tokenizer.prompt(this.prompt),
        safeLoad(msg.slice(this.prompt.length))
      ]
    } else {
      tokens = [
        safeLoad(msg)
      ]
    }
    return tokens
  }
}
