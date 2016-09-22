'use strict';

const config = require('../conf/config.json');
const req = require('bagofrequest');

function check(url, cb) {

  console.log('Checking URL %s', url);

  var opts = {
    timeout: config.timeout,
    handlers: {
      '2xx': function (result, cb) {
        cb(null, result);
      }
    }
  };
  req.request(config.method, url, opts, cb);
}

exports.check = check
