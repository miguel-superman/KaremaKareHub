// import {
//     createUserWithEmailAndPassword
// } from "firebase/auth";

// import { auth } from "./firebase";

// export async function registerWorker(email, password) {

//     const credential =
//         await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );

//     return credential.user;

// }

import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";

import { auth } from "./firebase";

export async function registerWorker(email, password) {

    const credential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    await sendEmailVerification(
        credential.user
    );

    return credential.user;

}