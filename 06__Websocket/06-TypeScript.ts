/*
    + CODEX
    + TERMS
    + TOOLS

    + Mantras
    Project TypeScript Setup
    + Babel
    + tsconfig.json
    + Deployment Templates
        - NodeJS
        - ReactJS
        - React Native
        - React Native Expo

    + Basic Types
    + Implicit Typing
    + Explicit Typing with :
    + type
    + interface
    + Functions
    + Arrays
    + Generics
    + Namespaces
    + Modules
    + Declaration Files .d.ts and .ts
    + Pros


    + QUESTIONS
    + TO-DO
    + SOURCES
*/


/* + CODEX */ /*
    + Section
        - Subsection or Item
            · Subsection or Item
                * Subsection or Item (Free-form from this level downwards, try to avoid asterisk as it could have other uses)
                    <> Subsection or Item

    - Abbreviations:
        · TS = TypeScript
        · JS = JavaScript
        · TSC = TypeScript Compiler
/* + CODEX */


/* + TERMS */ /*
    - Transpiler
        Source to source compiler. AKAs: source-to-source compiler, transcompiler
/* + TERMS */


/* + TOOLS */ /*
    - Definitely Typed
        https://www.typescriptlang.org/dt/
        https://github.com/DefinitelyTyped/DefinitelyTyped
        To find TypeScrip enabled libs or to obtain the Types Definitions Files.
/* + TOOLS */


/* + Mantras */ /*
    " you can incrementally upgrade your JavaScript code to TypeScript "

    " Type errors do not prevent JavaScript emit. To make it easy for you to migrate your JavaScript code to TypeScript, even if there are compilation errors, by default TypeScript will emit valid JavaScript the best that it can. "
/* + Mantras */


/* + Project Setup */
    // npm i -D typescript
        // Parece ser q no se puede pinear con Volta

    // VS Code
    // Preferences: Open Workspace Settings (JSON)
    // "files.exclude": {
    //     "**/*.js": { "when": "$(basename).ts" },
    //     "/.js": { "when": "$(basename).tsx" }
    // }

    // ? Ver si se tambien excluye .mjs

    // This is to exclude  JS search results

    // package.json root
        // "type": "module"

    // ! CHECK IF THIS IS NECESARY
        // https://typescript-eslint.io/docs/
/* + Project Setup */


/* + Babel */ /*
    npm install @babel/core @babel/cli @babel/preset-env
        El primer módulo es la librería principal, el segundo es el cliente por terminal, y el tercero es el plugin de configuración para que soporte todos los JavaScript de la nueva generación.

    .babelrc
        {
            "presets": ["@babel/preset-env"]
        }

    package.json scripts
        "build": "babel ./origen.js -o ./destino.js -w"
            ! ver como hacer mejor esto


        ! Check dotenv practices
        ! Check if best to instal babel globally
/* + Babel */


/* + tsconfig.json */ /*
    // ! RECHECK EVERYTHING set them for the latest JS

    module
        Avoid the use of .mts and .cts
            It is better to use the module (tsconfig.json) and type (package.json) setting to modify this behaviour. Only use for outlier files.

        NodeNext vs ES2022
            NodeNext seams to be the best choise:
                " The emitted JavaScript uses either CommonJS or ES2020 output depending on the file extension and the value of the type setting in the nearest package.json. Module resolution also works differently. " - https://www.typescriptlang.org/tsconfig#node16nodenext-nightly-builds

                    ? check if it needs to be set up differently for the dif Reacts vers
                    ! ? Do I need to specify moduleResolution ?
                        ? Test if NodeNext changes moduleResolution it might be visible if adding showConfig TSC flag
                        * Posiblemente la forma mas sana de pensarlo es directamente especificar modulesResolution con NodeNext asi siempre usa el algoritmo mas moderno, el problema esta si en algun momento la tsconfig setting module: NodeNext afecta a la otra setting y si por especificar manualmente se arruine, !!! idea colocar moduleResolution ARRIBA de module asi si por alguna razon module modifica a la otra esta la cambiaria? solo puedo esperar q sea asi, ya q es muy probable q todo el archivo se lea de una y q esto no tenga sentid...snif
                            Tal vez por todo el razonamiento anterior es mejor NO especificarla, el problema esta si por alguna razon agarra el algo viejo pero por el otro lado esto es solo para como se los buscan...
                    ? Test if it is still posible to ommit t import extension or if it still requires t .js ext
                        ? Check to which file it maps when ommiting it ( .ts or .js ), in essense if the import actually works while coding ( getting IntelliSense of the imported module )

    outDir
    modules
    files

    "compilerOptions": {
        "baseURL": "src",               // To use NameSpaces
        "paths": {                      // ! Unique names
            "@nmyApp-nameSpace/*":     ["app/nameSpace/*"],
            "@nmyApp-shared/*":        ["app/shared/deeply/nested/*"],
            "@nmyApp-environments/*":  ["environments/*"],
        },
        "lib": [ "dom", "es2017" ],     // * adds typings for specific environments, improves intellisense a lot
        "module": "NodeNext",           // Enables TSC Modules Support
        "removeComments": true,
        "strict": true,                 // to deepdive and learn proper
        "target": "esnext",
        "watch": "true",                // transpiles on save
    }
/* + tsconfig.json */


/* + Deployment Templates */ /*
    - NodeJS
        [npm i -g nodemon]
        npm init -y
        [volta pin node]
        npm i -D typescript @types/node ts-node
        npx tsc --init --rootDir src --outDir dist --strict --esModuleInterop --resolveJsonModule --removeComments --forceConsistentCasingInFileNames --skipLibCheck --target ES2022 --module NodeNext --lib es6,dom
        */
        // package.json
        //     "type": "module",
        //     "scripts": {
        //          "start": "npm run build:live",
        //          "build": "tsc -p .",
        //          "build:live": "nodemon --watch 'src/**/*.ts' --exec \"ts-node\" src/index.ts"
        //     },
        /*

    - ReactJS

    - React Native
        npx react-native init AwesomeTSProject --template react-native-template-typescript
        npx react-native run-android
        npx react-native run-ios
        Desabilitar prettierrc si molesta:
            Es para q no marque como wavy line error cosas de estilos de codigo, espacios, etc.
            eslintrc.js
                rules: {
                    'prettier/prettier': 0,
                },

    - React Native Expo
/* + Deployment Templates */


/* + Basic Types */ /*
    Fill with string, number, etc
    AND
    never, uknown, void
/* + Basic Types */


/* + Implicit Typing */ /*
    When assigning an initial value to a variable TypeScript will try to guess its type.
    let lucky = 21; // TypeScript infers the number type.
    let lucky = 'Bufanda'; // TypeScript infers the string type.

    function pow( x, y ) {
        // TS infers the number type from the use of Math lib.
        // The type is not infered from the function parameters.
        return Math.pow( x, y );
    };
/* + Implicit Typing */


/* + Explicit Typing with : */ /*
    * For basic things is better to let TS infer it
    let name: string;
    let name: string = 'Hi'.
/* + Explicit Typing with : */


/* + type */ /*
    PascalCase.
    To make simple compound validations.

    type Style = 'strong' | 'emphasis' | 21;
    let font: Style;

    font = 'something'; // Error
    font = 'strong';    // OK
/* + type */


/* + interface */ /*
    PascalCase.
    To validate Objects that follow a same structure.
    Parameters, args and return values of a function.

    // - Objects
        interface Person {
            first: string;
            last: string;
            // * So that 'fast' does not produce a TS error, but this surely limits existence checks.
            [ key: string ]: any;
        };

        const person1: Person = {
            first: 'Jeff',
            last: 'Delaney',
        };

        const person2: Person = {
            first: 'Usain',
            last: 'Bolt',
            fast: true
        };

    // * Se recomienda poner las props arriba y metodos abajo
/* + interface */


/* + Functions */ /*
    In this particular case the return type could most proably be infered until they add ** operand to strings xD.

    function Pow( x:number, y:number ): number {
        return x ** y;
    };

    Pow( 5, 2);
/* + Functions */


/* + Arrays */ /*
    Python's tuples are fixed sized Arrays.
    The ? is to make the value optional, but the type is still being checked.
        ! Tested and the types are not checked

    type MyTuple1 = [ number?, string?, boolean? ];
    const arry1: MyTuple1 = [];

    arry1.push(1);
    arry1.push('44');
    arry1.push(false);

    type MyTuple2 = [ number, string, boolean ];
    const arry2: MyTuple2 = [ 1, 'asd', true ];
/* + Arrays */


/* + Generics */ /*
    It seams to be a way to specify the type the moment it is being to be used.
    <  > Syntax
/* + Generics */


/* + Namespaces */ /*
    JS does not have Namespaces.
    Use ; to separate members.
    export to publish.

    namespace nsCammelCase {
        const privateValue = "You can't acces this outside the Ns";

        export const expression = 'Laralilala';

        export const anotherExpression = ( a: number, b: number ) => a + b;

        export namespace nestedNamespace {
            export function moonlightSonata() {
                return 'Bethoven';
            };
        };
    };

    console.log( nsCammelCase.expression );
    console.log( nsCammelCase.nestedNamespace.moonlightSonata() );
/* + Namespaces */


/* + Modules */ /*
    Use import path without the file extension.
    Only specify the .js extension when the target for transpilation is old.

    tsconfig.json:
        "target":,
        "module":,
    */

/* + Modules */


/* + Declaration Files .d.ts and .ts */ /*
    - Can only contain types definitions.
    - d.ts Declaration Files are generally used to add types JS files without the need to rewrite them, they are generally auto associated, by using the same name or as a separated @types/libName package generally with an index.d.ts (its own package.json would have something like "types": "index.d.ts").
    - .ts Declaration Files are used to split the typings from another .ts file, they need to be manually imported.


    // someName.d.ts
        export type Sum = {
            first: number;
            second: number;
        };

        export function nameOfTheFunctionToType( x: string, y: boolean ): number;

    // someName.js
        import { Sum, namnameOfTheFunctionToTypeeOf } from ''

    // To autogenerate Types Declaration Files
        tsc FILE --declaration

    // Check +TOOLS-Definitely Typed
/* + Declaration Files .d.ts and .ts */


/* + Pros */ /*
    - Customized intellisense thru lib key in tsconfig.json
    - Combat JS weirdness : So you can incrementally upgrade your JavaScript code to TypeScript
/* + Pros */


/* + QUESTIONS */ /*
    - what is the "name" of the colon operator in typescript? ( I mean the main operator the : ).
        type operator? typeS operator?

    - VS Code alternative, better squiggly wavy lines for errors

    - Still unsure if it is better to leave a space after the type or not asd:string vs asd: string

    - interface
        · Alternative to [ key: string ]: any;
        · For functions, arrays

    - Specifying optional types, parameters with ?
        · How can they be both optional but type checked when specified, example in the +Array section.

    - Namespaces
        · Do the use of Namespaces have a big negative impact once transpiled into JS? Since they are turned into a mess of functions or objects.

    - Using Nightly Ver
        " I generally recommend people to use the nightly version because the compiler test suite only catches more bugs over time " - https://basarat.gitbook.io/typescript/getting-started#typescript-version
            What does this mean? What's implied?

    - Git Ignore JS?
        Al hacer las cosas en TS tonces tendria q agregar JS al git ignore? Para excluir build o alguna cosa así. O q el build se haga automatico al subir el git en un server o algo así.

    - No entiendo lo q implica esta sección
        How to specify format imports - https://yonatankra.com/how-to-use-the-new-ecmascript-module-in-typescript/
/* + QUESTIONS */


/* + TO-DO */ /*
    Interfaces
    Enums
    Namespaces
    Generics
    Abstract classes
    Data modifiers
    Optionals
    Function overloading
    Decorators
    Type utils
    readonly keyword
    ! Duck Principle
        In TypeScript because we really want it to be easy for JavaScript developers with a minimum cognitive overload, types are structural. This means that duck typing is a first class language construct.
    Mixins
    .d.ts
        Better way to type functions inside these files.
    /// <reference path=""> File References
    Ambient
    Treeshaking and Bundling
    sourceMaps what are they


    Preformatear testing
    Helps Documenting
    'tooling' google fullmeaing
    futuro del tipado de lenguajes
    dev error checking, entender sus limites correctamente
    Transpiled by default to target JS Ver
    Type
    Mutacion
    Docu
    Control null, undefined, NaN, etc
    ----showConfig add this flag to the building it could help to confirm the tsc cfg each time is run
    http://typescript-react-primer.loyc.net/minification.html

    ! No se si se vuelve una contradiccion q este usando la version "estable" de TS pero activando tood lo q pueda de la ultima nightly ver con cosas como NodeNext
/* + TO-DO */


/* + SOURCES */ /*
    - Fireship - TypeScript - The Basics
        https://www.youtube.com/watch?v=ahCwqrYpIuM

    - How we employed the new ecmascript module support in TypeScript
        https://yonatankra.com/how-to-use-the-new-ecmascript-module-in-typescript/

    - TypeScript: TSConfig Reference
        https://www.typescriptlang.org/tsconfig
/* + SOURCES */
