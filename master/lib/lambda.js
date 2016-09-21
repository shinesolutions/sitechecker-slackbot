'use strict';

const slackbot = require('./slackbot');

module.exports.handle = (event, context, cb) => slackbot.run(event.url, cb);
