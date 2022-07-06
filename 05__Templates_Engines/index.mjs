import Express from 'express';
import { fileURLToPath } from 'node:url';
import { engine as HbsEngine } from 'express-handlebars';

import Route_Products from './routes/products.route.js';


const PORT = 8080;
const Server = Express();

// JSON output
Server.use( Express.json() );
Server.use( Express.urlencoded( { extended: true } ) );
// Static Files
Server.use( Express.static( fileURLToPath( new URL( './public', import.meta.url ) ) ) );
// express-handlebars
Server.engine( 'handlebars', HbsEngine() );
Server.set( 'view engine', 'handlebars' );
Server.set( 'views', fileURLToPath( new URL( './views', import.meta.url ) ) );

console.log( `##################################### ${ new Date }` );

// Routes
Server.use( '/', Route_Products );

Server.get( '*', ( req, res ) => {
    res.status( 404 ).sendFile( fileURLToPath( new URL( './public/404.html', import.meta.url ) ) );
} );

// Last Touches and Opening the Server's Port
const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners ?
    Server.activeListeners.push( currentListener )
    : Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
