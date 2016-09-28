<img align="right" src="https://raw.github.com/shinesolutions/sitechecker-slackbot/master/icon.png" alt="Icon"/>

[![Build Status](https://img.shields.io/travis/shinesolutions/sitechecker-slackbot.svg)](http://travis-ci.org/shinesolutions/sitechecker-slackbot)

SiteChecker Slackbot
--------------------

SiteChecker is a [serverless](http://martinfowler.com/articles/serverless.html) [Slack bot](https://www.wired.com/2015/08/slack-overrun-bots-friendly-wonderful-bots/) for checking whether a website can be reached from multiple locations on the planet.

For example, Twitter has been [censored multiple times in various countries](https://en.wikipedia.org/wiki/Censorship_of_Twitter). So even though a website is available from your country, it might not be from another country. You can ask SiteChecker bot **"sitechecker: Is twitter.com up?"**

[![Sample Interaction Screenshot](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)

The locations where the checking is performed from are based on the available [AWS Lambda regions](http://docs.aws.amazon.com/general/latest/gr/rande.html#lambda_region). SiteChecker currently only supports 8 regions, but the list will grow and it's easy to add a new region to SiteChecker infrastructure.

Architecture
------------

SiteChecker has two components, a bot that's configured on Slack, and a piece of infrastructure on [AWS](https://aws.amazon.com/).

The bot is a Slack [outgoing webhook](https://api.slack.com/outgoing-webhooks) custom integration.

The infrastructure on AWS is implemented with master worker pattern. The master Lambda function receives POST requests from the Slack bot via an API Gateway, it parses the message using a simple natural language processing [speakeasy-nlp](https://www.npmjs.com/package/speakeasy-nlp) package in order to understand the message from Slack user and to identify the website to be checked. The master Lambda function then distributes the tasks for checking that website to worker Lambda functions across multiple AWS regions.

Even though SiteChecker's current feature is limited to checking website availability, the architecture is suitable for any other cross-region checks. E.g. tracerouting from multiple cities, measuring response time from multiple cities.

[![Architecture Diagram](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)

Installation
------------

There are two parts to install, the bot on Slack, and the infrastructure on AWS.

Let's install the bot first by creating a Slack outgoing webhook custom integration.

1. Go to your Slack account's custom integrations page at `https://account.slack.com/apps/manage/custom-integrations` .
2. The page will show the available custom integrations. Click on **Outgoing WebHooks** link.
3. Click **Add Configuration** button.
4. Click **Add Outgoing WebHooks integration** button.
5. Fill in the integration settings:
    - **Channel**: select the channel where you want the bot to be available from.
    - **Trigger Word(s)**: specify words to trigger the bot, e.g. **sitechecker:**
    - **URL(s)**: leave this empty for now, we'll go back to this option after the infrastructure is built.
    - **Token**: Slack will generate the token for you, this token will be configured in master Lambda function.
    - **Descriptive Label**: description for this custom integration, e.g. **SiteChecker Outgoing WebHook**
    - **Customize Name**: the name of your bot, e.g. **SiteChecker**
    - **Customize Icon**: upload SiteChecker [radar icon](https://raw.githubusercontent.com/shinesolutions/sitechecker-slackbot/master/icon.png)
6. Click **Save Settings** button.

Next, the second part is to create the infrastructure on AWS.

1. [Install node.js](https://nodejs.org/en/download/package-manager/) .
2. Set up [AWS credential](https://serverless.com/framework/docs/providers/aws/setup/), to be used by [Serverless framework](https://serverless.com/).
3. Clone the repository: `git clone https://github.com/shinesolutions/sitechecker-slackbot` .
4. Configure the Slack token from the outgoing webhook custom integration settings in `master/conf/config.json` . Add the token to `allowedTokens` array property.
5. Install tools and dependencies: `make tools deps` .
6. Build the worker Lambda functions: `make deploy-workers` .
7. Build the master Lambda function and API Gateway: `make deploy-master` . The output of this command will show a POST endpoint, e.g. `https://id.execute-api.us-east-1.amazonaws.com/prod/handle`
8. Return to the Slack Outgoing WebHook custom integration settings page, and copy paste the POST endpoint from the command output to **URL(s)** setting, then click **Save Settings** button.

Usage
-----

1. Join the Slack channel configured in the bot setting.
2. Start asking SiteChecker bot **"sitechecker: Is twitter.com up?"**, **"sitechecker: Is facebook.com down?"** .

Configuration
-------------

SiteChecker Slack bot master and worker Lambda functions can be configured in [master/conf/config.json](https://github.com/shinesolutions/sitechecker-slackbot/blob/master/master/conf/config.json) and [worker/conf/config.json](https://github.com/shinesolutions/sitechecker-slackbot/blob/master/worker/conf/config.json) files respectively.

Master configuration:

| Name          | Description |
|---------------|-------------|
| allowedTokens | An array of allowed Slack tokens. If any is specified, then only incoming requests with that token are accepted. If left empty, then all incoming requests are accepted. |
| regions       | An array of objects with region name and description. |

Worker configuration:

| Name    | Description |
|---------|-------------|
| method  | HTTP method to be used for checking website availability. |
| timeout | timeout in milliseconds for the HTTP request sent for checking the website. |

Development
-----------

Install [Serverless](https://serverless.com/) framework and other tools:

    make tools

Download library dependencies:

    make deps

Build the infrastructure with default prod stage:

    make deploy

Remove the infrastructure with default prod stage:

    make remove

Specify custom stage:

    STAGE=dev make deps deploy remove

Colophon
--------

SiteChecker radar icon made by [Trinh Ho](http://www.flaticon.com/authors/trinh-ho) from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).

[Demo video](https://www.youtube.com/watch?v=aKYoTsYbVAc) background music [My Love (Rework) by James Mac & VALL](https://soundcloud.com/jamesmacdj/my-love-rework-james-mac-vall).

This project is a submission to [AWS Serverless Chatbot Hackathon 2016](https://awschatbot.devpost.com/).
