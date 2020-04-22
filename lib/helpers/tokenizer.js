'use strict'
import { safeLoad } from 'fah-pyon'

/**
 * @module
 * @public
*/

/**
 * Split telnet messages into tokens
 * @public
*/
class Tokenizer {
  /**
    * @param {string} [prompt="\r\n"]
  */
  constructor (prompt = '> ') {
    this.prompt = prompt
  }

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
 * Splits a string from telnet into a sequence of messages and prompts
  * @param {string} msg - A telnet response to parse
   * @return {import("fah-pyon").Message[]} An array of messages which can be of type empty, prompt, or were produced by fah-pyon's safeLoad function
 * @public
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

export { Tokenizer }
