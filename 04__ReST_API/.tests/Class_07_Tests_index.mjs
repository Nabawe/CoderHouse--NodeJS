import Express from 'express';

const PORT = 8080;
const MidServer = Express();

const PHRASE = 'Hola mundo cómo están';

const Front = {
    top: `<body style='background-color: #AAA;'>`,
    bot: `</body>`
};


MidServer.get( '/', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(212, 78%, 50%, 1);'>
                Welcome to this NodeJS Express Server
            </h1>
        ${Front.bot}
    `;
    res.send( content );
} );

MidServer.get( '/api/phrase', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(212, 78%, 50%, 1);'>
                ${PHRASE}
            </h1>
        ${Front.bot}
    `;
    res.status( 200 ).send( content );
} );

MidServer.get( '/api/letter/:num', ( req, res ) => {
    if ( isNaN( req.params.num ) ) {
        const content = `
            ${Front.top}
                <h1 style='color: hsla(212, 78%, 50%, 1);'>
                    Error: Not a Number.
                </h1>
            ${Front.bot}
        `;
        return res.status( 400 ).send( content );
    };

    // const pos = parseInt( req.params.num ) - 1;
    // Change to Int thru + plus bit magic and adjust to string positioning
    const pos = ~~+req.params.num - 1;

    if ( pos < 0 || pos > PHRASE.length ) {
        const content = `
            ${Front.top}
                <h1 style='color: hsla(212, 78%, 50%, 1);'>
                    Error: Argument Out of Range.
                </h1>
            ${Front.bot}
        `;
        return res.status( 400 ).send( content );
    };

    const content = `
        ${Front.top}
            <h1 style='
                color: hsla(212, 78%, 50%, 1);
                text-align: center;
            '>
                ${ PHRASE[pos] }
            </h1>
        ${Front.bot}
    `;

    res.status( 200 ).send( content );
} );

MidServer.get( '/api/word/:num', ( req, res ) => {
    if ( isNaN( req.params.num ) ) {
        const content = `
            ${Front.top}
                <h1 style='color: hsla(212, 78%, 50%, 1);'>
                    Error: Not a Number.
                </h1>
            ${Front.bot}
        `;
        return res.status( 400 ).send( content );
    };

    const pos = ~~+req.params.num - 1;
    const words = PHRASE.split( ' ' );

    if ( pos < 0 || pos > words.length ) {
        const content = `
            ${Front.top}
                <h1 style='color: hsla(212, 78%, 50%, 1);'>
                    Error: Argument Out of Range.
                </h1>
            ${Front.bot}
        `;
        return res.status( 400 ).send( content );
    };

    const content = `
        ${Front.top}
            <h1 style='
                color: hsla(212, 78%, 50%, 1);
                text-align: center;
            '>
                ${ words[pos] }
            </h1>
        ${Front.bot}
    `;

    res.status( 200 ).send( content );
} );

MidServer.get( '*', ( req, res ) => {
    const content = `
        ${Front.top}
            <h1 style='color: hsla(0, 78%, 50%, 1);'>
                404 Page not Found.
            </h1>
        ${Front.bot}
    `;
    res.status( 404 ).send( content );
} );


const currentListener = MidServer.listen( process.env.PORT || PORT, () => {
    console.log( `Server Up and Listening, Info: ${ JSON.stringify( currentListener.address(), null, 4 ) }` );
} );

MidServer.activeListeners ?
    MidServer.activeListeners.push( currentListener )
    : MidServer.activeListeners = [ currentListener ];

currentListener.on( 'error', error => { console.log( `Server Error: ${error}` ); } );

/*
Query
    · Client Sends:
        URL?key=value&key=value ... &key=value

    · Server Receives:
        req.query object

Params
    Los 2 puntos son la clave.

    · Server Sets:
        /Uniform/Resource/Identifier/:id

    · Client Access:
        A set URI for a specific resource.

    · Server Receives:
        req.params

    Server.get( '/Uniform/Resource/Identifier/:id', ( req, res ) => {

        console.log( req.params );
        console.log( req.params.id );

        res.json( Resource );
    });
 */
