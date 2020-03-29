'use strict'
/** @module */

import { Command } from './command.js'

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
 * @return { import("./command").Command<string> }
 */
export const create = function create (id, rate, payload) {
  const text = `updates add ${id} ${rate} $${payload.text}`
  return new Command('[updates] create', text)
}

/**
 * Create a new command to clear the full updates list
 * @return { import("./command").Command<string> }
 */
export const clear = function clear () {
  return new Command('[updates] clear', 'updates clear')
}

/**
 * Create a new command to remove one update from the updates list
 * @param {number} id - The id of an update
 * @return { import("./command").Command<string> }
 */
export const destroy = function destroy (id) {
  return new Command('[updates] destroy', 'updates del ' + id)
}
