'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
// var async = require('async');

var exec = require('child_process').exec;


var AngularModuleGenerator = module.exports = function AngularModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    // this.installDependencies({ skipInstall: options['skip-install'] });
  });

  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularModuleGenerator, yeoman.generators.Base);

AngularModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

	var prompts = [
		{
			name: 'moduleName',
			message: 'Module name (i.e. angular-forminput)',
			default: 'angular-module-test'		//TESTING
		},
		{
			name: 'githubName',
			message: 'Github User or Organization Name',
			default: 'jackrabbitsgroup'
		},
		{
			name: 'modulePrefix',
			message: 'Module prefix - typically an abbreviation of your Github User/Organization Name (i.e. jrg)',
			default: 'jrg'
		},
		{
			name: 'authorName',
			message: 'Author name and email (i.e. John Smith <johnsmith@email.com>)',
			default: 'Luke Madera <luke.madera@gmail.com>'
		},
		{
			name: 'moduleDescription',
			message: 'Module description (i.e. AngularJS form input builder directive)',
			default: 'ang form'		//TESTING
		},
		{
			name: 'moduleKeywords',
			message: 'Module (Bower) keywords, space separated (i.e. angular AngularJS form input angular-forminput directive)',
			default: 'angular AngularJS form'		//TESTING
		}
	];

	this.prompt(prompts, function (props) {
		this.moduleName = props.moduleName;
		
		//pull out the angular prefix to get just the module name
		var prefix ='angular-';
		this.moduleNamePart =props.moduleName.slice(props.moduleName.indexOf(prefix)+prefix.length, props.moduleName.length);
		// console.log(this.moduleNamePart);
		
		this.modulePrefix = props.modulePrefix;
		this.githubName = props.githubName;
		this.authorName = props.authorName;
		this.moduleDescription = props.moduleDescription;
		this.moduleKeywords = props.moduleKeywords.split(' ');

		cb();
	}.bind(this));
};

AngularModuleGenerator.prototype.app = function app() {
  // this.mkdir('app');
  // this.mkdir('app/templates');

  // this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_README.md', 'README.md');
  
  this.copy('.gitignore', '.gitignore');
  this.copy('CHANGELOG.md', 'CHANGELOG.md');
};

AngularModuleGenerator.prototype.projectfiles = function projectfiles() {
  // this.copy('editorconfig', '.editorconfig');
  // this.copy('jshintrc', '.jshintrc');
};

AngularModuleGenerator.prototype.commandsMaster =function commandsMaster() {
	var cb = this.async();
	var self =this;
	
	//init git stuff (master and gh-pages branches)
	var commands =[
		//init master branch
		"git init .",
		"git add -A",
		"git commit -am 'init'",
		"git remote add origin git@github.com:"+this.githubName+"/"+this.moduleName+".git",
		// "git push origin master",		//this requires credentials so skip it
		
		//checkout / switch to gh-pages branch - have to do this BEFORE create the new files in it
		"git checkout --orphan gh-pages",
		"git rm -rf ."
	];
	var command =commands.join(' && ');
	exec(command, {}, function(err, stdout, stderr) {
		self.log.writeln("command run and done: "+command);
		self.log.writeln('stdout: '+stdout+' stderr: '+stderr);
		cb();
	});
};

AngularModuleGenerator.prototype.appGHPages = function app() {
	this.mkdir('pages');
	this.mkdir('pages/home');

	this.copy('gh-pages/.gitignore', '.gitignore');
	
	this.template('gh-pages/_base.less', '_base.less');
	this.template('gh-pages/_bower.json', 'bower.json');
	this.template('gh-pages/_app.js', 'app.js');
	this.template('gh-pages/_Gruntfile.js', 'Gruntfile.js');
	this.template('gh-pages/_index.html', 'index.html');
	this.template('gh-pages/_package.json', 'package.json');
	
	this.template('gh-pages/_directive.js', this.moduleNamePart+'.js');
	this.template('gh-pages/_directive.less', this.moduleNamePart+'.less');
	
	this.copy('gh-pages/pages/home/home.html', 'pages/home/home.html');
	this.copy('gh-pages/pages/home/HomeCtrl.js', 'pages/home/HomeCtrl.js');
};

AngularModuleGenerator.prototype.commandsGHPages =function commandsGHPages() {
	var cb = this.async();
	var self =this;
	
	var commands =[
		//git
		"git add -A",
		// "git commit -am 'init gh-pages'"		//doesn't work - it thinks the 'gh-pages' is a 'pathspec'??
		"git commit -am 'init'"
		
		//npm and bower install (not really necessary but nice)		//UPDATE - takes a long time and sometimes errors
		// "npm install",
		// "bower install"
	];
	var command =commands.join(' && ');
	exec(command, {}, function(err, stdout, stderr) {
		self.log.writeln("command run and done: "+command);
		self.log.writeln('stdout: '+stdout+' stderr: '+stderr);
		cb();
	});
};