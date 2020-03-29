'use strict'
/**
 * @module
 * @private
 */

/**
 * Serialize a map of Fah configuration options
 * @param {object} options - A dictionary of options to be serialized
 * @return {string}
 * @throws {TypeError} Options must be a map-like object containing key-value pairs
 * @throws {Error} Options contains no entries
 * @throws {TypeError} Empty keys are not allowed
 * @throws {TypeError} Option value must be a primitive or null
 */
export function formatOptions (options) {
  if (
    typeof options !== 'object' ||
    options === null ||
    Array.isArray(options)
  ) {
    throw new TypeError('options must be a dictionary')
  }
  const args = []
  for (const [key, value] of Object.entries(options)) {
    if (key === '') {
      throw new TypeError('option keys must not be empty')
    }
    if (value === null || value === '') {
      args.push(key + '!')
      continue
    }
    switch (typeof value) {
      case 'object':
        throw new TypeError('value must be of a primitive type')
      case 'boolean':
      case 'number':
      case 'string':
        args.push(`${key}=${value}`)
    }
  }
  if (args.length === 0) {
    throw new Error('options contains no entries')
  }
  return args.join(' ')
}
