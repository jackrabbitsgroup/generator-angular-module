/**
@fileOverview

@toc

*/

'use strict';

angular.module('<%= githubName %>.<%= moduleName %>', [])
.factory('<%= modulePrefix%><%= _.capitalize(_.camelize(moduleNamePart)) %>', [ function () {
	//private methods and properties - should ONLY expose methods and properties publicly (via the 'return' object) that are supposed to be used; everything else (helper methods that aren't supposed to be called externally) should be private.
	
	//public methods & properties
	return {
	};
}]);