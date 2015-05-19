/** Readme middleware
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     readme-middleware
 */
'use strict';

function readmeMiddleware(req, res, next) {
  console.log(req.url)
  next()
}


function server(options) {
  options     = options || { }
  var express = require('express')
  var app     = express()
  var port    = options.port || 3000
  var pkg     = require('./package.json')

  app.use(readmeMiddleware)
  app.get('/', function(req, res){
    res.send('OK');
  })

  app.listen(port)
  console.log(pkg.name + '@' + pkg.version, 'listening on', port)
}

module.exports = readmeMiddleware
module.exports.server = server
