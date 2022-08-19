import React, { useState } from 'react'
import { Button, CssBaseline } from '@mui/material';
// import './App.css';


type Props = {
    greeting?: string;
};

function App( { greeting="Hello, world!", asd }: Props ) {

    const [qty, setQty] = useState( 0 );

    return (
        <>
            <CssBaseline />
            <p>{ greeting }</p>
            <Button
                variant='outlined'
                size='large'
                onClick={ () => { setQty( qty + 1 ) } }
            >
                Button Clicked { qty } times.
            </Button>
        </>
    );
}

export default App;
