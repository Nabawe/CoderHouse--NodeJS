/*
    To-Do Crear un mecanismo de FLAGS al estilo Flag_Lock_Save, entonces todas las funciones q se podrian ver afectadas por el save esperan q se resuelva esa cola, y así para otros casos al estilo Flag_Lock_RetrievingLastIdFromFile.
        Supuestamente eso es lo q se tendria q lograr con las promises, el estado pending pero estoy estructurando mal.
        Al estilo diga busy o avise al stack.
    To-Do remover todas las funciones Sync, una cosa es q la Class se frene pero no tiene q frenar la ejecucion completa del servidor.
*/

import fs from 'node:fs';
const fsP = fs.promises;

/** Creates a simple interface wich helps manipulate a basic array of items stored in a JSON file. A JSON file's internal items manager. */
class JSONBox {
    /**
     * @param {String} fileName
     * @param {String} filePath The path must end with a slash /
     */
    constructor( fileName, filePath ) {
        this.fileName = fileName;
        this.filePath = `${filePath}${fileName}`;
        this.#initIdsCounter();
    };

    /**
     * Retrieves all the items from the file asynchronously.
     * @returns {JSON}JSON formmated data.
     */
    async getAll() {
        try {
            const data = JSON.parse( await fsP.readFile( this.filePath, 'utf-8' ) );
            return data;
        } catch( err ) {
            return new Error( `Al intentar leer el archivo:\n ${err.message}` );
        };
    };

    /**
     * Finds a item by id.
     * @param {Number} id of the item.
     * @returns {Object} an object with the single's item data, null if no result is found or Error if the file's data was undefined, missing, [], etc.
     */
    async getById( id ) {
        try {
            const data = await this.getAll();
            return data.length ?
                ( data.find( obj => id === obj.id ) ) || null
            :
                new Error( 'Archivo Vacio' )
            ;
        } catch( err ) {
            return new Error( `Se produzco un error al realizar la busqueda:\n ${err.message}` );
        };
    };

    // ! Supone q fueron guardados en orden
    /* Comentario a mi mismo - .- seria mejor si esto fuera la primera linea del archivo o como un dato aparte facil de relevar tambien definido dentro... aunque si esta adentro fuerza a cargar todo junto, o es la primera linea o se lo guarda aparte en otro lado */
    /* https://stackoverflow.com/a/61839489/3170694 falta length -1 vs at(-1), Comparacion de formas de obtener el ultimo elemento */
    // Aun si esta vacio debería devolver 0.
    async getLastIdFromFile() {
        try {
            const data = await this.getAll();
            // return data.length ? ( await data[ data.length - 1 ].id ) : 0;
            return data.length ? ( data[ data.length - 1 ].id ) : 0;
        } catch( err ) {
            return new Error( `No Encontrado:\n ${err.message}` );
        };
    };

    async getFirstIdFromFile() {
        try {
            const data = await this.getAll();
            return data.length ? ( data[0].id ) : 0;
        } catch( err ) {
            return new Error( `No Encontrado:\n ${err.message}` );
        };
    };

    /**
     * Picks an item by Math.random().
     * @param {Number} [min=getFirstIdFromFile()]
     * @param {Number} [max=getLastIdFromFile()]
     * @returns {Promise} a random single item, null if no result is found or Error if the file's data was undefined, missing, [], etc.
     */
    /*
        ! WIP Ver como garantizar q se devuelva un resultado, o sea no tiene mucho sentido q devuelva null cuando se supone q tiene q dar un item al azar.
    */
    async getRndItem( min, max ) {
        try {
            const data = await this.getAll();
            if ( data.length ) {
                min = min || await this.getFirstIdFromFile();
                max = max || await this.getLastIdFromFile();
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
                // max and min are inclusive
                const id = Math.floor( Math.random() * ( max - min + 1 ) + min );
                return ( data.find( obj => id === obj.id ) ) || null
            } else {
                new Error( 'Archivo Vacio' );
            };
        } catch( err ) {
            return new Error( `Se produzco un error al realizar la busqueda:\n ${err.message}` );
        };
    };

    async setIdCounter() {
        return this.idCounter = await this.getLastIdFromFile();
    };

    // Aun si esta vacio( JSON vacio [] o {}; y no completamente vacio ) debería devolver 0.
    // ! Hacer q esto tambien sea ASYNC
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
    // ! No crea un archivo nuevo si no existe, de tener q crearlo tambien tendria q poder crear toda la ruta, o sea los dirs
    /*
        ! Tendria q ser sincronico o avisar cuando se completa el proceso para garantizar q se ejecuten en el orden correcto y asi se escriba de forma correcta el archivo, asignen Ids, creo q en una de mis tests marque algo parecido, disparando rapido varios eventos.
    */
    /*
        ! Tendria q usar append es una animalada hacerlo de esta forma, esta en las preguntas Questons-02.txt.
        ? confirmar q el metodo append de FS no cargue todo el archivo para modificarlo
    */
    async save( payload ) {
        try {
            let id = ++this.idCounter;
            // let id = ( await this.getLastIdFromFile() ) + 1;
            payload = { 'id': id, ...payload };
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

export default JSONBox;
