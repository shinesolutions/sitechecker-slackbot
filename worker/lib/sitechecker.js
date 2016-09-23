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
  req.request(config.method, url, opts, process(url, cb));
}

function process(url, cb) {
  return function (err, result) {
    if (err) {
      // bypass error so it doesn't block the results from other regions
      console.error('Unable to check URL due to error %s', err.message);
      cb(null, { "status": "error", "message": err.message });
    } else {
      console.log('Successfully checked URL %s', url);
      delete result.body; // remove body to reduce payload size
      cb(null, result);
    }
  };
}

exports.check = check;
