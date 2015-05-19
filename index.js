/** Readme middleware
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     readme-middleware
 */
'use strict';
var fs         = require('fs')
var hogan      = require("hogan.js")
var path       = require('path')
var pkgPath    = path.normalize(process.cwd() + '/package.json')
var indexPath  = path.normalize(__dirname     + '/index.mustache')
var readmePath = path.normalize(process.cwd() + '/README.md')
var index      = fs.readFileSync(indexPath, 'utf8')
var pkg        = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
var template   = hogan.compile(index)
pkg.readme     = fs.readFileSync(readmePath, 'utf8')
var page       = template.render(pkg)

function readmeMiddleware(req, res, next) {
  if (req.path == '/') {
    res.set('Content-Type', 'text/html')
    res.status(200).send(page)
  } else {
    next()
  }
}



module.exports        = readmeMiddleware
