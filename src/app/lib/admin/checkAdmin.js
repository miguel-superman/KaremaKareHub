import {
    doc,
    getDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";


export async function checkAdmin(uid){


    if(!uid){
        return false;
    }


    const ref =
        doc(
            db,
            "user",
            uid
        );


    const snap =
        await getDoc(ref);



    if(!snap.exists()){

        return false;

    }



    return snap.data().role === "admin";


}