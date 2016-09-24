<img align="right" src="https://raw.github.com/shinesolutions/sitechecker-slackbot/master/icon.png" alt="Icon"/>

[![Build Status](https://img.shields.io/travis/shinesolutions/sitechecker-slackbot.svg)](http://travis-ci.org/shinesolutions/sitechecker-slackbot)

SiteChecker Slackbot
--------------------

SiteChecker is a [Slack bot](https://www.wired.com/2015/08/slack-overrun-bots-friendly-wonderful-bots/) for checking whether a website is accessible from multiple locations on the planet.

For example, Twitter has been [censored multiple times in various countries](https://en.wikipedia.org/wiki/Censorship_of_Twitter). So even though a website is accessible from your country, it might not be from another country. And you can ask SiteChecker bot "Is twitter.com up?" 

[![Sample Interaction Screenshot](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/sample_interaction.jpg)

Architecture
------------

[![Architecture Diagram](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)](https://raw.github.com/shinesolutions/sitechecker-slackbot/master/docs/architecture.jpg)

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
