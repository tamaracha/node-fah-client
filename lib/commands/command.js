'use strict'
import * as errors from '../errors.js'
import { counter, Tokenizer } from '../helpers/index.js'

/**
 * @module
 * @public
*/

const commandCounter = counter(-1)
const tokenizer = new Tokenizer()

/**
 * A command which can parse its response messages
 * @public
 * @template R
 */
class Command {
  /**
   * Create a Command
   * @param {string} type - Identifies the unique command type, e.g., [options] list.
   * @param {string} text - The serialized command which can be passed to the telnet fah interface.
   * @param {string} [responseType=none] - Indicates the object type of the response message, if the response is in pyon serialization format.
  */
  constructor (type, text, responseType = 'empty') {
    this.id = commandCounter.next()
    this.type = type
    this.text = text
    this.responseType = responseType
  }

  /**
   * @public
   * @param {import("fah-pyon").Message} message
   * @return {boolean}
   */
  isResponse (message) {
    return this.responseType === message.type
  }

  /**
   * Parse a response message
   * @public
   * @param {string} str
   * @return {R}
   */
  parse (str) {
    const tokens = tokenizer.tokenize(str)
    const error = tokens.find(m => m.type === 'error')
    if (error) { throw new errors.ReportedError(error.payload, this) }
    const message = tokens.find(this.isResponse, this)
    if (message) { return message.payload }
    throw new errors.ResponseMismatchError(this, tokens[0])
  }
}

export { Command }
