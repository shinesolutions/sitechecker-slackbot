const async = require('async');
const aws = require('aws-sdk');
const config = require('../conf/config.json');
const nlp = require('speakeasy-nlp');
const slack = require('./slack');
const util = require('util');

function interact(data, cb) {

  if (config.allowedTokens.length > 0 && config.allowedTokens.indexOf(data.token) === -1) {

    console.error('Unrecognised Slack app token %s', data.token);
    var message = 'Your Slack app token is not recognised by SiteChecker Slackbot server.';
    cb(null, slack.error(message));

  } else {

    var trigger = util.format('%s ', data.trigger_word);
    var text = data.text.replace(trigger, '');
    var url = parse(text);
    if (url) {
      distribute(url, report(url, cb));
    } else {

      console.error('Unable to parse URL from text %s', text);
      var message = 'I\'m sorry, I don\'t understand your message.';
      cb(null, slack.error(message));

    }
  }
}

// Parse message text and identify URL.
function parse(message) {

  console.log('Parsing message "%s"', message);

  var classification = nlp.classify(message);
  var subject = classification.subject.split(' ');

  var url;
  if (subject[0].match(/https?\:\/\//)) {
    url = slack.parseUrl(subject[0]);
  }
  return url;
}

// Check site across multiple regions in parallel by distributing the task
// to a Lambda function on each region.
function distribute(url, cb) {

  var tasks = {};

  config.regions.forEach(function (region) {
    function task(cb) {

      console.log('Distributing task to region %s', region.name);

      var lambda = new aws.Lambda({ region: region.name });

      var params = {
        FunctionName: 'sitechecker-slackbot-worker-prod-check', // TODO: pass stage
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ url: url })
      };

      lambda.invoke(params, function (err, result) {
        if (err) {
          var message = util.format('Unable to check URL %s in region %s due to error %s', url, region.name, err.message);
          cb(null, { status: 'error', message: message });
        } else {
          cb(null, JSON.parse(result.Payload));
        }
      });

    }
    tasks[region.desc] = task;
  });

  async.parallel(tasks, cb);
}

// Summarise results from all Lambda functions into a report.
function report(url, cb) {
  return function(err, results) {

    if (err) {

      console.error('Unable to generate report due to error %s', err.message);
      cb(slack.error(err.message));

    } else {

      console.log('Generating report for URL %s', url);
      var messages = [];
      Object.keys(results).forEach(function (key) {

        var result = results[key];

        var status;
        if (result.status && result.status === 'error') {
          status = 'inaccessible';
        } else {
          status = (result.statusCode.toString().match(/^[2,4].?.?/)) ? 'accessible' : 'inaccessible';
        }
        message = util.format('%s is %s from %s', url, status, key);
        messages.push(message);
      });
      cb(null, slack.success(messages.join('\n')));
    }
  };
}

exports.interact = interact;
