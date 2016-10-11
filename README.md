# EnglishCentral Angular2 / TypeScript Project

## Requirements
* [NodeJS v5.x+ and npm v3.x+](https://nodejs.org)

## Installation

on your terminal switch to the directory where you can cloned this repository then type
  ```bash
  $ cd site-main-typescript
  $ npm install
  ```
once npm finishes installing all the dependencies, run this command to do the post-install step and install the typings for this project

  ```bash
  $ npm run postinstall
  ```
  
  
## List of available shell commands

* `npm run build`

  Runs `lint:ts`, then runs `clean:ts`, then finally runs `build:bundle`
  This is the complete step for compiling and building your app, you would use this command most of the time
  
* `npm run clean:ts`

  Deletes all the typescript-generated files to ensure we have a clean slate before compiling
  
* `npm run compile:ts`

  Compiles the current project using the typescript compiler. 
  useful for checking compile-time typescript errors
  
* `npm run lint:ts`

  Runs the TypeScript linter check for any coding style issues. If you’ve read this guide and are using IntelliJ, you shouldn’t really need to run this
  Useful for IDEs without the TSHint plug-in
  
* `npm run build:bundle`

  Compiles the current project then creates app bundles using webpack
  You only need to run this for testing webpack bundling
  
* `npm test`

  Runs karma and all of the unit tests within the app directory


## Configuring TSLint in IntelliJ / WebStorm


1. Go to File > Settings
1. Expand: Languages & Frameworks > TypeScript > TSLint
1. Point Node Interpreter to where you have installed NodeJS and where node.exe is located
1. Point TSLint package to the node_modules/tslint folder of where your site-main-typescript directory is located
1. Point Configuration file to the tslint.json located on the site-main-typescript directory

Here’s an example configuration:

![alt text](http://i.imgur.com/NH0gbsC.jpg "example TSLint configuration")


## Project Coding Style Guide

* [Angular Style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
* [Microsoft TypeScript style guide](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)
* [Google javaScript style guide](https://google.github.io/styleguide/javascriptguide.xml)

All of these 3 style guides complement each other.

Angular2 style guide ⊂ MS TS style guide ⊂ Google JS style guide

Important things to note:

* `getId()` instead of `getID()`, `formatHtml()` instead of `formatHTML()` [_(Google)_](https://google.github.io/styleguide/javaguide.html#s5.3-camel-case)
* private methods and properties should NOT have any underscore `this.private` instead of `this._private` _(MS)_
* interfaced should not be prepended by `I`. For example, use `interface Word` instead of `interface IWord` _(MS / Angular2)_
* for indeterminate values, return `undefined` instead of `null` _(MS)_

## Translations

always wrap translatable text with the `i18n` directive which marks it as a translatable item for the translation parser.

examples:
```
<p>This doesn't get translated</p>
<div i18n>This text gets translated</div>
```

you can also add annotation to give context for our translators:
```
<span i18n="message shown for completing an activity">Complete!</span>
```