import Express from 'express';
import JSONBox from './JSONBox.mjs';

const JSONBoxy = new JSONBox( 'productos.json', './ProductsArrays/' );
const PORT = 8080;

const Server = Express();

const Front = {
    top: `<body style='background-color: #333;'>`,
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

// Experimentando products y /products
    // solo funciono con /products
Server.get( '/products', async ( req, res ) => {
    const content = `
        ${Front.top}
            <pre style='color: hsla(212, 78%, 50%, 1); font-size: large;'>
                \n${JSON.stringify( ( await JSONBoxy.getAll() ), null, 4 )}
            </pre>
        ${Front.bot}
    `;
    res.send( content );
} );

// las mayusculas parecen NO hacer difernecia antes lo usaba RndProduct
// * Apropósito el archivo productos.json le falta el id 3, así se ve q pasa cuando el rnd da null
Server.get( '/rndproduct', async ( req, res ) => {
    const content = `
        ${Front.top}
            <pre style='color: hsla(212, 78%, 50%, 1); font-size: large;'>
                \n${JSON.stringify( ( await JSONBoxy.getRndItem() ), null, 4 )}
            </pre>
        ${Front.bot}
    `;
    res.send( content );
} );

Server.get( '*', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(0, 78%, 50%, 1);'>
                404 Page not Found.
            </h1>
        ${Front.bot}
    `;
    res.send( content );
} );


const currentListener = Server.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

MidServer.activeListeners ?
    MidServer.activeListeners.push( currentListener )
    : MidServer.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );
