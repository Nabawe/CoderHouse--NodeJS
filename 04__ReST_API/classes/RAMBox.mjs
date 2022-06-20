import ErrsMsgs from '../data/messages/errors.msg.json' assert { type: "json" };
import fs from 'fs';
import { nanoid as f_makeUUID } from 'nanoid';
const fsP = fs.promises;

/** Creates a simple interface wich helps manipulate a basic array of items stored in a JSON file. A JSON file's internal items manager. This variation of JSONBox makes its instances work on a RAM cached array and they only commit it to JSON file on command. */
class RAMBox {
    /**
     * @param {String} fileName
     * @param {String} filePath The path must end with a slash /
     * WIP Hacer q lo reciva usando la expresion URLToPath new URL
     */
    constructor( fileName, fileDir ) {
        this.fileName = fileName;
        this.fileDir = fileDir;
        this.filePath = `${fileDir}${fileName}`;
        this.#init();
    };


    // WIP Hacer q esto tambien sea ASYNC
    // WIP hacer q cree el archivo si no existe o q eso pase al apretar save (commit to file)?
        // * Ver cual es el resutlado del error para q el catch lo haga
    /**
     * Initializes the items storage in memory.
     * @returns Returns false if it initialized without errors.
     */
    #init() {
        try {
            this.i = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ) );
            this.i.length ? null : this.i = [];
            return false;
        } catch( err ) {
            return new Error( `${ErrsMsgs.CLASS__INIT}:\n ${err.message}` );
        };
    };

    // WIP Add Other Checks
    /* WIP Add ways to specify the checks like with a hash 3b40v69 so it can skip unnecesary checks for a given scenario */
    #dataChecks( data = this.i ) {
        if ( !data.length )
            return new Error( ErrsMsgs['NO_DATA'], { cause: 'NO_DATA' } );
        return false;
    };

    /**
     * Retrieves all the items from the file asynchronously.
     * @returns {Object}JSON formmated JavaScript object.
     */
    async m_fileGetAll() {
        try {
            const data = JSON.parse( await fsP.readFile( this.filePath, 'utf-8' ) );
            return data;
        } catch( err ) {
            return new Error( `${ErrsMsgs.CAN_T_READ}:\n ${err.message}` );
        };
    };

    /**
     * Retrieves all the items from the file synchronously.
     * @returns {Object}JSON formmated JavaScript object.
     */
    m_fileGetAllSync() {
        try {
            const data = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ) );
            return data;
        } catch( err ) {
            return new Error( `${ErrsMsgs.CAN_T_READ}:\n ${err.message}` );
        };
    };

    /*
        m_getById( id ) {
            const verdict = this.#dataChecks();
            if ( !verdict ) {
                const match = this.i.find( obj => id === obj.id );
                return match || 'PRODUCT__NOT_FOUND';
            } else {
                return verdict;
            };
        };
    */
    // <3
    m_getById( id ) {
        return this.#dataChecks()
        || ( this.i.find( obj => id === obj.id )
            || new Error( ErrsMsgs['SEARCH__NOT_FOUND'], { cause: 'SEARCH__NOT_FOUND' } ) )
        ;
    };

    m_new( { title, price, thumbnail } ) {
        const id = f_makeUUID();
        this.i.push( {
            id: id,
            dateCreated: Date.now(),
            title, price, thumbnail
        } );
        return id;
    };

    m_del( id ) {
        const verdict = this.#dataChecks();
        if ( verdict )
            return verdict;

        const index = this.i.findIndex( obj => id === obj.id );
        if ( index === -1 )
                return new Error( ErrsMsgs['SEARCH__NOT_FOUND'], { cause: 'SEARCH__NOT_FOUND' } );

        return this.i.splice( index, 1 );
    };

    m_set( id, data ){
        const verdict = this.#dataChecks();
        if ( verdict )
            return verdict;

        const index = this.i.findIndex( obj => id === obj.id );
        if ( index === -1 )
                return new Error( ErrsMsgs['SEARCH__NOT_FOUND'], { cause: 'SEARCH__NOT_FOUND' } );

        ( {
            title: this.i[index].title,
            price: this.i[index].price,
            thumbnail: this.i[index].thumbnail
        } = data );
        // const { title, price, thumbnail } = req.body;
        // Products[index].title = title;
        // Products[index].price  = price;
        // Products[index].thumbnail = thumbnail;
        this.i[index].dateMod = Date.now();

        return this.i[index];
    };

















    // ! No se fija si el objeto ya existe
    // ! Puede operar en JSONs vacios [] pero no en un archivo completamente en blanco
    // ! No crea un archivo nuevo si no existe, de tener q crearlo tambien tendria q poder crear toda la ruta, o sea los dirs
    /* ! Tendria q ser sincronico o avisar cuando se completa el proceso para garantizar q se ejecuten en el orden correcto y asi se escriba de forma correcta el archivo, asignen Ids, creo q en una de mis tests marque algo parecido, disparando rapido varios eventos. */
    /*
        ! Tendria q usar append es una animalada hacerlo de esta forma, esta en las preguntas Questons-02.txt.
        ? confirmar q el metodo append de FS no cargue todo el archivo para modificarlo
    */
    async save( payload ) {
        try {
            let id = ++this.idCounter;
            // let id = ( await this.getLastIdFromFile() ) + 1;
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

export default RAMBox;
