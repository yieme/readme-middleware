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
var cwdPath    = path.normalize(process.cwd() + '/index.mustache')
var localPath  = path.normalize(__dirname     + '/index.mustache')
var indexPath  = (fs.existsSync(cwdPath)) ? cwdPath : localPath
var readmePath = path.normalize(process.cwd() + '/README.md')
var index      = fs.readFileSync(indexPath, 'utf8')
var pkg        = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
var template   = hogan.compile(index)
pkg.readme     = fs.readFileSync(readmePath, 'utf8')
var page       = template.render(pkg)
var cacheDur   = (process.env.NODE_ENV == 'production') ? 60 * 60 * 1000 : 15 * 1000 // 1 hour in production, 15 seconds dev

function readmeMiddleware(req, res, next) {
  if (req.path == '/') {
    res.set('Content-Type', 'text/html')
    res.set('Cache-Control', 'public, max-age=' + cacheDur)
    res.status(200).send(page)
  } else {
    next()
  }
}



module.exports        = readmeMiddleware
