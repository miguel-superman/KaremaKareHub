// import admin from 'firebase-admin';

// let initialized = false;

// export function getFirebaseAdmin() {
//   if (initialized) return admin;

//   const projectId = process.env.FIREBASE_PROJECT_ID;
//   const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
//   const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

//   if (!projectId || !clientEmail || !privateKey) {
//     throw new Error('Firebase Admin credentials are not configured');
//   }

//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId,
//         clientEmail,
//         privateKey,
//       }),
//       storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     });
//   }

//   initialized = true;
//   return admin;
// }

// export function isAdminConfigured() {
//   return Boolean(
//     process.env.FIREBASE_PROJECT_ID &&
//     process.env.FIREBASE_CLIENT_EMAIL &&
//     process.env.FIREBASE_PRIVATE_KEY
//   );
// }

// export function getAdminEmails() {
//   return (process.env.ADMIN_EMAILS || '')
//     .split(',')
//     .map((e) => e.trim().toLowerCase())
//     .filter(Boolean);
// }

import {
    doc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase/firebase";



export async function approveWorker(workerId){


    const workerRef =
        doc(
            db,
            "healthcareWorkers",
            workerId
        );


    await updateDoc(
        workerRef,
        {

            "verification.status":
                "approved",

            "verification.reviewedAt":
                serverTimestamp(),

            "verification.rejectionReason":
                null,

            status:
                "active",

        }
    );

}





export async function rejectWorker(
    workerId,
    reason
){


    const workerRef =
        doc(
            db,
            "healthcareWorkers",
            workerId
        );



    await updateDoc(

        workerRef,

        {

            "verification.status":
                "rejected",


            "verification.reviewedAt":
                serverTimestamp(),


            "verification.rejectionReason":
                reason,


            status:
                "inactive"

        }

    );


}