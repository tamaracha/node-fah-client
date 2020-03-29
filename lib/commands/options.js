'use strict'
/** @module */

import { Command, DataTypes } from './command.js'
import { formatOptions } from '../helpers/index.js'

/**
 * @typedef {object} Options
 * @property {string} [user]
 * @property {string} [team]
 */

/**
 * Create a new command to list Fah options filtered by given verbosity level.
 * @param {string} [level=explicit] - The verbosity level, determines which options are shown. This can be explicit (options set by user), implicit (explicit + options with default values), unset (implicit + unset options), or all. Any other value will default to explicit.
 * @param {number} [slot] - The number of the slot to be configured
 * @return { import("./command").Command<Options> }
 */
export const listByFilter = function listByFilter (level = 'explicit', slot) {
  let text = textWithSlot(slot)
  switch (level) {
    case 'explicit':
      break
    case 'implicit':
      text += ' -d'
      break
    case 'unset':
      text += ' -a'
      break
    case 'all':
      text += ' *'
      break
  }
  return new Command('[options] list by filter', text, DataTypes.options)
}

/**
 * Create a new command to list Fah options by names
 * @param {Array<string>} names - The names of the Fah options to be shown
 * @param {number} [slot] - A slot number.
 * @return { import("./command").Command<Options> }
 */
export const listByNames = function listByNames (names, slot) {
  const text = textWithSlot(slot)
  return new Command(
    '[options] list by names',
    `${text} ${names.join(' ')}`,
    DataTypes.options
  )
}

/**
 * Create a new command to update the global or a slot configuration
 * @param {object} options - A dictionary of options to be set. A null value means that the respective option will be unset.
 * @param {number} [slot] - A slot number.
 * @return { import("./command").Command<Options> }
 */
export const update = function update (options, slot) {
  const text = textWithSlot(slot)
  return new Command(
    '[options] update',
    `${text} ${formatOptions(options)}`,
    DataTypes.options
  )
}

/**
 * @private
 * @param {number} [slot] - A slot number
 * @return {string}
 */
function textWithSlot (slot) {
  return typeof slot === 'number' ? 'slot-options ' + slot : 'options'
}
