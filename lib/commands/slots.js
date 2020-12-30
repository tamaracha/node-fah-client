'use strict'
import { Command } from './command.js'

/**
 * @module
 * @public
*/

/**
 * A slot configuration
 * @public
 * @typedef {object} Slot
 * @property {string} id
 * @property {string} status
 * @property {string} description
 * @property {import("./options").Options} options
 * @property {string} reason
 * @property {boolean} idle
 */

/**
 * A slot object describing a modified slot
 * @public
 * @typedef {object} SlotModify
*/

/**
 * An enum containing the possible slot type names
 * @readonly
 * @enum {string}
 */
export const SlotType = {
  /** A cpu slot */
  cpu: 'cpu',
  /** A gpu slot */
  gpu: 'gpu',
  /** An smp slot */
  smp: 'smp'
}

/**
 * Create a new command to get a list of all fah slots
 * @public
 * @return { import("./command").Command<Slot[]> }
 */
export function list () {
  return new Command('[slots] list', 'slot-info', 'slots')
}

/**
 * Create a new command to create a new fah slot.
 * @public
 * @param {SlotType} type - The slot type of the new slot to be created.
 * @return { import("./command").Command<null> }
 */
export function create (type) {
  return new Command('[slots] create', 'slot-add ' + type)
}

/**
 * Create a new command to update a fah slot's type.
 * @public
 * @param {number} slot - A slot number
 * @param {SlotType} type - The new type to be assigned to the slot.
 * @return { import("./command").Command<SlotModify> }
 */
export function update (slot, type) {
  return new Command(
    '[slots] update',
    `slot-modify ${slot} ${type}`,
    'slot-modify'
  )
}

/**
 * Create a new command to delete a fah slot
 * @public
 * @param {number} slot - A slot number
 * @return { import("./command").Command<null> }
 */
export function destroy (slot) {
  return new Command('[slots] destroy', 'slot-delete ' + slot)
}
