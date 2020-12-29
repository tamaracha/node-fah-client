'use strict'
module.exports = {
  '*.{json,yml,yaml}': 'prettier --write',
  '(integration|lib)/**/*.?(c|m)js': 'standard --fix',
  'lib/**/!(*.spec).js': _ => 'tsc --noEmit -p config/tsconfig.node12.json',
  'lib/**/*.spec.js': _ => 'tsc --noEmit -p config/tsconfig.node12.json'
}
