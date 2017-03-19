const instanbul = require('istanbul')
const mocha = require('mocha')

/**
 * Expose `Istanbul`.
 */
exports = module.exports = Istanbul

/**
 * Initialize a new Istanbul reporter.
 *
 * @param {Runner} runner
 * @public
 */
function Istanbul (runner) {
  const collector = new instanbul.Collector()
  const reporter = new instanbul.Reporter()
  reporter.addAll(['lcov', 'json'])
  mocha.reporters.spec.call(this, runner)

  runner.on('end', function () {
    collector.add(global.__coverage__)

    reporter.write(collector, true, function () {
      console.log('Coverage report generated.')
    })
  })
}

mocha.utils.inherits(Istanbul, mocha.reporters.spec)
