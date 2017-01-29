'use strict'

const fs = require('fs'),
  router = require('express').Router(),
  path = require('path'),
  isDir = require('./lib/is-dir'),
  {
    concat,
    includes
  } = require('lodash');

function moveToLast(tmparray, f) {
  return concat(
    tmparray.filter(item => !includes(item, f)),
    tmparray.filter(item => includes(item, f))
  )
}

exports = module.exports = function mRouter(app, options) {
  let rootPath, ignoreFiles;

  if (typeof options === 'string') {
    rootPath = options;
  } else if (typeof options === 'object') {
    rootPath = options.path;
    ignoreFiles = options.ignores;
  }

  if (!rootPath) {
    throw new Error('Please specify routes folder.')
  }

  moveToLast(read(rootPath), '!').forEach((file) => {

    let fileName = file.replace(/\..+$|index/gi, '').replace('!', ':')

    let t = require(path.join(rootPath, file));

    t.get && router.get(fileName, t.get);
    t.post && router.post(fileName, t.post);
  })

  app.use('/', router);

  function read(p, dirname) {
    let tmp = [];

    fs.readdirSync(p).forEach((file) => {
      if (isDir(path.join(p, file))) {

        let a = read(path.join(p, file), file);

        tmp = concat(tmp, a);
      } else {
        if (!ignoreFiles || !ignoreFiles.test(file)) {
          tmp.push(dirname ? path.join(p, file).replace(rootPath, '').replace(/\\/gi, '/') : `/${file}`);
        }
      }
    })

    return tmp;
  }


}
