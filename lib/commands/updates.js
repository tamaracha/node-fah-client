'use strict'
/** @module */

import { Command } from './command.js'
import { formatExpression } from '../helpers/format-expression.js'

/**
 * Create a new command to clear the full updates list
 * @return { import("./command").Command<string> }
 */
export const clear = function clear () {
  return new Command('[updates] clear', 'updates clear')
}

/**
 * Create a new command to reset all updates
 * @return { import("./command").Command<string> }
 */
export const reset = function reset () {
  return new Command('[updates] reset', 'updates reset')
}

/**
 * Create a new command to list all updates
 * @return { import("./command").Command<string> }
 */
export const list = function list () {
  return new Command('[updates] list', 'updates list')
}

/**
 * Create a new command to add a new update
 * @template R
 * @param {number} id - An id number for the new update
 * @param {number} rate - Indicates the distance in seconds between updates
 * @param { import("./command").Command<R> } payload - The command to be evaluated
 * @return { import("./command").Command<R> } The first update value
 */
export const create = function create (id, rate, payload) {
  const text = `updates add ${id} ${rate} ${formatExpression(payload.text)}`
  const cmd = new Command('[updates] create', text, payload.responseType)
  cmd.parse = message => Command.prototype.parse.call(cmd, message.substr(message.indexOf('PyON')))
  return cmd
}

/**
 * Create a new command to remove one update from the updates list
 * @param {number} id - The id of an update
 * @return { import("./command").Command<string> }
 */
export const destroy = function destroy (id) {
  return new Command('[updates] destroy', 'updates del ' + id)
}
