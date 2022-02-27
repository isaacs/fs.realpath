var t = require('tap')
var rp = require('../')
var fs = require('fs')

rp.monkeypatch()
t.equal(rp.realpath, fs.realpath)
t.equal(rp.realpathSync, fs.realpathSync)

rp.unmonkeypatch()
t.not(rp.realpath, fs.realpath)
t.not(rp.realpathSync, fs.realpathSync)
