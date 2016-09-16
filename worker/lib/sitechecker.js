'use strict';

module.exports.check = (event, context, cb) => cb(null,
  { message: 'SiteChecker ping', event }
);
