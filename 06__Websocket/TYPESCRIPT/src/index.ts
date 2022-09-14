import * as CONSTS from './mod.js';

console.log( CONSTS.Obj );

if ( false ) console.log( 'true' );
else console.log( 'else' );

class Cool {
    constructor ( public x: number ) {
        this.x = x;
    }
};
let Miau: Cool;
let Mia = Cool;
const iMia = new Cool( 2 );

console.log( typeof Mia ); // ? Ver como testear si el typo de TypeScript se aplico

/* ? Duda sobre usar
    "module": "NodeNext"
        This allows for .json imports
            is this operation sync or async?
                Parese ser q es pasa al momento de buildiarse la app, por lo q dicen webpack lo agrega directamente como una declaracion q forma parte del archivo.
OR
    "module": "ESNext"
        No necesito especificar las extenciones
*/

const arry0: Number[] = [ 1, 2 ];

arry0[ 5 ] = 3124514;

console.log( arry0 );
