import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';


type Props = {
    greeting?: string;
};

export default function App({ greeting="Hello, world!" }: Props) {
    const [qty, setQty] = useState( 0 );

    return (
        <>
            <CssBaseline />
            <p>{ greeting }</p>
            <Button size='large' onClick={ setQty( qty + 1 ) }>
                Button Clicked { qty } times.
            </Button>
        </>
    );
};
