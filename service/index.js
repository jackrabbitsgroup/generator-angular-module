/**
@todo
- remove the need to check this.moduleType in EVERY function (i.e. find a way to NOT call this generator AT ALL if moduleType is wrong - hookFor doesn't seem to be able to be conditionally called based on prompts though..?)
*/

'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var exec = require('child_process').exec;

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);

	// console.log('You called the service subgenerator with the argument ' + this.name + '.');
	
	//copy over prompt options to 'this' scope for templating
	var xx;
	for(xx in this.options.props) {
		this[xx] =this.options.props[xx];
	}
};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.askFor = function askFor() {
if(this.moduleType =='service') {
	var cb = this.async();
	
	var prompts = [
		// {
			// name: 'servicePrompt',
			// message: 'Test service prompt',
			// default: 'test-service'		//TESTING
		// }
	];
	
	this.prompt(prompts, function (props) {
		// this.servicePrompt =props.servicePrompt;
		
		cb();
	}.bind(this));
}
};

ServiceGenerator.prototype.filesMaster = function filesMaster() {
if(this.moduleType =='service') {
	this.copy('master/_bower.json', 'bower.json');
	this.copy('master/_README.md', 'README.md');

	this.copy('master/.gitignore', '.gitignore');
	this.copy('master/CHANGELOG.md', 'CHANGELOG.md');
	
	// this.copy('master/editorconfig', '.editorconfig');
	// this.copy('master/jshintrc', '.jshintrc');
}
};

ServiceGenerator.prototype.commandsMaster = function commandsMaster() {
if(this.moduleType =='service') {
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
}
};

ServiceGenerator.prototype.filesGHPages = function filesGHPages() {
if(this.moduleType =='service') {
	this.mkdir('pages');
	this.mkdir('pages/home');

	this.copy('gh-pages/.gitignore', '.gitignore');
	
	this.template('gh-pages/_bower.json', 'bower.json');
	this.template('gh-pages/_app.js', 'app.js');
	this.template('gh-pages/_Gruntfile.js', 'Gruntfile.js');
	this.template('gh-pages/_index.html', 'index.html');
	this.template('gh-pages/_package.json', 'package.json');
	
	this.template('gh-pages/_service.js', this.moduleNamePart+'.js');
	
	this.template('gh-pages/pages/home/HomeCtrl.js', 'pages/home/HomeCtrl.js');
	
	this.copy('gh-pages/pages/home/home.html', 'pages/home/home.html');
}
};

ServiceGenerator.prototype.commandsGHPages = function commandsGHPages() {
if(this.moduleType =='service') {
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
}
};