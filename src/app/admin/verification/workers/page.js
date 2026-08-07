"use client";


import {
useEffect,
useState
}
from "react";


import {
doc,
getDoc
}
from "firebase/firestore";


import {db}
from "../../../lib/firebase/firebase";

import {
    approveWorker,
    rejectWorker
}
from "../../../lib/admin/admin";
import Navbar from "@/app/components/Navbar";

import WorkerHeader from "@/app/components/admin/WorkerHeader";
import ProfileCard from "@/app/components/admin/ProfileCard";
import ProfessionalCard from "@/app/components/admin/ProfessionalCard";
import RatesCard from "@/app/components/admin/RatesCard";
import DocumentsCard from "@/app/components/admin/DocumentsCard";
import ActionPanel from "@/app/components/admin/ActionPanel";
import { useParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";







export default function WorkerReview() {

    // const params = useParams();

    // const searchParams = useSearchParams();
    // const id = searchParams.get("workerId");

    const [id, setId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setId(params.get("workerId"));
    }, []);

    console.log("Loading worker:", id);
    // console.log("Params worker:", params);


const [worker,setWorker]=useState(null);

const [message,setMessage] = useState("");

const [plan, setPlan] = useState("Monthly");

const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);



    useEffect(() => {

        if (!id) return;

        async function load() {

            console.log("Loading worker:", id);

            const ref = doc(
                db,
                "healthcareWorkers",
                id
            );

            const snap = await getDoc(ref);

            if (!snap.exists()) {
                console.log("Worker not found");
                return;
            }

            setWorker({
                id: snap.id,
                ...snap.data()
            });

           const sub =  calculateExpiryDate(plan);
           setSubscriptionExpiry(sub);
        }

        load();

    }, [id]);


    console.log("Worker data:", worker
    );  

    console.log("Worker data params:", id
    );  




    if(!worker){

    return <p>Loading...</p>

    }

    async function handleApprove(){


    await approveWorker(

    worker.id,

    {

        status: "active",

        plan,

        approvedAt: Date.now(),

        expiryDate: calculateExpiryDate(plan)

    }

);


    setMessage(
        "Worker approved successfully"
    );


    }



    async function handleReject(){


        const reason =
        prompt(
        "Reason for rejection?"
        );



        if(!reason) return;



        await rejectWorker(
            worker.id,
            reason
        );


        setMessage(
            "Worker rejected"
        );


    }

    function calculateExpiryDate(plan){

        const date = new Date();

        switch(plan){

            case "Monthly":
                date.setMonth(date.getMonth()+1);
                break;

            case "Quarterly":
                date.setMonth(date.getMonth()+3);
                break;

            case "6 Months":
                date.setMonth(date.getMonth()+6);
                break;

            case "Yearly":
                date.setFullYear(date.getFullYear()+1);
                break;

        }

        return date.getTime();

    }

    function handlePlanChange(e){

        setPlan(e.target.value);

        const newExpiry = calculateExpiryDate(e.target.value);

        setSubscriptionExpiry(newExpiry);

    }




    return (
 <div>


 <Navbar />
 <div className="max-w-5xl bg-gradient-to-b from-emerald-50/50 via-white to-white mx-auto py-10">

        {/* <Navbar /> */}

        <div className="grid lg:grid-cols-3 gap-8 mt-8">

            <div className="lg:col-span-2 space-y-8">

                <ProfileCard worker={worker} />

                <ProfessionalCard worker={worker} />

                <RatesCard worker={worker} />

                <DocumentsCard worker={worker} />

            </div>

            <div className="bg-white rounded-3xl border p-6 mt-8">

                <h2 className="text-xl font-bold">

                    Subscription

                </h2>

                <p className="text-gray-500 mt-2">

                    Select how long this healthcare professional should remain active.

                </p>

                <select

                    value={plan}

                    onChange={(e)=>handlePlanChange(e.target.value)}

                    className="mt-5 w-full rounded-xl border p-3"

                >

                    <option>Monthly</option>

                    <option>Quarterly</option>

                    <option>6 Months</option>

                    <option>Yearly</option>

                </select>

            </div>

            <div>

                <ActionPanel worker={worker} subscriptionExpiry={subscriptionExpiry}/>

            </div>

</div>

    </div>
 </div>
    


    );


}