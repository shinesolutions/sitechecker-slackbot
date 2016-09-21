'use strict';

const manager = require('./manager');
const parser = require('./parser');

module.exports.handle = (event, context, cb) => manager.distribute(parser.parse(event), cb);
