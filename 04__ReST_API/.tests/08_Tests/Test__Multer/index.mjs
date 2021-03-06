import Express from 'express';
import { fileURLToPath } from 'node:url';
import Route_Single from './routes/single.js';
import Route_Multy from './routes/multy.js';

const PORT = 8080;
const Server = Express();

// Server.use set ups this Express Server cfg by adding middlewares.
Server.use( Express.json() );
Server.use( Express.urlencoded( { extended: true } ) );
Server.use( Express.static( fileURLToPath( new URL( './public', import.meta.url ) ) ) );

const Front = {
    top: `<body style='background-color: #AAA;'>`,
    bot: `</body>`
};

console.log( `============================== ${ new Date }` );

// Settingup Imported Routes
Server.use( '/', Route_Single );
Server.use( '/', Route_Multy );

Server.get( '*', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(0, 78%, 50%, 1);'>
                404 Page not Found.
            </h1>
        ${Front.bot}
    `;
    res.status( 404 ).send( content );
} );


const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners ?
    Server.activeListeners.push( currentListener )
    : Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
