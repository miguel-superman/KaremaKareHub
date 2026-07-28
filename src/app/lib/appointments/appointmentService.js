import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";


// ==============================
// Subscribe to worker appointments
// ==============================


export function subscribeAppointments({

    uid,

    callback

    }){

        const q = query(

            collection(db,"appointments"),

            where("workerId","==",uid),

            orderBy("appointmentDate")

        );

        return onSnapshot(

            q,

            (snapshot)=>{

                const appointments=[];

                snapshot.forEach(doc=>{

                    appointments.push({

                        id:doc.id,

                        ...doc.data()

                        });

                    });

                callback(appointments);

                }

        );

}

// export function subscribeAppointments(workerId, callback) {

//     const q = query(
//         collection(db, "appointments"),
//         where("workerId", "==", workerId),
//         orderBy("appointmentDate", "asc")
//     );

//     return onSnapshot(q, (snapshot) => {

//         const appointments = snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data()
//         }));

//         callback(appointments);

//     });

// }


// ==============================
// Get single appointment
// ==============================

export async function getAppointment(id) {

    const snap = await getDoc(
        doc(db, "appointments", id)
    );

    if (!snap.exists())
        return null;

    return {
        id: snap.id,
        ...snap.data()
    };

}


// ==============================
// Accept appointment
// ==============================

export async function acceptAppointment(id) {

    await updateDoc(
        doc(db, "appointments", id),
        {
            status: "accepted",
            updatedAt: Date.now()
        }
    );

}


// ==============================
// Reject appointment
// ==============================

export async function rejectAppointment(id, reason) {

    await updateDoc(
        doc(db, "appointments", id),
        {
            status: "rejected",
            rejectionReason: reason,
            updatedAt: Date.now()
        }
    );

}


// ==============================
// Complete appointment
// ==============================

export async function completeAppointment(id) {

    await updateDoc(
        doc(db, "appointments", id),
        {
            status: "completed",
            completedAt: Date.now()
        }
    );

}


// ==============================
// Cancel appointment
// ==============================

export async function cancelAppointment(id) {

    await updateDoc(
        doc(db, "appointments", id),
        {
            status: "cancelled",
            updatedAt: Date.now()
        }
    );

}

export async function updateAppointmentStatus(

    appointmentId,

    status

    ){

    await updateDoc(

        doc(db,"appointments",appointmentId),

        {

        status,

        updatedAt:Date.now()

    }

    );

}