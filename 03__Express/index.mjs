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

    Server.Listeners = [ currentListener ];
*/

import Express from 'express';
/* El objeto obtenido luego del import es una función... q devuelve una App Servidor Basica Configurable - Slides */
    // Parece ser una funcion llena de otras funciones, createApplication?
    // console.log( Express );

const App = Express();
