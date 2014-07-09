#!/usr/bin/env node

var settings,
	path = require( "path" ),
	fs = require( "fs" ),
	program = require( "commander" ),
	semver = require( "semver" );

program
	.version( require( "../package.json" ).version )
	.option( "-P, --publish", "Enable publishing to NPM" )
	.option( "-C, --commit", "Enable commiting changes" )
	.option( "-c, --clipboard", "Copy the new version on NPM" )
	.option( "-n, --new [value]", "Set a custom new version" )
	.option( "-M, --major", "Set a major bump. Eg. 1.0.2 -> 2.0.0" )
	.option( "-m, --minor", "Set a minor bump. Eg. 1.0.2 -> 1.1.0" )
	.parse( process.argv );

settings = {
	publish: program.publish || false,
	commit: program.commit || false,
	clipboard: program.clipboard || false,
	bump: "patch"
};

// Overriding
if ( program.minor ) { settings.bump = "minor"; }
if ( program.major ) { settings.bump = "major"; }
if ( program.new ) {
	if ( semver.valid( program.new ) ) {
		settings.bump = program.new;
	} else {
		console.error(
			"Custom version (" + program.new + ") should be a valid semver.\n" +
			"Example: 1.2.3 or 0.0.1\n" +
			"More information on: http://semver.org/"
		);
	}
}

require( "./bump.js" )( settings );
