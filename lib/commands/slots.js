'use strict'
/** @module */

import { Command } from './command.js'

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
 * @return { import("./command").Command<import("../index").Slot[]> }
 */
export const list = function list () {
  return new Command('[slots] list', 'slot-info', 'slots')
}

/**
 * Create a new command to create a new fah slot.
 * @param {string} type - The slot type of the new slot to be created.
 * @return { import("./command").Command<string> }
 */
export const create = function create (type) {
  return new Command('[slots] create', 'slot-add ' + type)
}

/**
 * Create a new command to update a fah slot's type.
 * @param {number} slot - A slot number
 * @param {string} type - The new type to be assigned to the slot.
 * @return { import("./command").Command<import("../index").SlotModify> }
 */
export const update = function update (slot, type) {
  return new Command(
    '[slots] update',
    `slot-modify ${slot} ${type}`,
    'slot-modify'
  )
}

/**
 * Create a new command to delete a fah slot
 * @param {number} slot - A slot number
 * @return { import("./command").Command<string> }
 */
export const destroy = function destroy (slot) {
  return new Command('[slots] destroy', 'slot-delete ' + slot)
}
