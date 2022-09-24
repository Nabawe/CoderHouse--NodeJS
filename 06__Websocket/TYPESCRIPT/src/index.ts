import * as CONSTS from './mod.js';

console.log( CONSTS.Obj );

if ( false ) console.log( 'true' );
else console.log( 'else' );


const arry0: Number[] = [ 1, 2 ];

arry0[ 5 ] = 3124514;

console.log( arry0 );

// ? Return Type Inference
// !? TENGO MIS DUDAS DE SI LA ESPECIFICACION : T[] del return de esta funcion hace realmente algo, al menos seguramente ayuda con el itelisense
    // Si lo borro el  itelisense sigue marcando lo mismo, al definir el return tal vez esta bueno para garantizar q sea como uno lo define y no q por ahi al terminar d programar la funcion da algo fuera del typado pensado y entonces saber q hay algo mal, vs q TS auto infiera y tonces pase de largo un error
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

let sample = [ '1', 2, '3', 4, '5' ];
let reversed = reverse( sample );
sample[2] = 3; // Okay since: let sample: (string | number)[]
console.log( 'Reversed: ', reversed) ;

let sample2 = [ '1', '3', '5' ];
let reversed2 = reverse( sample2 );
sample2[2] = 1; // Error: Type 'number' is not assignable to type 'string'.
reversed2[2] = 3; // Error: Type 'number' is not assignable to type 'string'.
console.log( 'Reversed2: ', reversed2) ;


interface Wrinkly<T extends { name: String }> {
    id: number;
    author: string;
    data: T
}

const FallOfNumenor: Wrinkly<{ name: String, FstParagraph: string }> = {
    id: 123,
    author: 'J.R.R. Tolkien',
    data: {
        name: 'Fall of Númenor',
        FstParagraph: 'Lorem Ipsum'
    }
}

console.log( 'FallOfNumenor', FallOfNumenor );



