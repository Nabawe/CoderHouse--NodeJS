import Express from 'express';
import { fileURLToPath } from 'node:url';

const PORT = 8080;
const Server = Express();

Server.use( Express.static( fileURLToPath( new URL( './public', import.meta.url ) ) ) );

console.log( `##################################### ${ new Date }` );

const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners ?
    Server.activeListeners.push( currentListener )
    : Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
