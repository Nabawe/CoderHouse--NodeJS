/*
    + CODEX
    + TERMS

    + Mantras

    + Primitive Types
    + Implicit Typing
    + Explicit Typing with :
    + Arrays
    + type
    + interface
    + Inline Type Annotation
    + Functions
    + Classes
    + Declaration Spaces
    + Namespaces
    + Generics
    + Modules
    + Declaration Files .d.ts and .ts

    + Last Words
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


/* + Primitive Types */ /*
    Basic from JavaScript: Boolean, Null, Number, Object, String, Undefined
    AND
    Special added by TypeScript: any, never, uknown, void

    - any
        Mostly used when determining the type of a expression becomes too complicated or irrelevant. Assigning the "any" type will have the effect of turning type checking for that expression off.
        " any is compatible with any and all types in the type system. This means that anything can be assigned to it and it can be assigned to anything. " - TypeScrip Deep Dive, Basarat
        WIP Try to list good practice escenarios.

    WIP INCOMPLETE DEFINITIONS AND USABILITY strictNullChecks, null, undefined, never, uknown

    - void
        To specify that a function does not have a return type.
        " https://www.typescriptlang.org/docs/handbook/2/functions.html#void
            It’s the inferred type any time a function doesn’t have any return statements, or doesn’t return any explicit value from those return statements.
            In JavaScript, a function that doesn’t return any value will implicitly return the value undefined. However, void and undefined are not the same thing in TypeScript.
        "
            Additional Clarification at https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void

        function ASD( msg ): void {
            console.log( msg );
        };
/* + Primitive Types */


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

    * Def " Anything that is available in the Type Declaration Space can be used as a Type Annotation " - TypeScrip Deep Dive, Basarat
        Def of Type Declaration Space is soon below. This was just a formal statement.
/* + Explicit Typing with : */


/* + Arrays */ /*
    Sufix [] to the type annotation.
        const arry0: Number[] = [ 1, 2 ];
        arry0.push( 'asd' );    // Error
        arry0.push( 912 );

    In Python tuples are fixed sized Arrays.
    The ? is to make the value optional, but the type is still being checked. But it seams that "pushing a value" is not checked in Tuples.

    type MyTuple1 = [ number, string?, boolean? ];
    const arry1: MyTuple1 = [ 1, 123, 'asd' ];

    arry1.push(1);
    arry1.push('44');
    arry1.push(false);

    type MyTuple2 = [ number, string, boolean ];
    const arry2: MyTuple2 = [ 1, 'asd', true ];
/* + Arrays */


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
    Is common practise to sort properties first and then methods.
    ? Parameters, args and return values of a function.

    // - Objects
        interface Person {
            first: string;
            last: string;
            [ key: string ]: any;
                // ? So that 'fast' does not produce a TS error, but this surely limits existence checks.
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

    * Def " Interfaces are the core way in TypeScript to compose multiple type annotations into a single named annotation " - TypeScrip Deep Dive, Basarat
/* + interface */


/* + Inline Type Annotation */ /*
    Are specified by the structure :{ TypeAnnotation }
    For one offs, saving the need of specifying a name to the Types Annotations (in other words to consume a slot in the Type Declaration Space).
    On the other hand defining Interfaces and other annotations can be useful to spot repeating patterns and help remembering them by having a proper name.

    const myConstruct: {
        first: string;
        second: string;
        third: string;
    } = {
        first: 'asd',
        second: 'asd',
        third: 'asd',
    };

    let myConstruct2: {
        first: string;
        second: string;
        third: string;
    };

    myConstruct2 = {
        first: 'asd',
        second: 'asd',
        third: 'asd',
    };
/* + Inline Type Annotation */


/* + Functions */ /*
    In this particular case the return type could most proably be infered until they add ** operand to strings xD.

    function Pow( x:number, y:number ): number {
        return x ** y;
    };

    Pow( 5, 2);
/* + Functions */


/* + Classes */ /*
    class Foo {
        x: number;
        constructor( x: number ) {
            this.x = x;
        };
    };

    //  is Equivalent to

    class TwinFoo {
        constructor ( public x: number ) {

        };
    };

    /* The short hand is adding access modifiers (public, private, etc) in the constructor. */
    /* The type specification before the Constructor is still relevant since using a constructor is optional. */

    // !WIP Ver si esta info esta actualizada o si hay una forma mejor de hacerlo
    // ? Abstract Modifier
    /* ? Ver como se convinan los access modifiers public, private, protected con # ; ya q TS access modifiers supuestamente HACEN NADA en JS y JS ya tiene la funcionalidad, en especial ver si private se traduce a # */
/* + Classes */


/* + Declaration Spaces */ /*
    A scope space is shared between Types and Variables Declarations.

    - Type Declaration Space
        When using a Type definition the name it was asigned gets reserved in a scope:
            interface Bar {};
            type Bas = {};

        one could do:
            let foo: Bas;
        but coult NOT do:
            let bar = Bar;

    - Variable Declaration Space
        It's populated by each declared variable:
            let meVar = 1;

        and they can not be used as Types:
            let newVar: meVar;

    - Classes
        A Class Definition is both:
            class Cool {
                constructor ( public x: number ) {
                    this.x = x;
                }
            };
            class Scrool {
                constructor ( public x: string ) {
                    this.x = x;
                }
            };
            let Miau: Cool;
            let Mia = Cool;
            const iMia = new Cool( 2 );
            Miau = new Cool( 4 ); // OK
            Miau = new Scrool( '4' ); // Error: Type 'Scrool' is not assignable to type 'Cool'.

    WIP improve this section, list all known Type, Variable Spaces and other special cases like Classes
/* + Declaration Spaces */


/* + Namespaces */ /*
    File Modules cover most of this functionality but " the pattern is still useful for logical grouping of a bunch of functions " - TypeScrip Deep Dive

    JS does not have Namespaces.
    Use ; to separate members.
    export to publish.
    Whats not exported becomes a private member.

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


    ? Check if this is correct: tsconfig:
        "baseURL": "src",               // To use NameSpaces
        "paths": {                      // ! Unique names
            "@nmyApp-nameSpace/*":     ["app/nameSpace/*"],
            "@nmyApp-shared/*":        ["app/shared/deeply/nested/*"],
            "@nmyApp-environments/*":  ["environments/*"],
        },
/* + Namespaces */


/* + Generics */ /*
    Generics add "Variable Typing", ie a way to specify types the moment it is going to being to be used.
    <  > Syntax

    Add Examples with functions, interfaces */

    interface Wrinkly<T extends { name: String }> {
        id: number;
        author: string;
        data: T
    }

    const FallOfNumenor: Wrinkly<{ name: String, FstParagraph: string }> = {
        id: 123,
        author: 'J.R.R. Tolkien',
        data: {
            name: 'Fall of Númenor',
            FstParagraph: 'Lorem Ipsum'
        }
    }

    console.log( FallOfNumenor );

/* + Generics */


/* + Modules */ /*
    One can export or import types just like any variable:
        export type SomeType = {
            blue: String;
        };
    OR
        let myVar = 123;
        type mewType = {
            green: String;
        };
        export {
            myVar,
            mewType
        };

    - tsconfig.json:
        "target":,
        "module":,

    - Overturning dynamic lookup just for types
        https://basarat.gitbook.io/typescript/project/modules/external-modules#overturning-dynamic-lookup-just-for-types
        You can declare a module globally for your project by using declare module 'somePath' and then imports will resolve magically to that path

        // global.d.ts
            declare module 'foo' {
                // Some variable declarations
                export var bar: number; // sample
            }

        and then:

        // anyOtherTsFileInYourProject.ts
            import * as foo from 'foo';
            // TypeScript assumes (without doing any lookup) that
            // foo is {bar:number}

    - Use case: Ensure Import
        https://basarat.gitbook.io/typescript/project/modules/external-modules#use-case-ensure-import
        Sometimes you want to load a file just for the side effect (e.g. the module might register itself with some library like CodeMirror addons etc.). However, if you just do a import/require the transpiled JavaScript will not contain a dependency on the module and your module loader (e.g. webpack) might completely ignore the import. In such cases you can use a ensureImport variable to ensure that the compiled JavaScript takes a dependency on the module e.g.:
            ( FF: This is because if something isn't used after it goes thru Webpack it gets removed )
        import foo = require('./foo');
        import bar = require('./bar');
        import bas = require('./bas');
        const ensureImport: any =
            foo
            && bar
            && bas;
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


/* + Last Words */ /*
    Some general conciderations
        https://basarat.gitbook.io/typescript/recap
        Equality
        References
        Null vs. Undefined
            Something hasn't been initialized : undefined.
            Something is currently unavailable: null.
            if ( localVar != null ) // localVar is not null or undefined, mind is != and not !==
            if ( typeof someGlobal !== 'undefined' ) doSomething ;
        this
        Closure
        Number
            Number.isSafeInterger( num )
                - To check if num could be subject to binary to decimal rounding errors.
                ! " Whenever you use math for financial calculations use a library like big.js"
                ! " Do not use this lib for math used for UI or performance intensive purposes, charts, canvas, etc"
                    I understand that JS already has incorporated this but a specialized lib my do the job better.
                - Use Number.isNaN( var ) to check if var is of type Number and NaN.
                - Use isNan( var ) to check if var coerces to NaN. It checks if var is not a number, so it could very well be any String, etc.
                * " Further intuition: Just like values bigger than Number.MAX_VALUE get clamped to INFINITY, values smaller than Number.MIN_VALUE get clamped to 0. "
        Truthy
/* + Last Words */


/* + Pros */ /*
    - Customized intellisense thru lib key in tsconfig.json
    - Combat JS Weirdness : So you can incrementally upgrade your JavaScript code to TypeScript
    - Equality checks as consecuense of type and Interface ( from TypeScript Deep Dive chapter on Equality )
/* + Pros */


/* + QUESTIONS */ /*
    - What's the "name" of the colon operator in typescript? ( I mean the main operator the : ).
        type operator? typeS operator?

    - Still unsure if it is better to leave a space after the type or not asd:string vs asd: string

    - Declaration Spaces
        · Does Class Typing work by inference?

    - Interface
        · Alternative to [ key: string ]: any;
        · For functions, arrays

    - Specifying optional types, parameters with ?
        · How can they be both optional but type checked when specified, example in the +Array section.

    - Namespaces
        · Do the use of Namespaces have a big negative impact once transpiled into JS? Since they are turned into a mess of functions or objects.
            If I understood correctly it gets transpiled to an annonymus function that aggregates to an object.
        · Are all Namespaces global? Can we define scopes to them? ( Not by nesting a NS whiting a NS ).

    - Modules
        · " https://basarat.gitbook.io/typescript/project/modules/external-modules
            Import a file only for its side effect with a single import statement:
                import 'core-js'; // a common polyfill library
        "
                What does "for its side effect" mean?
        · https://basarat.gitbook.io/typescript/project/modules/external-modules#use-case-lazy-loading
            I believe it is based on the previous section BUT the code is common JS then if so the modules are always loaded since no transpilation occurred.
        · https://basarat.gitbook.io/typescript/project/modules/external-modules#use-case-breaking-circular-dependencies

    - Classes
        · Property Initialization outside Class Constructor.
            How reliable is it?; Is it still implemented?; Has this been implemented in JS?
/* + QUESTIONS */


/* + TO-DO */ /*
    Interfaces
    Enums
    Generics
    Abstract classes
    Data modifiers
    Optionals
    Function overloading
    Class Decorators
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
