# <%= moduleDescription %>

[TODO - brief summary]

## Demo
http://<%= githubName %>.github.io/<%= moduleName %>/

## Dependencies
- required:
	[TODO]
- optional
	[TODO]

See `bower.json` and `index.html` in the `gh-pages` branch for a full list / more details

## Install
1. download the files
	1. Bower
		1. add `"<%= moduleName %>": "latest"` to your `bower.json` file then run `bower install` OR run `bower install <%= moduleName %>`
2. include the files in your app
	1. `<%= moduleNamePart%>.js`
	2. `<%= moduleNamePart%>.less`
3. include the module in angular (i.e. in `app.js`) - `<%= githubName %>.<%= moduleName %>`

See the `gh-pages` branch, files `bower.json` and `index.html` for a full example.


## Documentation
See the `<%= moduleNamePart%>.js` file top comments for usage examples and documentation
https://github.com/<%= githubName %>/<%= moduleName %>/blob/master/<%= moduleNamePart %>.js