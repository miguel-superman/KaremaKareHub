// "use client";

// import { useEffect, useState } from "react";
// import { auth, db } from "../../lib/firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import PendingDashboard from "./PendingDashboard";
// import ApprovedDashboard from "./ApprovedDashboard";
// import RejectedDashboard from "./RejectedDashboard";

// export default function WorkerDashboard() {
//   const [loading, setLoading] = useState(true);
//   const [worker, setWorker] = useState(null);

//   useEffect(() => {
//     async function loadWorker() {
//       const user = auth.currentUser;

//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const ref = doc(db, "healthcareWorkers", user.uid);
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setWorker(snap.data());
//       }

//       setLoading(false);
//     }

//     loadWorker();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!worker) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Worker profile not found.
//       </div>
//     );
//   }

//   const status = worker.verification?.status || "pending";

//   if (status === "Aproved") {
//     return <ApprovedDashboard worker={worker} />;
//   }

//   if (status === "Rejected") {
//     return <RejectedDashboard worker={worker} />;
//   }

//   return <PendingDashboard worker={worker} />;
// }

// "use client";

// import { useEffect, useState } from "react";
// import { auth, db } from "../../lib/firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";

// import PendingDashboard from "./PendingDashboard";
// import ApprovedDashboard from "./ApprovedDashboard";
// import RejectedDashboard from "./RejectedDashboard";


// export default function WorkerDashboard() {


//     const router = useRouter();


//     const [loading, setLoading] = useState(true);

//     const [worker, setWorker] = useState(null);



//     useEffect(() => {


//         async function loadWorker() {


//             const user = auth.currentUser;

//             const now = Date.now();



//             if (!user) {

//                 setLoading(false);

//                 return;

//             }



//             const ref = doc(
//                 db,
//                 "healthcareWorkers",
//                 user.uid
//             );


//             const snap = await getDoc(ref);



//             if (snap.exists()) {


//                 const workerData = {

//                     id:snap.id,

//                     ...snap.data()

//                 };


//                 setWorker(workerData);



//                 // Check subscription expiry

//                 const expiry =
//                     workerData.subscriptionExpiry;



//                 if (
//                     expiry &&
//                     expiry < now
//                 ) {


//                     router.push(
//                         `/dashboard/subscription/renewal?workerId=${workerData.id}`
//                     );


//                     return;

//                 }



//             }



//             setLoading(false);


//         }


//         loadWorker();


//     }, [router]);



//     if (loading) {

//         return (

//             <div className="min-h-screen flex items-center justify-center">

//                 Loading dashboard...

//             </div>

//         );

//     }



//     if (!worker) {

//         return (

//             <div className="min-h-screen flex items-center justify-center">

//                 Worker profile not found.

//             </div>

//         );

//     }



//     const status =
//         worker.verification?.status || "pending";



//     if (status === "Approved") {

//         return (

//             <ApprovedDashboard
//                 worker={worker}
//             />

//         );

//     }



//     if (status === "Rejected") {

//         return (

//             <RejectedDashboard
//                 worker={worker}
//             />

//         );

//     }



//     return (

//         <PendingDashboard
//             worker={worker}
//         />

//     );


// }

"use client";

import { useEffect, useState } from "react";

import { auth, db } from "../../lib/firebase/firebase";

import {
    doc,
    getDoc
} from "firebase/firestore";

import {
    onAuthStateChanged
} from "firebase/auth";

import { useRouter } from "next/navigation";

import PendingDashboard from "./PendingDashboard";
import ApprovedDashboard from "./ApprovedDashboard";
import RejectedDashboard from "./RejectedDashboard";


export default function WorkerDashboard() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [worker, setWorker] = useState(null);


    useEffect(() => {

        let unsubscribe;

        unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {

                try {

                    // ==========================================
                    // USER NOT SIGNED IN
                    // ==========================================

                    if (!user) {

                        setWorker(null);
                        setLoading(false);

                        return;
                    }


                    console.log(
                        "Authenticated worker UID:",
                        user.uid
                    );


                    // ==========================================
                    // GET WORKER PROFILE
                    // ==========================================

                    const ref = doc(
                        db,
                        "healthcareWorkers",
                        user.uid
                    );


                    const snap = await getDoc(ref);


                    console.log(
                        "Worker document exists:",
                        snap.exists()
                    );


                    if (!snap.exists()) {

                        console.error(
                            "Worker profile not found for UID:",
                            user.uid
                        );

                        setWorker(null);
                        setLoading(false);

                        return;
                    }


                    // ==========================================
                    // WORKER DATA
                    // ==========================================

                    const workerData = {

                        id: snap.id,

                        ...snap.data()

                    };


                    console.log(
                        "Worker profile loaded:",
                        workerData
                    );


                    setWorker(workerData);


                    // ==========================================
                    // SUBSCRIPTION EXPIRY
                    // ==========================================

                    const expiry =
                        workerData.subscriptionExpiry;


                    if (expiry) {

                        let expiryTime;


                        // Firestore Timestamp

                        if (
                            typeof expiry.toMillis === "function"
                        ) {

                            expiryTime =
                                expiry.toMillis();

                        }

                        // JavaScript Date

                        else if (
                            expiry instanceof Date
                        ) {

                            expiryTime =
                                expiry.getTime();

                        }

                        // Number

                        else if (
                            typeof expiry === "number"
                        ) {

                            expiryTime =
                                expiry;

                        }


                        if (
                            expiryTime &&
                            expiryTime < Date.now()
                        ) {

                            router.push(
                                `/dashboard/subscription/renewal?workerId=${workerData.id}`
                            );

                            return;
                        }

                    }


                    setLoading(false);

                }

                catch (error) {

                    console.error(
                        "Error loading worker:",
                        error
                    );

                    setWorker(null);
                    setLoading(false);

                }

            }
        );


        return () => {

            if (unsubscribe) {
                unsubscribe();
            }

        };

    }, [router]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading dashboard...

            </div>

        );

    }


    // ==========================================
    // NO WORKER
    // ==========================================

    if (!worker) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Worker profile not found.

            </div>

        );

    }


    // ==========================================
    // VERIFICATION STATUS
    // ==========================================

    const status =
        worker.verification?.status || "pending";


    // ==========================================
    // APPROVED
    // ==========================================

    if (status === "Approved") {

        return (

            <ApprovedDashboard
                worker={worker}
            />

        );

    }


    // ==========================================
    // REJECTED
    // ==========================================

    if (status === "Rejected") {

        return (

            <RejectedDashboard
                worker={worker}
            />

        );

    }


    // ==========================================
    // PENDING
    // ==========================================

    return (

        <PendingDashboard
            worker={worker}
        />

    );

}