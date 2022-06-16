import { Router } from "express";

const Route_Pets = Router();

const Pets = [];

Route_Pets.get( '/pets', ( req, res ) => {
    res.status( 200 ).json( Pets );
} );

Route_Pets.post( '/pets', ( req, res ) => {
    const { name, race, age } = req.body;
    Pets.push( { name, race, age } );
    //res.status( 200 ).json( Pets );
    res.status( 200 ).end();
} );

export default Route_Pets;
