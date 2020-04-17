'use strict'
/** @module */

import { load } from 'fah-pyon'
import * as errors from '../errors.js'
import { counter } from '../helpers/counter.js'
const commandCounter = counter(-1)

/**
 * A command which can parse its response messages
 * @template R
 */
export class Command {
  /**
   * Create a new command object
   * @param {string} type - Identifies the unique command type, e.g., [options] list.
   * @param {string} text - The serialized command which can be passed to the telnet fah interface.
   * @param {string} [responseType=none] - Indicates the object type of the response message, if the response is in pyon serialization format.
   */
  constructor (type, text, responseType = 'none') {
    this.id = commandCounter.next()
    this.type = type
    this.text = text
    this.responseType = responseType
  }

  /**
   * @param {import("fah-pyon").Message} message
   * @return {boolean}
   */
  isResponse (message) {
    return this.responseType === message.type
  }

  /**
   * Parse a response message
   * @param {string} message
   * @return {R}
   */
  parse (message) {
    let parsed
    try {
      parsed = load(message)
    } catch (e) {
      if (this.responseType === 'none') {
        // prettier-ignore
        return /** @type any */ (message)
      } else {
        throw e
      }
    }
    if (parsed && parsed.type === 'error') {
      throw new errors.ReportedError(parsed.payload, this)
    }
    if (!this.isResponse(parsed)) {
      throw new errors.ResponseMismatchError(this, parsed)
    }
    return parsed.payload
  }
}
