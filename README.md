<img align="right" src="https://raw.github.com/shinesolutions/sitechecker-slackbot/master/icon.png" alt="Icon"/>

[![Build Status](https://img.shields.io/travis/shinesolutions/sitechecker-slackbot.svg)](http://travis-ci.org/shinesolutions/sitechecker-slackbot)

SiteChecker Slackbot
--------------------

SiteChecker is a [serverless](http://martinfowler.com/articles/serverless.html) [Slack bot](https://www.wired.com/2015/08/slack-overrun-bots-friendly-wonderful-bots/) for checking whether a website is accessible from multiple locations on the planet.

For example, Twitter has been [censored multiple times in various countries](https://en.wikipedia.org/wiki/Censorship_of_Twitter). So even though a website is accessible from your country, it might not be from another country. You can ask SiteChecker bot **"Is twitter.com up?"**

[![Sample Interaction Screenshot](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)

The locations where the checking is performed from are based on the available [AWS Lambda regions](http://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region). It currently only supports 8 locations, but the list will grow and it's easy to add to SiteChecker infrastructure.

Architecture
------------

SiteChecker has two components, a bot that's configured on Slack, and a piece of infrastructure on [AWS](https://aws.amazon.com/).

The bot is a Slack [outgoing webhook](https://api.slack.com/outgoing-webhooks) custom integration.

The infrastructure on AWS is implemented with master worker pattern. The master Lambda function receives POST requests from the Slack bot via an API Gateway, it parses the message using a simple natural language processing [speakeasy-nlp](https://www.npmjs.com/package/speakeasy-nlp) package in order to understand the message from Slack user. The master Lambda function then distributes the tasks for checking the website accessibility to worker Lambda functions across multiple AWS regions.

Even though SiteChecker's current feature is limited to checking website accessibility, the architecture is suitable for any other cross-region checks. E.g. tracerouting from multiple cities, measuring response time from multiple cities.

[![Architecture Diagram](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)

Installation
------------

TODO

Configuration
-------------

Both master and worker can be configured in [master/conf/config.json](https://github.com/shinesolutions/sitechecker-slackbot/blob/master/master/conf/config.json) and [worker/conf/config.json](https://github.com/shinesolutions/sitechecker-slackbot/blob/master/worker/conf/config.json) files respectively.

Master configuration:

| Name          | Description |
|---------------|-------------|
| allowedTokens | An array of allowed Slack tokens. If any is specified, then only incoming requests with that token are accepted. If left empty, then all incoming requests are accepted. |
| regions       | An array of objects with region name and description. |

Worker configuration:

| Name    | Description |
|---------|-------------|
| method  | HTTP method to be used for checking website accessibility. |
| timeout | timeout in milliseconds for the HTTP request sent for checking the website. |

Usage
-----

Install [Serverless](https://serverless.com/):

    make tools

Download service dependencies:

    make deps

Build the infrastructure with default prod stage:

    make deploy

Remove the infrastructure with default prod stage:

    make remove

Specify custom stage:

    STAGE=dev make deps deploy remove

Colophon
--------

This project is a submission to [AWS Serverless Chatbot Competition 2016](https://awschatbot.devpost.com/).

SiteChecker Slackbot radar icon made by [Trinh Ho](http://www.flaticon.com/authors/trinh-ho) from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
