import Express from 'express';
import { fileURLToPath } from 'node:url';
// Routes
import Route_Products from './routes/products.js';

const PORT = 8080;
const Server = Express();

// Server.use configures this Express Server by adding middlewares.
Server.use( Express.json() );
Server.use( Express.urlencoded( { extended: true } ) );
Server.use( Express.static( fileURLToPath( new URL( './public', import.meta.url ) ) ) );

console.log( `============================== ${ new Date }` );

// Setting up Imported Routes
Server.use( '/api', Route_Products );

Server.get( '*', ( req, res ) => {
    res.status( 404 ).sendFile( fileURLToPath( new URL( './public/404.html', import.meta.url ) ) );
} );


const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners ?
    Server.activeListeners.push( currentListener )
    : Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
