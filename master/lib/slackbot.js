'use strict';
const isSiteUp = require('is-site-up');

isSiteUp('www.vivekpoddar.com').then(isUp => {
  console.log(isUp); // true
});
module.exports.handle = (event, context, cb) => cb(null,
  { message: 'SlackBot ping', event }
);
