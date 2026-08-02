import { uploadFile } from "../firebase/storage";


export async function uploadWorkerDocument(
    uid,
    type,
    file
){


    if(!file)
        return null;



    const url = await uploadFile(

        file,

        `workerDocuments/${uid}/${type}}`

    );


    return url;


}