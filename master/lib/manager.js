'use strict';

function distribute(url, cb) {
  var result = {
    text: 'PLACEHOLDER ' + url
  };
  cb(null, result);
}

exports.distribute = distribute
