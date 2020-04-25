'use strict'
import { Command } from './command.js'
import { formatExpression, parseUpdates } from './helpers/index.js'

/**
 * @module
 * @public
*/

/**
 * An update configuration object
 * @public
 * @template R
 * @typedef {object} Update
 * @property {number} id - unique id number
 * @property {number} rate - The minimal distance in seconds between subsequent update messages
 * @property {import("./command").Command<R>} payload - The command to be evaluated
*/

/**
 * Create a new command to clear the full updates list
 * @public
 * @return { import("./command").Command<null> }
 */
export function clear () {
  return new Command('[updates] clear', 'updates clear')
}

/**
 * Create a new command to reset all updates
 * @public
 * @return { import("./command").Command<null> }
 */
export function reset () {
  return new Command('[updates] reset', 'updates reset')
}

/**
 * @public
 * @typedef {object} UpdateDescription
 * @property {number} id
 * @property {number} rate
 * @property {string} expression
*/

/**
 * Create a new command to list all updates
 * @public
 * @return { import("./command").Command<UpdateDescription[]> }
 */
export function list () {
  return new Command('[updates] list', 'updates list', 'none', parseUpdates)
}

/**
 * Create a new command to add a new update
 * @public
 * @template R
 * @param {Update<R>} update - The configuration for the new update
 * @return { import("./command").Command<null> } The first update value
 */
export function create ({ id, rate, payload }) {
  const text = `updates add ${id} ${rate} ${formatExpression(payload.text)}`
  return new Command('[updates] create', text)
}

/**
 * Create a new command to remove one update from the updates list
 * @public
 * @param {number} id - The id of an update
 * @return { import("./command").Command<null> }
 */
export function destroy (id) {
  return new Command('[updates] destroy', 'updates del ' + id)
}
