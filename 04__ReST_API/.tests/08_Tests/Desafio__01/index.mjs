import Express from 'express';
import Route_Peeps from './routes/peeps.js';
import Route_Pets from './routes/pets.js';

const PORT = 8080;
const Server = Express();
// Server.use set ups this Express Server cfg by adding middlewares.
Server.use( Express.json() );
Server.use( Express.urlencoded( { extended: true } ) );

const PHRASE = 'Hola mundo cómo están';

const Front = {
    top: `<body style='background-color: #AAA;'>`,
    bot: `</body>`
};


Server.get( '/', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(212, 78%, 50%, 1);'>
                Welcome to this NodeJS Express Server
            </h1>
        ${Front.bot}
    `;
    res.send( content );
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
