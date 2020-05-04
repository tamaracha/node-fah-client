'use strict'
import * as errors from '../errors.js'
import { Tokenizer } from './helpers/index.js'

/**
 * @module
 * @public
*/

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
   * @param {string} [responseType=empty] - Indicates the object type of the response message if the response is in pyon serialization format.
   * @param {function(string): R} [parse] - Can be used to parse the response if a non-PyON token is found. ResponseType must be "none" for this to take place.
  */
  constructor (type, text, responseType = 'empty', parse) {
    this.type = type
    this.text = text
    this.responseType = responseType
    if (typeof parse === 'function') { this.parse = parse }
  }

  /**
   * Convenience method to create a command that receives empty responses
   * @param {string} type - Identifies the unique command type, e.g., [options] list.
   * @param {string} text - The serialized command which can be passed to the telnet fah interface.
   * @return {Command<null>}
  */
  static emptyCommand (type, text) {
    return new Command(type, text, 'empty')
  }

  /**
   * Convenience method to create a command that receives non-PyON responses
   * @template R
   * @param {string} type - Identifies the unique command type, e.g., [options] list.
   * @param {string} text - The serialized command which can be passed to the telnet fah interface.
   * @param {function(string): R} parse - Custom parse function to parse the response if a non-PyON token is found.
   * @return {Command<R>}
  */
  static customCommand (type, text, parse) {
    return new Command(type, text, 'none', parse)
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
  * Tokenize a string and try to find a response message in the resulting tokens
  * @public
  * @param {string} str
  * @param {Tokenizer} [tokenizer]
  * @return {R}
  */
  findResponseFromString (str, tokenizer = new Tokenizer()) {
    return this.findResponseFromTokens(tokenizer.getTokens(str))
  }

  /**
   * Try to find a response message in the given tokens
   * @public
   * @param {import("fah-pyon").Message[]} tokens
   * @return {R}
   */
  findResponseFromTokens (tokens) {
    const error = tokens.find(m => m.type === 'error')
    if (error) { throw new errors.ReportedError(error.payload, this) }
    const message = tokens.find(this.isResponse, this)
    if (!message) { throw new errors.ResponseMismatchError(this, tokens[0]) }
    if (this.responseType === 'none' && typeof this.parse === 'function') {
      return this.parse(message.payload)
    }
    return message.payload
  }
}

export { Command }
