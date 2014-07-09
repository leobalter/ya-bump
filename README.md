# ya-bump

Yet Another module to Bump, Commit and Publish

## Install

### Globally

`npm install -g ya-bump`

## CLI Usage

`ya-bump [options]`

### CLI Options:

| option | description |
|-----------:|:-----------|
| `-h, --help`         | output usage information |
| `-V, --version`      | output the version number |
| `-P, --publish`      | Enable publishing to NPM |
| `-C, --commit`       | Enable commiting changes |
| `-c, --clipboard`    | No writing - Copy the new version on NPM |
| `-n, --new [value]`  | Set a custom new version |
| `-M, --major`        | Set a major bump. Eg. 1.0.2 -> 2.0.0 |
| `-m, --minor`        | Set a minor bump. Eg. 1.0.2 -> 1.1.0 |

### As a Module

`npm install --save ya-bump`

## Module Usage

```js
var bump = require( "ya-bump" );

// default values listed below
bump({

	// Commits the modified bumped file
	commit: false,

	// Publishes in NPM
	publish: false,

	// Copy to clipboard, this option discards any writing change
	clipboard: false,

	// Version, it can be a valid semver or "patch", "minor" or "major"
	bump: "patch"
});
```

## TODO:

Set commit long description with last changes from git log
