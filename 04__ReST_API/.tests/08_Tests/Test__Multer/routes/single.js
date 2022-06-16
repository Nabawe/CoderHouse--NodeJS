import { Router } from "express";
import Multer from 'multer';

const Route_Single = Router();

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

// Route_Single.get( '/single', ( req, res ) => {
//     res.status( 200 ).json( Peeps );
// } );

Route_Single.post( '/single', Uploader.single( 'filePointer' ), ( req, res ) => {
    if ( !req.file )
        return res.status( 400 ).send( new Error( 'Upload Error' ) );

    const content = `
        <pre style='color: hsla(212, 78%, 50%, 1); font-size: large;'>
            \n${JSON.stringify( req.file, null, 4 )}
        </pre>
    `;

    res.status( 200 ).send( `Upload Completed \n${content}` );
} );

export default Route_Single;
