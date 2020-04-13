'use strict'

/**
 * @typedef {object} Counter
 * @property {function(): number} current
 * @property {function(): number} next
 * @property {function(): number} prev
 * @property {function(number): boolean} has
*/

/**
 * @param {number} [init=-1]
 * @return {Counter}
*/
export function counter (init = -1) {
  return {
    next: () => {
      init += 1
      return init
    },
    prev: () => {
      init -= 1
      return init
    },
    has: val => init >= val,
    current: () => init
  }
}
