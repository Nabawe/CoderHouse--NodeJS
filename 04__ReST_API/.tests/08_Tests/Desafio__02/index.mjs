import Express from 'express';
// import Path from 'node:path'; // Part of Oldway
import { fileURLToPath } from 'node:url';
import Route_Peeps from './routes/peeps.js';
import Route_Pets from './routes/pets.js';

const PORT = 8080;
const Server = Express();

// Server.use set ups this Express Server cfg by adding middlewares.
Server.use( Express.json() );
Server.use( Express.urlencoded( { extended: true } ) );
// Server.use( Express.static( Path.join( __dirname, 'public' ) ) ); // * Deprecated Oldway
// Server.use( Express.static( 'public' ) );
Server.use( Express.static( fileURLToPath( new URL( './public', import.meta.url ) ) ) );

const Front = {
    top: `<body style='background-color: #AAA;'>`,
    bot: `</body>`
};

// import.meta.url = file:///D:/Nabawe/B/Mc/MEGA/Formal/Coder%20House/Backend%20-%20NodeJS/Entregas/04__ReST_API/index.mjs
    // O sea file URL del modulo de NodeJS corriendo.
/* fileURLToPath( new URL( './public', import.meta.url ) ) = D:\Nabawe\B\Mc\MEGA\Formal\Coder House\Backend - NodeJS\Entregas\04__ReST_API\public */
/* new URL( './public', import.meta.url ) = "file:///D:/Nabawe/B/Mc/MEGA/Formal/Coder%20House/Backend%20-%20NodeJS/Entregas/04__ReST_API/public" */
// ! Creo q este endpoint no hace cosa alguna ya q Server.use( Express.static... parece setearlo
Server.get( '/', ( req, res ) => {
    // res.send( fileURLToPath( new URL( './public', import.meta.url ) ) ); // Used to make tests
    // res.send( import.meta.url ); // Used to make tests, Disable Express.static before
    // res.sendFile( Path.join( __dirname, 'public/index.html' ) ); // * Deprecated Oldway
    res.sendFile( fileURLToPath( new URL( './public/index.html', import.meta.url ) ) );
} );

// Settingup Imported Routes
Server.use( '/', Route_Peeps );
Server.use( '/', Route_Pets );

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
