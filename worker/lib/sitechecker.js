'use strict';

const req = require('bagofrequest');

function check(url, cb) {

  console.log('Checking URL %s', url);

  var opts = {
    timeout: 30000,
    handlers: {
      '2xx': function (result, cb) {
        cb(null, result);
      }
    }
  };
  req.request('get', url, opts, cb);
}

exports.check = check
