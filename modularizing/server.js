var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    root     = __dirname,
    port     = process.env.PORT || 7000,
    app      = express();

require('./server/config/mongoose.js')
/* this bit of code reads all the files in the path for 'models_path' Use it if you want!*/
// fs.readdirSync( models_path ).forEach( function( file ) {
//   if( reg.test( file ) ) {
//     require( path.join( models_path, file ) );
//   }
// });

 // We are setting this Schema as a Model called 'User'

// ==========================controller===============

//===============routes=======================

var routes_setter = require('./server/config/routes.js');
routes_setter(app);


//===============routes=======================

//==========server==============
app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
