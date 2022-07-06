import Express from 'express';
import { fileURLToPath } from 'node:url';
import { engine as HbsEngine } from 'express-handlebars';

// ! Cargar cada pagina en RAM parese una animalada
import DatosPersonales from './data/DatosPersonales.json' assert { type: "json" };
import Products from './data/products.json' assert { type: "json" };


const PORT = 8080;
const Server = Express();

// Server.use configures this Express Server by adding middlewares.
Server.engine( 'handlebars', HbsEngine() );
Server.set( 'view engine', 'handlebars' );
Server.set( 'views', fileURLToPath( new URL( './views', import.meta.url ) ) );

console.log( `##################################### ${ new Date }` );

// Routes
Server.get( '/datospersonales', ( req, res ) => {
    res.render( 'DatosPersonales', DatosPersonales);
} );

// * Leyendo la doc vi q tenia q pasarselo como objeto con una key
Server.get( '/products', ( req, res ) => {
    res.render( 'Products', { 'Product': Products } );
} );

// Last Touches and Opening the Server's Port
const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners ?
    Server.activeListeners.push( currentListener )
    : Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
