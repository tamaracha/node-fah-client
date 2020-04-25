'use strict'
/** @module */

/**
 * A queue task
 * @template V
 * @typedef {object} Task
 * @property {function(): Promise<V>} p - A function which creates a promise
 * @property {function(V)} resolve - The resolve method of a promise
 * @property {function(Error)} reject - The reject method of a promise
*/

/**
 * A promise queue that processes added promise tasks sequentially
*/
class PromiseQueue {
  /**
   * Create a new promise queue
  */
  constructor () {
    /** @type {Array<Task<any>>} */
    this.items = []
    this.workingOnPromise = false
  }

  /**
 * Add a new task to the queue
 * @template V
   * @param {function(): Promise<V>} p - the task to be added, a function which returns a promise
   * @return {Promise<V>} A promise which resolves to the result value of the promise created by the added task
  */
  enqueue (p) {
    return new Promise((resolve, reject) => {
      this.items.push({ p, resolve, reject })
      this.dequeue()
    })
  }

  /**
   * Process the next task in the queue
   * @private
   * @return {boolean}
  */
  dequeue () {
    if (this.workingOnPromise) { return false }
    const item = this.items.shift()
    if (!item) { return false }
    try {
      this.workingOnPromise = true
      item.p()
        .then(value => {
          this.workingOnPromise = false
          item.resolve(value)
          this.dequeue()
        })
        .catch(e => {
          this.workingOnPromise = false
          item.reject(e)
          this.dequeue()
        })
    } catch (e) {
      this.workingOnPromise = false
      item.reject(e)
      this.dequeue()
    }
    return true
  }
}

export { PromiseQueue }
