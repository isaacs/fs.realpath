var t = require('tap')
var rp = require('../')
var fs = require('fs')

rp.monkeypatch()
t.equal(rp.realpath, fs.realpath)
t.equal(rp.realpathSync, fs.realpathSync)

rp.unmonkeypatch()
t.notEqual(rp.realpath, fs.realpath)
t.notEqual(rp.realpathSync, fs.realpathSync)
