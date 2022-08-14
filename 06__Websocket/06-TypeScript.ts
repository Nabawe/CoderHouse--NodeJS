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
    + AUXILIO
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
        // This is to exclude  JS search results
            // ? Ver si se tambien excluye .mjs

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

    npx tsc --init --rootDir src --outDir dist --target ES2022 --module NodeNext --strict --allowJs --allowSyntheticDefaultImports --esModuleInterop --experimentalDecorators --forceConsistentCasingInFileNames --noEmit --noFallthroughCasesInSwitch --removeComments --resolveJsonModule --skipLibCheck --lib ES2022,DOM

    "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist",
        "target": "ES2022",
        "module": "NodeNext",           // Enables TSC Modules Support

        "strict": true,                 // to deepdive and learn proper

        "allowJs": true,                // In case some lib uses JS
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "experimentalDecorators": true, // enables extra features to type Classes
        "forceConsistentCasingInFileNames": true,
        "noEmit": true,                 // Do not emit compiler output files like JavaScript source code, source-maps or declarations.
        "noFallthroughCasesInSwitch": true, // Ensures switch cases end on a break or return
        "removeComments": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,           // Skip type checking all .d.ts files

        "lib": [ "dom", "es2022" ],     // * adds typings for specific environments, improves intellisense a lot
    }

    ?
        files
        useDefineForClassFields
        path
        baseUrl
        noEmit

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
/* + tsconfig.json */


/* + Deployment Templates */ /*
    - NodeJS
        npm i -g nodemon @types/node ts-node
        npm init -y
        [volta pin node]
        npm i -D typescript
        npx tsc --init --rootDir src --outDir dist --strict --esModuleInterop --resolveJsonModule --removeComments --forceConsistentCasingInFileNames --skipLibCheck --target ES2022 --module NodeNext --lib ES2022,DOM
        */
        // package.json
        //     "type": "module",
        //     "scripts": {
        //          "start": "npm run dev",
        //          "build": "tsc -p .",
        //          "dev": "nodemon --watch \"src/**/*.ts\" --exec \"ts-node\" --esm --transpile-only src/index.ts"
        //     },
        /*
        if tsc --importHelpers is being used then npm i -D tslib

    - ReactJS
        https://parceljs.org/recipes/react

        · npm init -y
        · [volta pin node]
        · npm i -D parcel
            There are somebugs if used globally and the sollutions didn't look promising.

        · npm i react react-dom
        · npm i -D @types/react @types/react-dom
        · Material UI
            https://mui.com/material-ui/getting-started/installation/
            npm i @mui/material @emotion/react @emotion/styled
            npm i @mui/icons-material @fontsource/roboto

        ( In Two Lines
            npm i react react-dom @mui/material @emotion/react @emotion/styled @mui/icons-material @fontsource/roboto
            npm i -D @types/react @types/react-dom
        )

        The next article is added to the AUXILIO section, and it might be important to understand:
            https://parceljs.org/features/dependency-resolution/#typescript

            I don't fully understood it, Shouldn't absolute pathing work out of the box? what's that about ambient modules and which things can they fix?
                tsconfig : to map tilde paths to the root directory
                    "baseUrl": ".",
                    "paths": {
                        "~*": ["./*"]
                    }

        edit tsconfig.json
            Check +tsconfig.json section for a base file then mod:

            "allowJs": true,
            "isolatedModules": true,
            "skipLibCheck": true,
            "lib": [
                "DOM",
                "DOM.Iterable",
                "ES2022",
            ],
            "baseUrl": ".",
            "paths": {
                "~*": ["./*"]
            }

            // ? "skipLibCheck": true, should I?
            ? "include": [ "src" ] Should I? or Parcel does this on its self?


        * Re pensar toda la generacion de los archivos iniciales y arreglar los errores q marcan, poner la minima info necesaria y como auto generarlos. Conciderar q npx create-react-app puede ser algo malo ya q parcel soluciona muchisimas cosas a su forma.
            public/
                favicons
                manifest.json


        ! Testear q pasa si no se le especifican a Parcel browserslist y target en package.json, ver si usa la cfg de ESM



        · npx create-react-app my-app-front --template typescript

            needed to run npm audit fix --force coz of packages that came with react or MUI
            nth-check
            react-scripts@2.1.3
                since that broke other things I needed to run the command again
                    which send me to the initial state












        · Create Starter TypeScript React Template
            All these files can be created by issuing:
                npx create-react-app my-app --template typescript

            Recommendation: create them in another folder then copy them into the new project and simplify them.

            · Create src/index.css
                // with out this file things like margin 0 at the most basic level would be missing
                    // ! Confirm
            · Create src/index.tsx
                remove reportWebVitals
            · Create src/App.tsx
            · [ remove all the import React from 'react'; lines ]

        · Create public/index.html
            <body>
                <div id="root"></div>
                <script  type="module" src="../src/index.tsx"></script>
            </body>

        · edit package.json
            "main": "index.js", // ? NO ESTOY SEGURO Q PONER AQUI, si dist/index.js .ts .tsx o q
                // Recordar q todo esta corriengo gracias a Parcel por ende creo q no es importante ya q no estaria usando node . o nodemon posiblmente si deberia ir a dist/index.js a menos q configue react para correr TypeScript
            "type": "module",
            "source": "src/index.html",         // Specifies parcel entry points
            "scripts": {
                "start": "parcel",
                "build": "parcel build"
            },

            Aditionally one can edit the following to configure Parcel transpiler and build targets:
                browserslist
                targets



        · npm start

        ! Parcel TypeScript Limitations - isolatedModules
            * See the following link for a ugly work-arround:
                https://parceljs.org/languages/typescript/#tsc
            https://parceljs.org/languages/typescript/#isolatedmodules
            " Because Parcel processes each file individually, it implicitly enables the isolatedModules option. This means that some TypeScript features like const enum that require cross-file type information to compile will not work. To be warned about usages of these features in your IDE and during type checking, you should enable this option in your tsconfig.json. "

            https://www.typescriptlang.org/tsconfig#isolatedModules
                " other transpilers only operate on a single file at a time, which means they can’t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript’s ts.transpileModule API which is used by some build tools.
                These limitations can cause runtime problems with some TypeScript features like const enums and namespaces. Setting the isolatedModules flag tells TypeScript to warn you if you write certain code that can’t be correctly interpreted by a single-file transpilation process.
                It does not change the behavior of your code, or otherwise change the behavior of TypeScript’s checking and emitting process. "
                    Some examples of code which does not work when isolatedModules is enabled:
                        https://www.typescriptlang.org/tsconfig#exports-of-non-value-identifiers
                        https://www.typescriptlang.org/tsconfig#references-to-const-enum-members
                        https://www.typescriptlang.org/tsconfig#non-module-files
                            This last one could be a problem, it means ALL files should be modules (ie use import or export somewhere).

        ! Parcel TypeScript Limitations - baseUrl paths
            " Parcel does not currently support the baseUrl or paths options in tsconfig.json, which are TypeScript specific resolution extensions. Instead, you may be able to use Parcel's tilde or absolute specifiers to accomplish a similar goal. "
                tilde = ~ resolves to the nearest package.json (package root)
                absolute = / (project root)

        Parcel React Tips
            https://parceljs.org/recipes/react/#tips
            " Avoid class components – Fast Refresh only works with function components (and Hooks).
            Export only React components – If a file exports a mix of React components and other types of values, its state will be reset whenever it changes. To preserve state, only export React components and move other exports to a different file if possible.
            Avoid unnamed default exports – Declaring components using a default exported arrow function will cause state to be reset when it is changed. Use a named function, or assign the arrow function to a variable instead.
            Keep entry components in their own files – Entry components should be in a separate file from the one that calls ReactDOM.render or they will be remounted on every change. "

        http://typescript-react-primer.loyc.net/tutorial-2.html
            " One limitation of Parcel is that it doesn’t perform type checking (your code is translated to JavaScript but type errors are not detected). For small projects, this is not a big problem because Visual Studio Code performs its own type checking. It gives you red squiggly underlines to indicate errors and all errors are listed in the “Problems” pane (press Ctrl+Shift+M to show it). But if you want, you can npm install parcel-plugin-typescript for enhanced TypeScript support including type checking. "
                This might be better for faster development and it could be forced or used by other means when building.

        https://parceljs.org/recipes/react/#jsx
            " Parcel supports JSX automatically when it detects you are using React. If you’re using React 17 or later, it also automatically enables the modern JSX transform, which means you don't even need to import React for JSX to work, as you can see in App.js in the above example. "

        https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#how-to-upgrade-to-the-new-jsx-transform
            " Since the new JSX transform doesn’t require React to be in scope, we’ve also prepared an automated script that will remove the unnecessary imports from your codebase. "

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


    ? Check if this is correct tsconfig:
        "baseURL": "src",               // To use NameSpaces
        "paths": {                      // ! Unique names
            "@nmyApp-nameSpace/*":     ["app/nameSpace/*"],
            "@nmyApp-shared/*":        ["app/shared/deeply/nested/*"],
            "@nmyApp-environments/*":  ["environments/*"],
        },
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
    - Combat JS Weirdness : So you can incrementally upgrade your JavaScript code to TypeScript
    - Equality checks as consecuense of type and Interface ( from TypeScript Deep Dive chapter on Equality )
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
    Decorators
    ! Duck Principle
        In TypeScript because we really want it to be easy for JavaScript developers with a minimum cognitive overload, types are structural. This means that duck typing is a first class language construct.
    Mixins
    .d.ts
        Better way to type functions inside these files.
    /// <reference path=""> File References
    Ambient
    Treeshaking and Bundling
    sourceMaps what are they
    Parece q MUI tiene algunos problemas con typescript revisar https://mui.com/material-ui/guides/typescript/


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

    https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next
    .eslintrc.cjs
    https://parceljs.org/features/dependency-resolution/#query-parameters

    http://typescript-react-primer.loyc.net/minification.html
        https://parceljs.org/features/production/
            Parcel hace minificacion al correr el build
    */
    // tsconfig.json
        // "include": ["src/**/*.ts"],
        // "exclude": ["node_modules", "**/*.spec.ts"]

    // ! No se si se vuelve una contradiccion q este usando la version "estable" de TS pero activando tood lo q pueda de la ultima nightly ver con cosas como NodeNext
/* + TO-DO */


/* + AUXILIO */ /*
    ! https://parceljs.org/features/dependency-resolution/#typescript
        Esto parece bastante importante pero no se bien como aplicarlo y puede q solucione una buena cantidad de problemas.

    - ts-node-dev
        https://github.com/wclr/ts-node-dev

        Ya q se supone q esto permite transpilacion mucho mas rapida y es como las nuevas herramientas lo estan haciendo.
            Instalar el packete npm i -g esm me parecia un error

        --transpile-only, might void checks in TypeScript only files.
                Preguntar sobre concecuencias negativas

    - https://parceljs.org/recipes/react/#code-splitting

    - https://parceljs.org/features/development/#auto-install

    - https://parceljs.org/features/dependency-resolution/

    - ts-node
        No logre hacerlo de esta forma https://github.com/TypeStrong/ts-node#via-tsconfigjson-recommended

    - Parcel
        La razon por la q no lo use aun es por no poder evaluar q tan fiable es.
        Me interesa mucho la aplicación de compilación accelerada.
        http://typescript-react-primer.loyc.net/tutorial-3.html
        https://parceljs.org/docs/
        https://blog.logrocket.com/sharing-code-react-native-web/#:~:text=Setting%20up%20Parcel,React%20Native%20project%20called%20web%2F%20.

    - tsconfig.json
        https://www.meziantou.net/which-version-of-ecmascript-should-i-use-in-the-typescript-configuration.htm
            " TypeScript supports the configuration inheritance. So, you can create a common tsconfig.json that contains all the settings, and a tsconfig.dev.json that inherits from tsconfig.json. You can build using tsc tsconfig.dev.json. You can read the documentation about configuration inheritance for more information "

    - https://flow.org/

    - https://parceljs.org/recipes/image/#image-optimization
/* + AUXILIO */


/* + SOURCES */ /*
    - Fireship - TypeScript - The Basics
        https://www.youtube.com/watch?v=ahCwqrYpIuM

    - TypeScript Deep Dive by Basarat Ali Syed
        https://basarat.gitbook.io/typescript/

    - How we employed the new ecmascript module support in TypeScript
        https://yonatankra.com/how-to-use-the-new-ecmascript-module-in-typescript/

    - TypeScript: TSConfig Reference
        https://www.typescriptlang.org/tsconfig

    - https://www.npmjs.com/package/ts-node

    - TypeScript+React Primer
        Esta pagina muestra una forma más moderna de aplicar TypeScript usando parcel
        http://typescript-react-primer.loyc.net/tutorial-3.html
        http://typescript-react-primer.loyc.net/tutorial-2.html

    - Parcel Docs
        https://parceljs.org
        https://parceljs.org/getting-started/webapp/
        https://parceljs.org/recipes/react/
        https://parceljs.org/getting-started/library/

    - Which version of EcmaScript should I use in the TypeScript configuration - Meziantou's blog
        https://www.meziantou.net/which-version-of-ecmascript-should-i-use-in-the-typescript-configuration.htm
/* + SOURCES */
