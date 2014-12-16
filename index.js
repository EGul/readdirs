
var fs = require("fs");

function readdirs(path, fn) {

  var paths = [];
  var results = [];

  function series(item) {

    if (item) {

      fs.stat(item, function(err, stats) {

        if (stats.isDirectory()) {
          readdirs(item + "/", function(files) {
            results.push(item.split('/').slice(1).join('/'));
            files.forEach(function(file) { results.push(file) });
            series(paths.shift());
          });
        }
        else {
          results.push(item.split('/').slice(1).join('/'));
          series(paths.shift());
        }

      });

    }
    else {
      fn(results);
    }

  }

  fs.readdir(path, function(err, files) {
    paths = files.map(function(file) { return path + file });
    series(paths.shift());
  });

}

module.exports = {readdirs: readdirs};
