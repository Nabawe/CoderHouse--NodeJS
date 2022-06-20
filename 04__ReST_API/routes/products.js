import { Router } from "express";
import { fileURLToPath } from 'node:url';
import RAMBox from "../classes/RAMBox.mjs";
import Verdicts from "../data/verdicts.js";

const MerchMan = new RAMBox( 'products.json', fileURLToPath( new URL( '../data/', import.meta.url ) ) );
const Route_Products = Router();


Route_Products.get( '/products', ( req, res ) => {
    res.status( 200 ).json( MerchMan.i );
} );

Route_Products.get( '/products/:id', ( req, res ) => {
    const match = MerchMan.m_getById( req.params.id );
    if ( match instanceof Error ) {
        const v = Verdicts[match.cause];
        return res.status( v.status )[v.type]( v.outcome );
    };
    res.status( 200 ).json( match );
} );

Route_Products.post( '/products', ( req, res ) => {
    res.status( 200 ).json( { id: MerchMan.m_new( req.body ) } );
} );

Route_Products.delete( '/products', ( req, res ) => {
    const match = MerchMan.m_del( req.params.id );
    if ( match instanceof Error ) {
        const v = Verdicts[match.cause];
        return res.status( v.status )[v.type]( v.outcome );
    };
    res.status( 200 ).json( match );
} );

// * No permite actualizar el id de forma manual
Route_Products.put( '/products/:id', ( req, res ) => {
    const match = MerchMan.m_set( req.params.id, req.body );
    if ( match instanceof Error ) {
        const v = Verdicts[match.cause];
        return res.status( v.status )[v.type]( v.outcome );
    };
    res.status( 200 ).json( match );
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
