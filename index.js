
var fs = require("fs");

function walk(arr, fn) {

  var results = [];

  (function next(item) {

    if (!item) return fn(null, results);

    results.push(item.split('/').slice(1).join('/'));

    fs.stat(item, function(err, stats) {

      if (err) return fn(err);

      if (!stats.isDirectory()) return next(arr.shift());

      readdirs(item + '/', function(err, content) {
        if (err) return fn(err);
        content.forEach(function(c) { results.push(c) });
        next(arr.shift());
      });

    });

  })(arr.shift());

}

function readdirs(path, fn) {

  fs.readdir(path, function(err, files) {

    if (err) return fn(err);

    files = files.map(function(file) { return path + file });

    walk(files, function(err, content) {
      fn(err, content);
    });

  });

}

module.exports = {readdirs: readdirs};
