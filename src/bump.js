var steps,
	semver = require( "semver" );

function exec( command, msg, errCondition ) {
	var cp = require( "child_process" );

	console.log( ">> " + command );

	return cp.exec( command, function( error, result ) {
			if ( error || ( typeof errCondition === "function" && errCondition( result ) ) ) {
				console.error( "failed on: " + msg );
			} else {
				console.log( msg );
				nextStep();
			}
		});
}

function nextStep() {
	var next = steps.shift();
	if ( typeof next === "function" ) {
		next();
	}
}

module.exports = function ( settings ) {
	var pkg, fs,
		version;

	fs = require( "fs" );

	steps = [
		function() {

			// Check if package.json is clean;
			exec( "git status --porcelain package.json", "package.json is clean.",
				function( result ) {
					return result.toString().length > 0;
				});
		},
		function() {

			// Then set package.json's version
			pkg = fs.readFileSync( "package.json" ).toString().split( /\n/ ).map(function( line ) {
				var data,
					dataIndex = 2;

				if ( /version/.test( line ) ) {
					data = line.replace( /"|,/g, "" ).split( ":" )[ 1 ].split( "." );

					// dataIndex defaults to 2 (the index for a patch release)
					if ( settings.bump === "minor" ) {
						dataIndex = 1;
					} else if ( settings.bump === "major" ) {
						dataIndex = 0;
					}

					data[ dataIndex ] = ( +data[ dataIndex ] ) + 1;

					version = semver.valid( settings.bump ) ? settings.bump : data.join( "." );

					return ' "version": "' + version + '",';
				}

				return line;
			});

			fs.writeFile( "package.json", pkg.join( "\n" ), function( err ) {
				if ( err ) {
					console.error( "Error writing on package.json \nStopping..." );
					return;
				}
				console.log( "package.json new version set to " + version + "." );
				nextStep();
			});
		},
		function() {
			if ( settings.clipboard ) {
				require( "clipboard" ).write( version );
			}

			nextStep();
		},
		function() {

			// Commit package.json with "vX.X.X"
			if ( settings.commit ) {
				exec( "git commit package.json -m 'v" + version + "'", "package.json commited." );
			} else {
				nextStep();
			}
		},
		function() {

			// And publish to NPM
			if ( settings.publish ) {
				exec( "npm publish", "published to npm." );
			} else {
				nextStep();
			}
		}
	];

	nextStep();

};