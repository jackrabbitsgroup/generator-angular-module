'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var async = require('async');
var Q =require('q');

var exec = require('child_process').exec;

var _self;

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
			type: 'list',
			name: 'moduleType',
			message: 'What type?',
			choices: [
				'directive',
				'service'
			],
			default: 'directive'
		},
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
		this.moduleType = props.moduleType;
		
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
	var self =this;
	_self =this;
	
	var cb = this.async();
	
	if(this.moduleType =='directive') {
		/*
		self._directiveFiles()
		.then(self._directiveCommandsMaster())
		.then(self._directiveFilesGHPages())
		.then(self._directiveCommandsGHPages())
		.then(function(ret) {
			self.log.writeln('SUCCESS!');
		}, function(err) {
			self.log.writeln('ERROR: '+err);
		});
		*/
		async.series([
			self._directiveFiles,
			self._directiveCommandsMaster,
			self._directiveFilesGHPages,
			self._directiveCommandsGHPages
		],
		function(err, results) {
			if(err) {
				self.log.writeln('ERROR: '+err);
				cb();
			}
			else {
				self.log.writeln('SUCCESS!');
				cb();
			}
		});
	}
	else if(this.moduleType =='service') {
		self.log.writeln('service not supported yet..');
		cb();
	}
};


//private methods
//directive
AngularModuleGenerator.prototype._directiveFiles =function files(callback) {
	var self =_self;
	
	// var deferred =Q.defer();
	
	self.log.writeln('directiveFiles start');
	
	// this.copy('_package.json', 'package.json');
	self.template('_bower.json', 'bower.json');
	self.template('_README.md', 'README.md');

	self.copy('.gitignore', '.gitignore');
	self.copy('CHANGELOG.md', 'CHANGELOG.md');
	
	self.template('gh-pages/_base.less', '_base.less');		//TESTING
	
	// this.copy('editorconfig', '.editorconfig');
	// this.copy('jshintrc', '.jshintrc');
	
	self.log.writeln('directiveFiles end');
	// deferred.resolve({});
	// return deferred.promise;
	callback(false);
};

AngularModuleGenerator.prototype._directiveCommandsMaster =function commandsMaster(callback) {
	var self =this;
	var self =_self;
	
	// var cb = this.async();
	// var deferred =Q.defer();
	self.log.writeln('directiveCommandsMaster start');
	
	//init git stuff (master and gh-pages branches)
	var commands =[
		//init master branch
		"git init .",
		"git add -A",
		"git commit -am 'init'",
		"git remote add origin git@github.com:"+self.githubName+"/"+self.moduleName+".git",
		// "git push origin master",		//this requires credentials so skip it
		
		//checkout / switch to gh-pages branch - have to do this BEFORE create the new files in it
		"git checkout --orphan gh-pages",
		"git rm -rf ."
	];
	var command =commands.join(' && ');
	exec(command, {}, function(err, stdout, stderr) {
		self.log.writeln("command run and done: "+command);
		self.log.writeln('stdout: '+stdout+' stderr: '+stderr);
		// cb();
		self.log.writeln('directiveCommandsMaster end');
		// deferred.resolve({});
		callback(false);
	});
	
	// return deferred.promise;
};

AngularModuleGenerator.prototype._directiveFilesGHPages = function filesGHPages(callback) {
	var self =_self;
	
	// var deferred =Q.defer();
	
	self.log.writeln('directiveFilesGHPages start');
	
	self.mkdir('pages');
	self.mkdir('pages/home');

	// self.copy('gh-pages/.gitignore', '.gitignore');
	
	self.template('gh-pages/_base.less', '_base.less');
	self.template('gh-pages/_bower.json', 'bower.json');
	self.template('gh-pages/_app.js', 'app.js');
	self.template('gh-pages/_Gruntfile.js', 'Gruntfile.js');
	self.template('gh-pages/_index.html', 'index.html');
	self.template('gh-pages/_package.json', 'package.json');
	
	self.template('gh-pages/_directive.js', self.moduleNamePart+'.js');
	self.template('gh-pages/_directive.less', self.moduleNamePart+'.less');
	
	self.copy('gh-pages/pages/home/home.html', 'pages/home/home.html');
	self.copy('gh-pages/pages/home/HomeCtrl.js', 'pages/home/HomeCtrl.js');
	
	self.log.writeln('directiveFilesGHPages end');
	
	// deferred.resolve({});
	// return deferred.promise;
	callback(false);
};

AngularModuleGenerator.prototype._directiveCommandsGHPages =function commandsGHPages(callback) {
	var self =this;
	var self =_self;
	
	// var cb = this.async();
	// var deferred =Q.defer();
	
	self.log.writeln('directiveCommandsGHPages start');
	
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
		
		self.log.writeln('directiveCommandsGHPages end');
		
		// cb();
		// deferred.resolve({});
		callback(false);
	});
	
	// return deferred.promise;
};