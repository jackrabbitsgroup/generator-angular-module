# generator-angular-module [![Build Status](https://secure.travis-ci.org/jackrabbitsgroup/generator-angular-module.png?branch=master)](https://travis-ci.org/jackrabbitsgroup/generator-angular-module)

AngularJS module builder (aimed at making Bower components with Github Pages for the demo(s)). Based off of <a href='http://briantford.com/blog/angular-bower.html'>Brian Ford's excellent post on AngularJS modules with Bower</a>.

A generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-angular-module from npm, run:

```
$ npm install -g generator-angular-module
```

Finally, naviagate to a (new) directory where you want to create your AngularJS module and initiate the generator:

```
$ yo angular-module
```

### Next Steps
After you've followed the Yeoman prompts and your project has been scaffolded out for you, you'll have TWO Git branches, `master` (where the final bower component code will live) and `gh-pages` (where the development and demo takes place). You'll start in the `gh-pages` branch - use the files created for you to actually build your module and a demo (which you'll use to manually test as you're building).

1. install
	1. run `npm install && bower install` - this installs grunt and any dependencies such as AngularJS
2. write code! (actually build your module and confirm it's working with the demo)
	1. check the `app.js` `staticPath` variable - this assumes an `angular-directives` folder off the root of your server but just set that path to be relative to your server root for the demo to work locally.
	2. NOTE: since Github Pages does NOT have a backend accessible, you'll need a server running to serve `index.html` for you (i.e. for a WAMP server with root in the `www` folder, if your code is in `www/angular-directives/angular-module-test`, type `http://localhost/angular-directives/angular-module-test` in a browser and your demo page should come up).
	3. `TODO` text is placed in files for places for you to write code / change things
	4. put your demo code in `pages/home` (`home.html` and `HomeCtrl.js`) - you can also create additional pages/routes as well (i.e. one page per demo - ideally demo different configurations and examples/options)
	5. run `grunt` to build your `main.css` file and any other build files
3. create github repo
	1. go to github.com and create a new repository (that matches the name you typed in the Yeoman prompt earlier)
4. commit & push `gh-pages` branch
	1. open `app.js` and uncomment the second `staticPath` line that has a `gh-pages` comment in it so it will work on gh-pages
	2. `git commit` your changes to the `gh-pages` branch and push it to your new Github repository, to the `gh-pages` branch (i.e. `git push origin gh-pages`)
		1. NOTE: it may be better to push the `gh-pages` branch AFTER pushing master since whichever is pushed first to Github will be the default branch (though you can change this with the settings for the repo on Github) - you want the `master` branch to be the default on Github.
5. make, commit, tag, & push `master` branch
	1. copy over / get your core module files (i.e. for a directive, your `angular-module-test.js` and `angular-module-test.less` files as well as the `angular-module-test.min.js` file that Grunt generates for you) from `gh-pages` with the command `git checkout gh-pages angular-module-test.js angular-module-test.min.js angular-module-test.less` (replace `angular-module-test` with your module name).
	2. update the `README.md` file and any other files for the core bower module (`bower.json` and `CHANGELOG.md` should already be ready for v1.0.0 but may need to update these)
	3. Git commit and then TAG your master branch (i.e. `git tag v1.0.0`) then push to Github with `git push origin master --tags` - make sure to push your tags since that's how Bower does versions!
6. (optional) Register your new bower component! I.e. `bower register angular-module-test [github repo location]`
	1. Note: don't pollute the bower repository - sharing is great and encouraged BUT make sure you're confident in the quality of your module and are ready to (actively) maintain it before publicly registering it; people can STILL use your component WITHOUT being publicly registered by downloading it straight from Github so register with care and only as needed!

You're done! You now have a bower component for an AngularJS module (directive or service) with one or more demos on Github!

More info: Again, see <a href='http://briantford.com/blog/angular-bower.html'>Brian Ford's excellent post on AngularJS modules with Bower</a>, where this was inspired from.



### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
