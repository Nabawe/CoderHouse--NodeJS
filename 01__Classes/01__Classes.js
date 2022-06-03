/* ? Como mejorar la Doc String? Esta es la 2° docstring q escribo... en especial la descripcion de la Clase */


/** Crea un usuario */
class Usuario {
    /**
     * @param {String} nombre
     * @param {String} apellido
     * @param {[titulo: string, autor: string]} libros
     * @param {[nombre: string]} mascotas
     */
    constructor( apellido, nombre, libros, mascotas ) {
        this.apellido = apellido;
        this.nombre = nombre;
        this.libros = libros  || [];
        this.mascotas = mascotas || [];
    };

    getFullName() {
        return `${this.apellido}, ${this.nombre}`;
    };

    addMascota( nombre ) {
        this.mascotas.push( nombre );
    };

    countMascotas() {
        return this.mascotas.length;
    };

    // ! cambié nombre por titulo
    /**
     * Agrega un libro
     * @param {String} titulo
     * @param {String} autor
     */
    addBook( titulo, autor ) {
        this.libros.push( { titulo, autor } );
    };

    getBookNames() {
        let output = [];
        /* ? Q forma de hacerlo es mejor y porque? las más rapida y q menos consume? for of vs destructuring for vs reduce */
        // for ( const libro of this.libros )
            // output.push( libro.titulo );
        for ( const { titulo: t } of this.libros )
            output.push( t );
        // output = this.libros.reduce( ( p, c ) => p.concat( c.titulo ), [] );
        // output = this.libros.reduce( ( p, c ) => p.concat( [c.titulo] ), [] );
            // Array.concat takes either Arrays or Values to concatenate into the new array.
            /*
                ? No me queda muy claro pork no puedo resolverlo de una de las siguientes maneras:
                    output = this.libros.reduce( ( p, c ) => p.push( c.titulo ), [] );

                    output = this.libros.reduce( ( p, c, i ) => p[i] = ( c.titulo ), [] );

                    Entiendo q en la segunda iteración se vuelve
                        p[1] = 'señor de las ...'
                        Pero entonces porque falla el push? pork p se vuelve un string y concat si funciona? lo unico de diferencia q veo es q concat devuelve un nuevo array al cual operar pero no me queda 100% claro como es el paso a paso.


                ? Y pork el reduceRight no necesita q le agregue el valor inicial de []

                Esto esta visto como 'flatten' :
                    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#flatten_an_array_of_arrays
            */
        return output;
    };
};

// ! cambié "usuario" por un Array de usuarios ademas, el nombre de la clase era muy parecido
// ? Las instancias de Objetos tambien van en pascal case no?
const Users = [];
Users['klert124jy32'] = new Usuario(
    'Musk',
    'Elon',
    [
        { titulo: 'señor de las moscas, El', autor: 'William Golding' },
        { titulo: 'Fundacion', autor: 'Isaac Asimov' }
    ],
    ['Carancho', 'Disraptor']
);

const MuskMan = Users['klert124jy32'];

console.log( 'countMascotas ', MuskMan.countMascotas(), '\n' );
MuskMan.addMascota( 'Firulais' );
console.log( 'countMascotas ', MuskMan.countMascotas(), '\n' );
console.log( 'getBookNames ', MuskMan.getBookNames(), '\n' );
MuskMan.addBook( 'Lord of the Rings, The', 'J.R.R. Tolkien' );
console.log( 'getBookNames ', MuskMan.getBookNames(), '\n' );
console.log( 'getFullName ', MuskMan.getFullName() );
