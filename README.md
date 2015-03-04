# 




## Basic Software

Assemble - [http://assemble.io/](http://assemble.io/)

Bower - [http://bower.io/](http://bower.io/)

NodeJS - [http://nodejs.org/](http://nodejs.org/)

Git - [http://git-scm.com/](http://git-scm.com/)

GruntJS - [http://gruntjs.com/](http://gruntjs.com/)

Sass - [http://sass-lang.com/](http://sass-lang.com/)


### Development Software

Bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/)

BrowserDetection.js - [https://github.com/Milanowicz/BrowserDetection.js](https://github.com/Milanowicz/BrowserDetection.js)

Modernizr - [http://modernizr.com/](http://modernizr.com/)

SassCollection - [https://github.com/Milanowicz/CSSSassCollection](https://github.com/Milanowicz/CSSSassCollection)


## Directory Structure

Your Documentation about what ever

    Documentation

All JavaScripts libraries or scripts from you or somewhere else

    JavaScript

Your Sass StyleSheets are here

    Sass

This directory is for the visitors

    


## Bower


### Bower Install

Be first time used ever then

    $ npm install -g Bower


### Bower Usage

Install all Grunt modules and let's roll

    $ bower install

Update all

    $ bower update


## GruntJS


### GruntJS Install

Be first time used ever then

    $ npm install -g grunt-cli

Install all Grunt modules and let's roll

    $ npm install


Create this file to use "$ grunt serve"

    local.json

        {
          "localhost" : "localhost",
          "port": "9000"
        }


### GruntJS Usage

Grunt Watch if files are changes and generate them new

    $ grunt serve

Let Grunt generates all files

    $ grunt build

Do run all Tasks for a Release

    $ grunt





### GruntJS updating

Check Grunt Modules

    $ grunt devUpdate:show

Update GruntJS modules

    $ grunt devUpdate:install

