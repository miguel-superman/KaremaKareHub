import {
    collection,
    query,
    where,
    getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getDashboardStats(workerId) {

    const today = new Date();

    const todayString =
        `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    // Appointments Today
    const appointmentsTodayQuery = query(
        collection(db, "appointments"),
        where("workerId", "==", workerId),
        where("appointmentDate", "==", todayString)
    );

    // Pending Appointments
    const pendingQuery = query(
        collection(db, "appointments"),
        where("workerId", "==", workerId),
        where("status", "==", "Pending")
    );

    // Conversations
    const conversationsQuery = query(
        collection(db, "conversations"),
        where("workerId", "==", workerId)
    );

    const [
        appointmentsSnap,
        pendingSnap,
        conversationsSnap
    ] = await Promise.all([
        getDocs(appointmentsTodayQuery),
        getDocs(pendingQuery),
        getDocs(conversationsQuery)
    ]);

    let unread = 0;

    conversationsSnap.forEach(doc => {

        unread += doc.data().unreadCount || 0;

    });

    return {

        appointmentsToday: appointmentsSnap.size,

        pendingAppointments: pendingSnap.size,

        unreadMessages: unread

    };

}