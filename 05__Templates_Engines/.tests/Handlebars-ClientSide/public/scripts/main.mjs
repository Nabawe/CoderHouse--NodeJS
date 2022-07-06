// ? Como extraeria el modulo fs de node para q lo use? aunque me parece q no tiene sentido ya q el esta armado en c o c++ y ademas como haria fs para 'leer un archivo del servidor desde el cliente'

// import { readFileSync } from 'node:fs';
    /*
        localhost/:1 Access to script at 'node:fs' from origin 'http://localhost:8080' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.

        main.mjs:19          GET node:fs net::ERR_FAILED
    */
// import content from '../views/DatosPersonales.handlebars' assert { type: "handlebars" };
// import { readFileSync } from 'node:fs';
// let content = readFileSync( '../views/DatosPersonales.handlebars', 'utf-8' );


// HTML Template Layout
import content from '../views/DatosPersonales.handlebars.js';


// Compiles a template so it can be executed immediately.
const Template = Handlebars.compile( content );
const Data = {
    nombre: 'Cosme',
    apellido: 'Perez',
    edad: '30',
    email: 'cosmes@fulanito.com',
    telefono: '11223344'
};

// Input the Data into the template.
const output = Template( Data );

// HTML Injection
document.getElementById( 'mustache' ).innerHTML = output;
