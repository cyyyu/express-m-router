'use strict'

let fs = require('fs');
let router = require('express').Router();
let path = require('path');
let isDir = require('./lib/is-dir');
let concat = require('lodash').concat;

exports = module.exports = function(app, rootPath) {

  function read(p, dirname) {
    let tmp = [];

    fs.readdirSync(p).forEach((file) => {
      if (isDir(path.join(p, file))) {
        let a = read(path.join(p, file), file);

        tmp = concat(tmp, a)
      } else {
        tmp.push(dirname ? `${dirname}/${file}` : file)
      }
    })

    return tmp;
  }

  read(rootPath).forEach((file) => {

    let fileName = '/' + file.replace(/\..+$|index/gi, '').replace('!', ':')

    let t = require(path.join('..', rootPath, file));

    t.get && router.get(fileName, t.get);
    t.post && router.post(fileName, t.post);
  })

  app.use('/', router);
}