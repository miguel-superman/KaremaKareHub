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

"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import PendingDashboard from "./PendingDashboard";
import ApprovedDashboard from "./ApprovedDashboard";
import RejectedDashboard from "./RejectedDashboard";


export default function WorkerDashboard() {


    const router = useRouter();


    const [loading, setLoading] = useState(true);

    const [worker, setWorker] = useState(null);



    useEffect(() => {


        async function loadWorker() {


            const user = auth.currentUser;

            const now = Date.now();



            if (!user) {

                setLoading(false);

                return;

            }



            const ref = doc(
                db,
                "healthcareWorkers",
                user.uid
            );


            const snap = await getDoc(ref);



            if (snap.exists()) {


                const workerData = {

                    id:snap.id,

                    ...snap.data()

                };


                setWorker(workerData);



                // Check subscription expiry

                const expiry =
                    workerData.subscriptionExpiry;



                if (
                    expiry &&
                    expiry < now
                ) {


                    router.push(
                        `/dashboard/subscription/renewal?workerId=${workerData.id}`
                    );


                    return;

                }



            }



            setLoading(false);


        }


        loadWorker();


    }, [router]);



    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Loading dashboard...

            </div>

        );

    }



    if (!worker) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                Worker profile not found.

            </div>

        );

    }



    const status =
        worker.verification?.status || "pending";



    if (status === "Approved") {

        return (

            <ApprovedDashboard
                worker={worker}
            />

        );

    }



    if (status === "Rejected") {

        return (

            <RejectedDashboard
                worker={worker}
            />

        );

    }



    return (

        <PendingDashboard
            worker={worker}
        />

    );


}