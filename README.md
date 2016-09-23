<img align="right" src="https://raw.github.com/shinesolutions/sitechecker-slackbot/master/icon.png" alt="Icon"/>

[![Build Status](https://img.shields.io/travis/shinesolutions/sitechecker-slackbot.svg)](http://travis-ci.org/shinesolutions/sitechecker-slackbot)

SiteChecker Slackbot
--------------------

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

Credits
-------

SiteChecker Slackbot radar icon made by [Trinh Ho](http://www.flaticon.com/authors/trinh-ho) from [www.flaticon.com](http://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)
