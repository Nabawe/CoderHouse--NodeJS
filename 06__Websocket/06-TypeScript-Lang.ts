/*
    + CODEX
    + TERMS

    + Mantras

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
        · TS    = TypeScript
        · JS    = JavaScript
        · TSC   = TypeScript Compiler
        · RN    = React Native
/* + CODEX */


/* + TERMS */ /*
    - Transpiler
        Source to source compiler. AKAs: source-to-source compiler, transcompiler
/* + TERMS */


/* + Mantras */ /*
    " you can incrementally upgrade your JavaScript code to TypeScript "

    " Type errors do not prevent JavaScript emit. To make it easy for you to migrate your JavaScript code to TypeScript, even if there are compilation errors, by default TypeScript will emit valid JavaScript the best that it can. "
/* + Mantras */


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

    - Still unsure if it is better to leave a space after the type or not asd:string vs asd: string

    - interface
        · Alternative to [ key: string ]: any;
        · For functions, arrays

    - Specifying optional types, parameters with ?
        · How can they be both optional but type checked when specified, example in the +Array section.

    - Namespaces
        · Do the use of Namespaces have a big negative impact once transpiled into JS? Since they are turned into a mess of functions or objects.
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

    // ! No se si se vuelve una contradiccion q este usando la version "estable" de TS pero activando tood lo q pueda de la ultima nightly ver con cosas como NodeNext
/* + TO-DO */


/* + AUXILIO */ /*
/* + AUXILIO */


/* + SOURCES */ /*
    - Fireship - TypeScript - The Basics
        https://www.youtube.com/watch?v=ahCwqrYpIuM

    - TypeScript Deep Dive by Basarat Ali Syed
        https://basarat.gitbook.io/typescript/
/* + SOURCES */
