// lets do some tests

/* does the comment ommiter work */


/* + interface */ /*
    PascalCase.
    To validate Objects that follow a same structure.
    Parameters, args and return values of a function. */

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

        console.log( person2 );

    // * Se recomienda poner las props arriba y metodos abajo
/* + interface */

// ! CHECK https://levelup.gitconnected.com/how-to-properly-set-up-express-with-typescript-1b52570677c9
