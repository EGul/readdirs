
var fs = require("fs");

function readdirs(path, fn) {

  var paths = [];
  var results = [];

  function series(file) {

    if (file) {

      fs.stat(file, function(err, stats) {

        if (stats.isDirectory()) {
          readdirs(file, function(files) {
            results.push(files);
          });
        }
        else {
          results.push(file);
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

readdirs("./", function(files) {



});
