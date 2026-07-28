import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


export async function getUserRole(uid) {

    if (!uid) return null;


    const ref = doc(
        db,
        "user",
        uid
    );


    const snap = await getDoc(ref);


    if (!snap.exists()) {

        return null;

    }


    return snap.data().role;

}