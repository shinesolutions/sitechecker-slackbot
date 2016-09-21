'use strict';

const sitechecker = require('./sitechecker');

module.exports.handle = (event, context, cb) => sitechecker.check(event.url, cb);
