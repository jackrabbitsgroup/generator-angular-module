/**
@fileOverview

@toc

*/

'use strict';

angular.module('<%= githubName %>.<%= moduleName %>', [])
.factory('<%= modulePrefix%><%= _.capitalize(_.camelize(moduleNamePart)) %>', [ function () {
	//methods and properties (some of which may be private - explicitly state which methods and properties to expose/return at bottom)
	var privateObj ={
	};
	
	//select which methods/functions (and potentially properties) to expose
	return {
	};
}]);