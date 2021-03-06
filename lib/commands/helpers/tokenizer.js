'use strict'
import stream from 'stream'
import { safeLoad } from 'fah-pyon'

/**
 * @module
 * @public
*/

/** @typedef {import("fah-pyon").Message} Token */

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
   * @return {Token}
  */
  static empty () {
    return { type: 'empty', payload: null }
  }

  /**
 * @param {string} value
   * @return {Token}
 */
  static prompt (value) {
    return { type: 'prompt', payload: value }
  }

  /**
 * Splits a string from telnet into a sequence of messages and prompts
  * @param {string} msg - A telnet response to parse
   * @return {Token[]} An array of messages which can be of type empty, prompt, or were produced by fah-pyon's safeLoad function
 * @public
 */
  getTokens (msg) {
    if (msg.endsWith(this.prompt)) {
      return [
        safeLoad(msg.slice(0, -this.prompt.length)),
        Tokenizer.prompt(this.prompt)
      ]
    } else if (msg.startsWith(this.prompt)) {
      return [
        Tokenizer.empty(),
        Tokenizer.prompt(this.prompt),
        safeLoad(msg.slice(this.prompt.length))
      ]
    } else {
      return [
        safeLoad(msg)
      ]
    }
  }

  /**
   * Get a transform stream that converts telnet output to tokens
   * @public
   * @param {stream.Readable} [readable] - A readable stream which is piped into the new transform stream.
   * @return {stream.Transform}
  */
  getTokenStream (readable) {
    const self = this
    /**
     * @param {string} chunk
     * @param {BufferEncoding} encoding
     * @param {stream.TransformCallback} callback
     * @this {stream.Transform}
    */
    function transformFn (chunk, encoding, callback) {
      const tokens = self.getTokens(chunk)
      tokens.forEach(token => this.push(token))
      callback()
    }
    const transform = new stream.Transform({
      decodeStrings: false,
      readableObjectMode: true,
      transform: transformFn
    })
    if (readable && readable instanceof stream.Readable) { readable.pipe(transform) }
    return transform
  }
}

export { Tokenizer }
