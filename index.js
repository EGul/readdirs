
var fs = require("fs");

function readdirs(path, fn) {

  var paths = [];
  var results = [];

  function series(item) {

    if (item) {

      fs.stat(path + item, function(err, stats) {

        if (stats.isDirectory()) {
          readdirs(path + item + "/", function(files) {
            results.push(files);
            series(paths.shift());
          });
        }
        else {
          results.push(item);
          series(paths.shift());
        }

      });

    }
    else {
      fn(results);
    }

  }

  fs.readdir(path, function(err, files) {

    paths = files;
    series(paths.shift());

  });

}
