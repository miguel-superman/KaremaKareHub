// import {
//     doc,
//     getDoc
// } from "firebase/firestore";

// import { db } from "./firebase/firebase";

// export async function getWorker(uid){

//     const ref =
//         doc(
//             db,
//             "healthcareWorkers",
//             uid
//         );

//     const snap =
//         await getDoc(ref);

//     if(!snap.exists()){

//         return null;

//     }

//     return{

//         id:snap.id,

//         ...snap.data()

//     };

// }

import {
    doc,
    getDoc
} from "firebase/firestore";

import { db } from "./firebase/firebase";


export async function getWorker(uid){

    if (!uid) {

        console.error(
            "getWorker called without UID"
        );

        return null;

    }


    const ref =
        doc(
            db,
            "healthcareWorkers",
            uid
        );


    const snap =
        await getDoc(ref);


    if(!snap.exists()){

        return null;

    }


    return {

        id:snap.id,

        ...snap.data()

    };

}