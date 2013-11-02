/**
LESSONS LEARNED (Yeoman/Yo seems very powerful BUT is horribly documented - I wasted hours just trying to figure out syntax, specifically how to conditionally do stuff based on the prompts..
- it seems sub-generators were meant to be very simple/without prompts AND it's not well documented how to pass in options / prompt values
- it seems async is finicky and can't be done with private functions - if you get outside the public function "Yo way", the timing is off and stuff breaks (i.e. I tried 1 public function that conditionally calls private functions (which has Q/async) based on a prompt value but those didn't work..)

The above 2 combined means there's NO (easy/at all?) way to conditionally run code/functions - it will ALWAYS run ALL public functions. And since you can't conditionally call sub-generators either, ALL sub-generators will be run too. Meaning the ONLY way I could conditionally do stuff is to do an "if" check in EACH FUNCTION and skip the function content if the prompt value didn't match.. LAME!
I feel like I'm trying to use Yeoman for things it's not supposed to be used for but this seems like pretty basic functionally - conditionally doing stuff.. it's like Yeoman has no "if's"..
*/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AngularModuleGenerator = module.exports = function AngularModuleGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);
	
	// console.log('this: '+JSON.stringify(this));
	//call directive sub-generator
	// if(this.options.props.moduleType =='directive') {		//apparently don't have access to options yet AND can only call hookFor from outer level here in constructor so there's no way to conditionally call a hookFor based on the prompts?! wtf?
	if(1) {
		this.hookFor('angular-module:directive', {
			args: ['name'],		//apparently this is required - get an error if don't have it - even though I don't use or need it..
			options: {
				options: this.options
			}
		});
	}

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
			message: 'Module name (i.e. angular-forminput)'
		},
		{
			name: 'githubName',
			message: 'Github User or Organization Name'
			// default: 'jackrabbitsgroup'
		},
		{
			name: 'modulePrefix',
			message: 'Module prefix - typically an abbreviation of your Github User/Organization Name (i.e. jrg)'
			// default: 'jrg'
		},
		{
			name: 'authorName',
			message: 'Author name and email (i.e. John Smith <johnsmith@email.com>)'
			// default: 'Luke Madera <luke.madera@gmail.com>'
		},
		{
			name: 'moduleDescription',
			message: 'Module description (i.e. AngularJS form input builder directive)'
			// default: 'ang form'		//TESTING
		},
		{
			name: 'moduleKeywords',
			message: 'Module (Bower) keywords, space separated (i.e. angular AngularJS form input angular-forminput directive)'
			// default: 'angular AngularJS form'		//TESTING
		}
	];

	this.prompt(prompts, function (props) {
		this.options.props ={};
		this.options.props.moduleType =this.moduleType = props.moduleType;
		
		this.options.props.moduleName =this.moduleName = props.moduleName;
		
		//pull out the angular prefix to get just the module name
		var prefix ='angular-';
		this.options.props.moduleNamePart =this.moduleNamePart =props.moduleName.slice(props.moduleName.indexOf(prefix)+prefix.length, props.moduleName.length);
		// console.log(this.moduleNamePart);
		
		this.options.props.modulePrefix =this.modulePrefix = props.modulePrefix;
		this.options.props.githubName =this.githubName = props.githubName;
		this.options.props.authorName =this.authorName = props.authorName;
		this.options.props.moduleDescription =this.moduleDescription = props.moduleDescription;
		this.options.props.moduleKeywords =this.moduleKeywords = props.moduleKeywords.split(' ');

		cb();
	}.bind(this));
};