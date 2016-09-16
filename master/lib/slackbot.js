'use strict';

module.exports.handle = (event, context, cb) => cb(null,
  { message: 'SlackBot ping ' + context.url, event }
);
