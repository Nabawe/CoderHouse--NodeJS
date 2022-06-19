import { Router } from "express";
// * Intresting new requirement for data imports.
import Products from '../data/products.json' assert { type: "json" };
import { nanoid as f_makeUUID } from 'nanoid';
// Products = Products || [];
import ErrsMsgs from '../data/errors.msg.json' assert { type: "json" };

const Route_Products = Router();

function f_dataChecks( data ) {
    // WIP Add Other Checks
    /* ? Pensar bien antes de mover esta f a una clase ya q en el archivo de rutas se debería manejar toda la parte del servidor y en JSONBox lo pertinente a data. */
    if ( !data.length )
        return { status: 412, error: ErrsMsgs.NO_DATA };
    return true;
};

function f_productNotFound( res ) {
    return res.status( 404 ).json( ErrsMsgs.PRODUCT__NOT_FOUND );
};


Route_Products.get( '/products', ( req, res ) => {
    res.status( 200 ).json( Products );
} );

Route_Products.get( '/products/:id', ( req, res ) => {
    const verdict = f_dataChecks( Products );
    if ( verdict === true ) {
        const id = req.params.id;
        const match = Products.find( obj => id === obj.id );
        if ( match ) {
            return res.status( 200 ).json( match );
        } else {
            return f_productNotFound( res );
        };
    } else {
        return res.status( verdict.status ).json( verdict.error );
    };
} );

Route_Products.post( '/products', ( req, res ) => {
    // ! Agregar algo de este estilo al mover save a la class : Products = Products || [];
        // Tal vez no es necesario ya q al initializar el server se crearia Products y por ende no seria necesario checkear esto

    const { title, price, thumbnail } = req.body;
    const id = f_makeUUID();

    Products.push( {
        id: id,
        dateCreated: Date.now(),
        title, price, thumbnail
    } );

    res.status( 200 ).json( { id } );
} );

Route_Products.delete( '/products', ( req, res ) => {
    let index;
    const verdict = f_dataChecks( Products );
    if ( verdict === true ) {
        const id = req.params.id;
        index = Products.findIndex( obj => id === obj.id );
        if ( index === -1 )
            return f_productNotFound( res );

        return res.status( 200 ).json( Products.splice( index, 1 ) );
    } else {
        return res.status( verdict.status ).json( verdict.error );
    };
} );

// * No permite actualizar el id de forma manual
Route_Products.put( '/products/:id', ( req, res ) => {
    let index;
    const verdict = f_dataChecks( Products );
    if ( verdict === true ) {
        const id = req.params.id;
        index = Products.findIndex( obj => id === obj.id );
        if ( index === -1 )
            return f_productNotFound( res );

        ( {
            title: Products[index].title,
            price: Products[index].price,
            thumbnail: Products[index].thumbnail
        } = req.body );
        // const { title, price, thumbnail } = req.body;
        // Products[index].title = title;
        // Products[index].price  = price;
        // Products[index].thumbnail = thumbnail;
        Products[index].dateMod = Date.now();

        return res.status( 200 ).json( Products[index] );
    } else {
        return res.status( verdict.status ).json( verdict.error );
    };
} );

// ! Hacer q cada tanto se graben en un archivo, usando timer o cada vez q termina una operación -> Peligro si es ASYNC
// ! Crear JSONBoxRAMCached, q use UUID y agregar timestamp creted, timestamp mod, si se mod o crea se agrega o re agrega al final del array ( borra y agrega )
    //  q tenga una funcion save o commitToDisk para elegir cuando se guarda en disco y pedir ayuda como diceñar y o investigar (la cola de escritura, etc)
    // en vez de tener el import en la ruta de los productos se initializa la instancia de la clase con ese archivo y ahi se hace la validacion del mismo y carga a RAM
// ! revisar como esta redactada la pregunta de append a ver si es lo mismo q leer, sacar, y reescribir todo? parcial?
// To-Do Mover nanoid a lo q lo use, modificar package.json
// ! Frenar el cambio de pagina del submit




// Route_Products.post( '/products', ( req, res ) => {
//     const { name, race, age } = req.body;
//     Products.push( { name, race, age } );
//     //res.status( 200 ).json( Products );
//     res.status( 200 ).end();
// } );

export default Route_Products;

/*
    GET '/api/productos' -> devuelve todos los productos.
    GET '/api/productos/:id' -> devuelve un producto según su id.
    POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
    PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
    DELETE '/api/productos/:id' -> elimina un producto según su id.
    - Agregar una query
*/
