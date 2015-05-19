/** Readme middleware
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     readme-middleware
 */
'use strict';
var fs       = require('fs')
var hogan    = require("hogan.js")
var index    = fs.readFileSync(__dirname     + '/index.mustache', 'utf8')
var pkg      = fs.readFileSync(process.cwd() + '/package.json', 'utf8')
var template = hogan.compile(index)
pkg.readme   = fs.readFileSync(process.cwd() + '/README.md', 'utf8')
var page     = template.render(pkg)

function readmeMiddleware(req, res, next) {
  if (req.path == '/') {
    res.set('Content-Type', 'text/html')
    res.status(200).send(page)
  } else {
    next()
  }
}



function server(options) {
  return require('middle-server')(options)
}



module.exports        = readmeMiddleware
module.exports.server = server
