'use strict'
import { command, DataTypes } from './helpers.js'

/**
 * @module
 */

/**
 * An enum containing the possible slot type names
 * @readonly
 * @enum {string}
 */
export const slotTypes = {
  /** A cpu slot */
  cpu: 'cpu',
  /** A gpu slot */
  gpu: 'gpu',
  /** An smp slot */
  smp: 'smp'
}

/**
 * Create a new command to get a list of all fah slots
 * @return { import("./helpers").Command }
 */
export const list = function list () {
  return command('[slots] list', 'slot-info', DataTypes.slots)
}

/**
 * Create a new command to create a new fah slot.
 * @param {string} type - The slot type of the new slot to be created.
 * @return { import("./helpers").Command }
 */
export const create = function create (type) {
  return command('[slots] create', 'slot-add ' + type)
}

/**
 * Create a new command to update a fah slot's type.
 * @param {number} slot - A slot number
 * @param {string} type - The new type to be assigned to the slot.
 * @return { import("./helpers").Command }
 */
export const update = function update (slot, type) {
  return command(
    '[slots] update',
    `slot-modify ${slot} ${type}`,
    DataTypes.slotModify
  )
}

/**
 * Create a new command to delete a fah slot
 * @param {number} slot - A slot number
 * @return { import("./helpers").Command }
 */
export const destroy = function destroy (slot) {
  return command('[slots] destroy', 'slot-delete ' + slot)
}
