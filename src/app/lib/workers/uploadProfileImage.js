import { uploadFile } from "../firebase/storage";


export async function uploadWorkerProfileImage(
    uid,
    file
){


    const url = await uploadFile(

        file,

        `workerDocuments/${uid}/profile-photo`

    );


    return url;


}