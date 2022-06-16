import { Router } from "express";
import Multer from 'multer';

const Route_Multy = Router();

const Storage = Multer.diskStorage( {
    destination: ( req, file, cb ) => {
        cb( null, './uploads' );
    },
    filename: ( req, file, cb ) => {
        // console.log( 'File Data : ', file );
        const filename = `${Date.now()} - ${file.originalname}`;
        cb( null, filename );
    }
} );
const Uploader = Multer( { storage: Storage } );

// Route_Multy.get( '/multy', ( req, res ) => {
//     res.status( 200 ).json( Peeps );
// } );

Route_Multy.post( '/multy', Uploader.array( 'filesArrayPointer', 10 ), ( req, res ) => {
    if ( !req.files )
        return res.status( 400 ).send( new Error( 'Upload Error' ) );

    const content = `
        <pre style='color: hsla(212, 78%, 50%, 1); font-size: large;'>
            \n${JSON.stringify( req.files, null, 4 )}
        </pre>
    `;

    res.status( 200 ).send( `Upload Completed \n${content}` );
} );

export default Route_Multy;

