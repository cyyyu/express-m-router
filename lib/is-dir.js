'use strict'

let fs = require('fs');

module.exports = function(path) {
	return fs.lstatSync(path).isDirectory()
}