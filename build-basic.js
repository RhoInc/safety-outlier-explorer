var fs = require('fs');
var rollup = require('rollup');
var config = require('./rollup.config');

rollup.rollup({
	entry: './src/index.js'
})
.then( function ( bundle ) {
	var result = bundle.generate(config);
	console.log('bundled!')
	fs.writeFileSync( 'outlier-explorer.js', result.code );
})
.catch( function (error) {
	console.log(error);
});