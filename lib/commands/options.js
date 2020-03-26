'use strict'
/** @module */

import { command, DataTypes } from './helpers.js'

/**
 * Create a new command to list Fah options filtered by given verbosity level.
 * @param {string} [level=explicit] - The verbosity level, determines which options are shown. This can be explicit (options set by user), implicit (explicit + options with default values), unset (implicit + unset options), or all. Any other value will default to explicit.
 * @param {number} [slot] - The number of the slot to be configured
 * @return { import("./helpers").Command }
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
  return command('[options] list by filter', text, DataTypes.options)
}

/**
 * Create a new command to list Fah options by names
 * @param {Array<string>} names - The names of the Fah options to be shown
 * @param {number} [slot] - A slot number.
 * @return { import("./helpers").Command }
 */
export const listByNames = function listByNames (names, slot) {
  const text = textWithSlot(slot)
  return command(
    '[options] list by names',
    `${text} ${names.join(' ')}`,
    DataTypes.options
  )
}

/**
 * Create a new command to update the global or a slot configuration
 * @param {object} options - A dictionary of options to be set. A null value means that the respective option will be unset.
 * @param {number} [slot] - A slot number.
 * @return { import("./helpers").Command }
 */
export const update = function update (options, slot) {
  const text = textWithSlot(slot)
  return command(
    '[options] update',
    `${text} ${formatOptions(options)}`,
    DataTypes.options
  )
}

/**
 * @private
 * @param {object} options - A dictionary of options to be serialized
 * @return {string}
 */
export const formatOptions = function formatOptions (options) {
  if (options === null) return ''
  if (typeof options !== 'object') return ''
  if (Array.isArray(options)) return ''
  const args = []
  for (const [key, value] of Object.entries(options)) {
    if (typeof key !== 'string' || key === '') continue
    if (value === null || value === '') {
      args.push(key + '!')
      continue
    }
    switch (typeof value) {
      case 'boolean':
      case 'number':
      case 'string':
        args.push(`${key}=${value}`)
    }
  }
  return args.join(' ')
}

/**
 * @private
 * @param {number} [slot] - A slot number
 * @return {string}
 */
function textWithSlot (slot) {
  return typeof slot === 'number' ? 'slot-options ' + slot : 'options'
}
