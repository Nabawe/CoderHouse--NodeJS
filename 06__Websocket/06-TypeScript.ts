/*
    + CODEX
    + TERMS

    + Babel
    + tsconfig.json

    + Basic Types
    + Implicit Typing
    + Explicit Typing with :
    + type
    + interface
    + Functions
    + Arrays
    + Generics

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
/* + CODEX */


/* + TERMS */ /*
    - Transpiler
        Source to source compiler. AKAs: source-to-source compiler, transcompiler
/* + TERMS */


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
    "compilerOptions": {
        "lib": [ "dom", "es2017" ],
            // * adds typings for specific environments, improves intellisense a lot
        "strict": true,                 // to deepdive and learn proper
        "target": "esnext",
        "watch": "true",                // transpiles on save
    }
/* + tsconfig.json */


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
    // * For basic things is better to let TS infer it
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


/* + QUESTIONS */ /*
    - what is the "name" of the colon operator in typescript? ( I mean the main operator the : ).
        type operator? typeS operator?

    - VS Code alternative, better squiggly wavy lines for errors

    ! whats .d.ts

    - Still unsure if it is better to leave a space after the type or not asd:string vs asd: string

    - interface
        · Alternative to [ key: string ]: any;
        · For functions, arrays

    - Specifying optional types, parameters with ?
        · How can they be both optional but type checked when specified, example in the +Array section.
/* + QUESTIONS */


/* + TO-DO */ /*
    Interfaces
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
    .d.ts
/* + TO-DO */


/* + SOURCES */ /*
    Fireship - TypeScript - The Basics
        https://www.youtube.com/watch?v=ahCwqrYpIuM
/* + SOURCES */
