import { Router } from "express";

const Route_Peeps = Router();

const Peeps = [];

Route_Peeps.get( '/peeps', ( req, res ) => {
    res.status( 200 ).json( Peeps );
} );

Route_Peeps.post( '/peeps', ( req, res ) => {
    const { name, surname, age } = req.body;
    Peeps.push( { name, surname, age } );
    // res.status( 200 ).json( Peeps );
    res.status( 200 ).end();
} );

export default Route_Peeps;
