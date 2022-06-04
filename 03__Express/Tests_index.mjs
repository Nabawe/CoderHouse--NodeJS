/*
    import HTTP from 'http';
    const PORT = 8080;

    // req = Request Body
    // res = Response Object
    const Server = HTTP.createServer( ( req, res ) => {
        res.end( console.log( res ) );
    } );

    const currentListener = Server.listen( PORT, () => {
        console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
    } );

    Server.activeListeners = [ currentListener ];
*/

/* El objeto obtenido luego del import es una función... q devuelve una App Servidor Basica Configurable - Slides */
    // Parece ser una funcion llena de otras funciones, createApplication?
    // console.log( Express );
import Express from 'express';
import DayJS from 'dayjs';

const PORT = 8080;
const Server = Express();

let viewsCounter = 0;
const front = {
    top: `<body style='background-color: #AAA'>`,
    bot: `</body>`
};

// Para la peticion req en la ruta / responder res.send
Server.get( '/', ( req, res ) => {
    const content = `
        ${front.top}
            <h1 style='color: hsla(212, 78%, 50%, 1)'>
                Welcome to this NodeJS Express Server
            </h1>
        ${front.bot}
    `;
    res.send( content );
} );

Server.get( '/views', ( req, res ) => {
    const content = `
        ${front.top}
            <h1 style='color: hsla(212, 78%, 50%, 1)'>
                Current Views Count is : ${ ++viewsCounter }
            </h1>
        ${front.bot}
    `;
    res.send( content );
} );

Server.get( '/fyh', ( req, res ) => {
    res.send( { fyh: DayJS().format('DD/MM/YYYY HH:mm:ss') } );
} );

Server.get( '*', ( req, res ) => {
    const content = `
        ${front.top}
            <h1 style='color: hsla(0, 78%, 50%, 1)'>
                404 Page not Found.
            </h1>
        ${front.bot}
    `;
    res.send( content );
} );

// Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().
// PORT será de uso exclusivo de nuestro servidor, y no podrá ser compartido con otras aplicaciones.
// If PORT === 0 then express picks a random free port.
// ! Tengo mis dudas si esta linea es mejor ponerla ANTES de los Server.get.
const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

Server.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
