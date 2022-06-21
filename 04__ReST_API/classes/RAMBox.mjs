/* WIP
    Error de diceño fundamental, no se deberia dar acceso directo a this.i ( items ), sino q todo se haga a travez de metodos para garantizar integridad.

    Operaciones Sincronicas a Asincronicas:
        Quiero q m_fileSave, m_fileReset y #init sean async:
            - #init:
                · Posiblemente tenga q comunicar q se están cargando los datos.

            - m_fileSave:
                1 - Retorna aviso de q esta por comensar para q tanto el Backend como el Frontend bloqueen todas las operaciones q usen el modulo fs ( los metodos q comienzan con m_file ) pero NO las que se realizen solo en RAM ( las q manipulan this.i ), colocar los botones en estado disabled, etc.
                2 - Dispara la operación asincronica SIN AWAIT y retorna la ejecución al server.
                Aqui no se si es q tendria q colocar en forma de promesa a todo, el grabar y lo q tenga q correrse luego de terminarse de grabar.
                3 - Q se ejecuten los pasos faltantes de la funcion grabar q no tengan q ver con la escritura en disco.
                4 - Desbloquea lo bloqueado en 1.
                5 - Para luego evolucionar a q el save se dispare acordé a criterios, cierta cantidad de info nueva o cada x segs, etc.

            - m_fileReset:
                1 - Corre m_reset.
                Idem del punto 1 a 4 de m_fileSave

*/

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
    /* WIP hacer q cree el archivo si no existe o q eso pase al apretar save (commit to file)? (Por ahora si pasara eso habria un error al pasar el arg o se dispararia el catch); también tendría q crear los directorios */
        /* * Ver cual es el resutlado del error para q el catch lo haga, o sea si JSON.parse o readFile dan error ver q se le pasa al catch por err y ejecutar solución */
    /* ! Esto puede tambien fallar si la totalidad del archivo es uno de los tipos minimos de JSON ejemplo si solo tuviera null dentro. No se si es suficiente el checkear el lenght */
    /* ! Aqui return new Error no tiene sentido ya q no hay nadie q lo capture al error y lo muestre */
    /**
     * Initializes the items storage in memory.
     * @returns Returns false if it initialized without errors.
     */
    #init() {
        try {
            this.i = JSON.parse( fs.readFileSync( this.filePath, 'utf-8' ) );
            return false;
        } catch( err ) {
            return console.error( new Error( `${ErrsMsgs.CLASS__INIT}:\n ${err.message}`, { cause: 'CLASS__INIT' } ) );
        };
    };

    // WIP Add Other Checks
    /* WIP Add ways to specify the checks like with a hash 3b40v69 or binary string 010110 or flags object, so it can skip unnecesary checks for a given scenario */
    // * Both Parameters are optional
    #dataChecks( flags, data = this.i ) {
        let F = { NO_DATA: true, chespirito: true, meripoppins: true, ...flags };
        if ( F.NO_DATA && !data.length )
            return console.error( new Error( `${ErrsMsgs.NO_DATA}:\n ${err.message}`, { cause: 'NO_DATA' } ) );
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
            return new Error( `${ErrsMsgs.CAN_T_READ}:\n ${err.message}`, { cause: 'CAN_T_READ' } );
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
            return new Error( `${ErrsMsgs.CAN_T_READ}:\n ${err.message}`, { cause: 'CAN_T_READ' } );
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
        const verdict = this.#dataChecks( { NO_DATA: false } );
        if ( verdict )
            return verdict;

        const id = f_makeUUID();
        this.i.push( {
            id: id,
            dateCreated: Date.now(),
            title, price, thumbnail
        } );
        return id;
    };

    // Se podria usar delete[index] y luego al grabar o reindexar remover los undefined
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

        const Target = this.i[index];
        // Como this.i[index] ya esta declarado tengo q colocar el destructuring entre ()
        ( {
            title: Target.title,
            price: Target.price,
            thumbnail: Target.thumbnail
        } = data );
        // const { title, price, thumbnail } = data;
        // Target.title = title;
        // Target.price  = price;
        // Target.thumbnail = thumbnail;
        Target.dateMod = Date.now();

        return Target;
    };

    /*
        ! No crea un archivo nuevo si no existe, de tener q crearlo tambien tendria q poder crear toda la ruta, o sea los dirs

        ! Tendria q usar append es una animalada hacerlo de esta forma, esta en las preguntas Questons-02.txt.
        ? confirmar q el metodo append de FS no cargue todo el archivo para modificarlo
    */
    m_fileSave() {
        try {
            fs.writeFileSync( this.filePath, JSON.stringify( this.i, null, 4 ), 'utf-8' );
            return false;
        } catch( err ) {
            return new Error( `${ErrsMsgs.CAN_T_SAVE}:\n ${err.message}`, { cause: 'CAN_T_SAVE' } );
        };
    };

    // Pensar ¿Tiene algun sentido q solo borre el archivo del disco pero deje la RAM?
    m_fileReset() {
        try {
            fs.writeFileSync( this.filePath, '[]', 'utf-8' );
            this.i = [];
            return false;
        } catch( err ) {
            return new Error( `${ErrsMsgs.CAN_T_RESET}:\n ${err.message}`, { cause: 'CAN_T_RESET' } );
        };
    };
};

export default RAMBox;
