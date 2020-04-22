'use strict'

/**
 * @package
 * @param {string} message - A list of updates as rectangular space separated values
 * @return { import("../updates").UpdateDescription[] }
*/
export function parseUpdates (message) {
  return message.trim().split('\n')
    .map(line => {
      const [id, rate, ...expression] = line.split(' ')
      return { id: parseInt(id), rate: parseInt(rate), expression: expression.join(' ') }
    })
}
