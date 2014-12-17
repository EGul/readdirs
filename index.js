
var fs = require("fs");

function walk(arr, fn) {

  var results = [];

  (function next(item) {

    if (!item) return fn(results);

    results.push(item.split('/').slice(1).join('/'));

    fs.stat(item, function(err, stats) {

      if (!stats.isDirectory()) return next(arr.shift());

      readdirs(item + '/', function(content) {
        content.forEach(function(c) { results.push(c) });
        next(arr.shift());
      });

    });

  })(arr.shift());

}

function readdirs(path, fn) {

  fs.readdir(path, function(err, files) {

    files = files.map(function(file) { return path + file });

    walk(files, function(content) {
      fn(content);
    });

  });

}

module.exports = {readdirs: readdirs};
