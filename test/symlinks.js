var fs = require('fs')
var t = require('tap')
var path = require('path')

var rp = require('../')

var lengths = [ 1, 128, 256 ]

var root = __dirname + '/rptest'

function clean () {
  try { fs.unlinkSync(root + '/a/b') } catch (e) {}
  try { fs.rmdirSync(root + '/a') } catch (e) {}
  try { fs.rmdirSync(root) } catch (e) {}
}

t.test('setup', function (t) {
  clean()

  fs.mkdirSync(root)
  fs.mkdirSync(root + '/a')
  fs.symlinkSync('..', root + '/a/b')

  t.end()
})

var expect = path.resolve(__dirname + '/rptest/a')

lengths.forEach(function (len) {
  t.test('symlinks = ' + len, function (t) {
    var long = root + '/' + Array(len).join('a/b/') + 'a'

    t.plan(2)
    t.equal(rp.realpathSync(long), expect)
    rp.realpath(long, function (er, actual) {
      if (er) {
        throw er
      }
      t.equal(actual, expect)
    })
  })
})

t.test('cleanup', function (t) {
  clean()
  t.end()
})
