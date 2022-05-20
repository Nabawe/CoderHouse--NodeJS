// const fs = require('fs');
import fs from 'fs';
const fsP = fs.promises;

class Container {
    constructor( fileName ) {
        this.fileName = fileName;
        this.filePath = `./testFiles/${fileName}`;
        // this.setIdCounter();
        this.#initIdsCounter();
    };

    async getAll() {
        try {
            const data = JSON.parse( await fsP.readFile( this.filePath, 'utf-8' ) );
            return data;
        } catch( err ) {
            return new Error( `Al intentar leer el archivo:\n ${err.message}` );
        };
    };
    /* getAll() {
        try {
            const data = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ) );
            return data;
        } catch( err ) {
            return new Error( `Al intentar leer el archivo:\n ${err.message}` );
        };
    }; */

    async getById( id ) {
        try {
            const data = await this.getAll();
            // el primer null es por si find retorna undefined, sin matches
            // el segundo es por si data es undefined o []
            return data.length ?
                // ( await data.find( obj => id === obj.id ) ) || null
                ( data.find( obj => id === obj.id ) ) || null
            :
                null
            ;
            /* if ( data ) {
                return ( await data.find( obj => id === obj.id ) ) || null;
            } else {
                return new Error( 'Archivo Vacio' );
            }; */
        } catch( err ) {
            return new Error( `No Encontrado:\n ${err.message}` );
        };
    };

    // ! Supone q fueron guardados en orden
    /* Comentario a mi mismo - .- seria mejor si esto fuera la primera linea del archivo o como un dato aparte facil de relevar tambien definido dentro... aunque si esta adentro fuerza a cargar todo junto, o es la primera linea o se lo guarda aparte en otro lado */
    /* https://stackoverflow.com/a/61839489/3170694 falta length -1 vs at(-1), Comparacion de formas de obtener el ultimo elemento */
    // Aun si esta vacio debería devolver 0.
    async getLastId() {
        try {
            const data = await this.getAll();
            // return data.length ? ( await data[ data.length - 1 ].id ) : 0;
            return data.length ? ( data[ data.length - 1 ].id ) : 0;
        } catch( err ) {
            return new Error( `No Encontrado:\n ${err.message}` );
        };
    };

    async setIdCounter() {
        return this.idCounter = await this.getLastId();
    };

    // Aun si esta vacio( JSON vacio [] o {}; y no completamente vacio ) debería devolver 0.
    #initIdsCounter() {
        try {
            const data = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ) );
            return this.idCounter = data.length ? ( data[ data.length - 1 ].id ) : 0;
        } catch( err ) {
            return new Error( `Al Initializar la Class:\n ${err.message}` );
        };
    };

    // ! No se fija si el objeto ya existe
    // ! Puede operar en JSONs vacios [] pero no en un archivo completamente en blanco
    // ! No crea un archivo nuevo si no existe
    async save( payload ) {
        try {
            let id = ++this.idCounter;
            // let id = ( await this.getLastId() ) + 1;
            payload = { ...payload, 'id': id };
            // const data = ( await this.getAll() ) || [];
            let data = await this.getAll();
            data.push( payload );
            await fsP.writeFile( this.filePath, JSON.stringify( data, null, 4 ), 'utf-8' );
            return id;
        } catch( err ) {
            return new Error( `Al Guardar:\n ${err.message}` );
        };
        // } finally {
        //     // La sig linea es simplemente para jugar y probar
        //     console.log( `Se ejecuto ${this.fileName}.save` );
        // };
    };

    // ! No modifica this.idCounter ni livera los ids eliminados
    // ! No retorna el objeto eliminado
    async deleteById( id ) {
        try {
            const data = await this.getAll();
            let payload;
            if ( data ) {
                payload = await data.filter( obj => id !== obj.id );
                if ( payload.length === data.length )
                    return new Error( `Al Borrar: Objeto Inexistente:\n` );
            } else {
                return new Error( `Al Borrar: Archivo Vacio:\n` );
            };
            await fsP.writeFile( this.filePath, JSON.stringify( payload, null, 4 ), 'utf-8' );
        } catch( err ) {
            return new Error( `Inesperado al Borrar:\n ${err.message}` );
        };
    };

    async deleteAll() {
        try {
            await fsP.writeFile( this.filePath, '[]', 'utf-8' );
            /* De anular la sig linea esta bueno ver q toma los ids antes del reset, ya q idCounter se initializa antes q deleteAll. */
            this.idCounter = 0;
            return 'Se reseteo el archivo de forma exitosa.'
        } catch( err ) {
            return new Error( `Inesperado al intentar Borrar Todo:\n ${err.message}` );
        };
    };
};

export default Container;
