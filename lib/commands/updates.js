'use strict'
/** @module */

import { Command } from './command.js'
import { formatExpression } from '../helpers/format-expression.js'

/**
 * An update configuration object
 * @template R
 * @typedef {object} Update
 * @property {number} id - unique id number
 * @property {number} rate - The minimal distance in seconds between subsequent update messages
 * @property {import("./command").Command<R>} payload - The command to be evaluated
*/

/**
 * Create a new command to clear the full updates list
 * @return { import("./command").Command<null> }
 */
export const clear = function clear () {
  return new Command('[updates] clear', 'updates clear')
}

/**
 * Create a new command to reset all updates
 * @return { import("./command").Command<null> }
 */
export const reset = function reset () {
  return new Command('[updates] reset', 'updates reset')
}

/**
 * @typedef {object} UpdateDescription
 * @property {number} id
 * @property {number} rate
 * @property {string} expression
*/

/**
 * Create a new command to list all updates
 * @return { import("./command").Command<UpdateDescription[]> }
 */
export const list = function list () {
  const cmd = new Command('[updates] list', 'updates list')
  cmd.parse = parseUpdates
  return cmd
}

/**
 * @param {string} message - A list of updates as rectangular space separated values
 * @return { UpdateDescription[] }
*/
function parseUpdates (message) {
  return message.trim().split('\n')
    .map(line => {
      const [id, rate, ...expression] = line.split(' ')
      return { id: parseInt(id), rate: parseInt(rate), expression: expression.join(' ') }
    })
}

/**
 * Create a new command to add a new update
 * @template R
 * @param {Update<R>} update - The configuration for the new update
 * @return { import("./command").Command<R> } The first update value
 */
export const create = function create ({ id, rate, payload }) {
  const text = `updates add ${id} ${rate} ${formatExpression(payload.text)}`
  return new Command('[updates] create', text, payload.responseType)
}

/**
 * Create a new command to remove one update from the updates list
 * @param {number} id - The id of an update
 * @return { import("./command").Command<null> }
 */
export const destroy = function destroy (id) {
  return new Command('[updates] destroy', 'updates del ' + id)
}
