const async = require('async');
const config = require('../conf/config.json');
const nlp = require('speakeasy-nlp');
const slack = require('./slack');
const util = require('util');

function interact(data, cb) {

  // // TODO: remove later, only for serverless-offline
  // data = data.query;

  if (config.allowedTokens.length > 0 && config.allowedTokens.indexOf(data.token) === -1) {
    var message = 'Your Slack app token is not recognised by SiteChecker server.';
    cb(null, slack.error(message));
  }

  var url = parse(data.text.replace(data.trigger_word, ''));
  distribute(url, report(url, cb));
}

// Parse message text and identify URL.
function parse(message) {

  var classification = nlp.classify(message);
  var subject = classification.subject.split(' ');
  var url = subject[0];
  // TODO: handle unknown message, improve URL identification

  if (!url.match(/^https?\:/)) {
    url = 'http://' + url;
  }

  return url;
}

// Check site across multiple regions by distributing the task
// to a Lambda function on each region.
function distribute(url, cb) {

  var tasks = {};

  config.regions.forEach(function (region) {
    function task(cb) {
      cb(null, { statusCode: 200 }); // TODO: execute task on a real lambda
    }
    tasks[region.desc] = task;
  });

  async.parallel(tasks, cb);
}

// Summarise results from all Lambda functions into a report.
function report(url, cb) {
  return function(err, results) {
    if (err) {
      cb(slack.error(err.message));
    } else {

      var messages = [];
      Object.keys(results).forEach(function (key) {

        var result = results[key];
        var status = (result.statusCode === 200) ? 'accessible' : 'inaccessible';
        messages.push(util.format('%s is %s from %s', url, status, key));
      });
      cb(null, slack.success(messages.join('\n')));
    }
  };
}

exports.interact = interact;
