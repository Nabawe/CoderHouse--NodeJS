import Container from "./classes.js";
import TestObjects from "./TestObjects.js"
// import { promises as fsP } from 'fs';
console.clear();
console.log( `==============================${ new Date() }` );

function runTest( msg, delay, test ) {
    setTimeout(
        ( async () => { console.log( msg, await test(), '\n' ) } ),
        delay
    );
};

// Uso let pensado q manipularía otro archivo luego.
/*
    ! La class esta armada para solo usar el archivo si esta en ./testFiles/ el mismo directorio, ya q la consigna decia q se le pasara un nombre
*/
let file = new Container( 'productos.json' );
runTest( 'deleteAll: ', 70, () => file.deleteAll() );
/* Si el delay del intervalo es lo suficientemente bajo se lo puede hacer explotar */
let i = 0;
const interID = setInterval(
    () => {
        if ( i < TestObjects.length ) {
            runTest( 'Saving... ', null, () => file.save( TestObjects[i++] ) );
        } else {
            clearInterval(interID);
        }
    },
    150
);

runTest( 'getById hit: ', 3000, () => file.getById( 3 ) );
runTest( 'getById miss: ', 4000, () => file.getById( '3' ) );
runTest( 'getLastId: ', 5000, () => file.getLastId() );
/*
runTest( 'Save: ', null, () => file.save( TestObjects[0] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[4] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[4] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[4] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[2] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[1] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[1] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[6] ) ); // Para causar errores correr 3 o 5 simultaneos.
runTest( 'Save: ', null, () => file.save( TestObjects[6] ) ); // Para causar errores correr 3 o 5 simultaneos.
*/

runTest( 'deleteById miss: ', 6000, () => file.deleteById( 500 ) );
runTest( 'deleteById hit: ', 7000, () => file.deleteById( 3 ) );
runTest( 'Reviwing changes to the Array after delition: ', 8000, () => file.getAll() );


// ( async () => { console.log( 'MANUAL TEST ', await file.getById( 4 ), '\n' ) } )();
// ( async () => { console.log( 'MANUAL TEST ', await file.getAll(), '\n' ) } )();

// ! EmptyFile y EmptyJSON
console.log( `==============================${ new Date() }` );
file = new Container( 'EmptyFile.json' );
runTest( 'getById miss: ', 4000, () => file.getById( '3' ) );
runTest( 'deleteById miss: ', 6000, () => file.deleteById( 500 ) );


console.log( `==============================${ new Date() }` );
file = new Container( 'EmptyFileJSON.json' );
runTest( 'deleteAll: ', 70, () => file.deleteAll() );
runTest( 'getById miss: ', 4000, () => file.getById( '3' ) );
runTest( 'deleteById miss: ', 6000, () => file.deleteById( 500 ) );


// Testeando fs.readdirSync
// import fs from 'fs';
// console.log( fs.readdirSync('./testFiles/') );
