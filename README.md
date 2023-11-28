# Connect 4 

A connect4 implementation using ES6/7 

# Installation 

## Pre requisites 

* Have `compass` installed
* Have `npm` or `yarn` installed

## Setup

* Run `npm install` or `yarn`

## Useful Info

* This connect 4 game uses JavaScript ( ECMAScript 2015/ ECMAScript 6 spec), jQuery, HTML and CSS for development
* [Jade](http://jade-lang.com/) is used to create an easy to modify grid for different lengths. phpStorm's file watcher was used to run jade to generate HTML everytime there is a change in HTML file. Make life really easy.
  * Update: We no longer need Jade, as we are using ES6/7, we can use template strings to generate HTML. A new HTML file is available now. 
* All generated files are zipped so there is no package installation needed.
* Gruntfile has been used for sass compilation via compass framework. A direct sass compilation can also be done via grunt. I have used phpStorm as IDE which allows for easy file change monitoring i.e "File watchers".
* IE Sass files were removed as cross browser compatibility is not a requirement.
* The program has been tested with latest versions of Chrome, Firefox, Safari and Opera browsers. 
* Babel for ECMAScript 6 to ECMAScript 5 transpiling.
* I have left some console print statements intentionally for future testing and teaching it as example for algo-training.

## How to create a new grid
* A different size grid can be created by updating the respective *$numRows* and *$numCols* variables in [sass/_variables.scss](sass/_variables.scss) along with the [index.jade ](index.jade ) file. 

## How to run unit tests

Browse [test/index.html](test/index.html) to run all unit tests. 

###### Note

> ECMAScript 6 has excellent support in all latest browsers including Chrome, Firefox and Opera but surprisingly doesn't work without being transpiled in ECMAScript 5. That is the only reason I have used transpiled versions in the html and Jasmine tests. The original source code is in respective files though.

# Try it

* Install npm packages via `npm install`
* Setup file watchers for compass, jade and optionally babel if you want Javascript transpiling into ECMAScript 6. 
* Update respective files and they should be able to compile/ transpile the required files. You could improve it just by placing all of these into a grunt task and using one watch task for each of them and one publish task for a complete package. If you do, please create a PR :)

# Possible Improvements

* Improve algorithm for winning the game. This one was the only complicated part in the implementation. 
* Improve UI to be more intuitive, for example each column can have hover effect to give user a better  idea of which column they are dropping to. 
* Disk drop animation with jQuery for UI
* Introduce a second computer player with Minimax or Alpha–beta pruning
* Add a better controller for UI and Core object interaction
* Develop grunt task for 
* Develop a grunt setup can be used for creating a distributable version of project, thus eliminating need for any IDE level file watchers for just packaging purpose. This means compass / sass, jade, bower componets copied, JS minification and uglifying, along with babel transpiling.
* Add a grunt task for everything. Including a browser sync + live reload.
* Highlight the winning move in UI, for better UX.
* Do a complete build in a 'dist' folder for package release.

# Contribute

If you make any changes, please open a PR :) 
