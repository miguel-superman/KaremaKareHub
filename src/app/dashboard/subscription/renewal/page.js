"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase";

import {
    CreditCard,
    Calendar,
    Mail,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useSearchParams } from "next/navigation";

export default function SubscriptionPage(){

    // const { user } = useAuth();

    // const params = useParams();

    // const searchParams = useSearchParams();
    // const workerId = searchParams.get("workerId");

     const [workerId, setWorkerId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setWorkerId(params.get("workerId"));
    }, []);

    

    

    const [worker,setWorker]=useState(null);
    

    useEffect(()=>{

        if(!workerId) return;

        async function load(){

            const snap = await getDoc(
                doc(
                    db,
                    "healthcareWorkers",
                    workerId
                )
            );

            if(snap.exists()){

                setWorker(snap.data());
                // return;

            }

        }

        load();

    },[workerId]);

    if(!worker){

        return <div className="p-10">Loading...</div>;

    }

    const expiry =
        worker.subscriptionExpiry
            ? new Date(worker.subscriptionExpiry)
            : null;

    const expired =
        expiry
            ? expiry < new Date()
            : true;

    return(

        <>
            <Navbar />
            <div className="max-w-3xl mx-auto bg-gradient-to-b from-emerald-50/50 via-white to-white p-8">

                <h1 className="text-3xl font-bold">

                    Subscription

                </h1>

                <div className="bg-white rounded-3xl shadow mt-8 p-8">

                    <div className="flex items-center gap-4">

                        {

                        expired ?

                        <AlertTriangle
                            className="text-red-500"
                            size={42}
                        />

                        :

                        <CheckCircle
                            className="text-green-500"
                            size={42}
                        />

                        }

                        <div>

                            <h2 className="text-2xl font-bold">

                                {

                                expired ?

                                "Subscription Expired"

                                :

                                "Subscription Active"

                                }

                            </h2>

                            <p className="text-gray-500">

                                Expiry Date:

                                {

                                expiry ?

                                " " + expiry.toLocaleDateString()

                                :

                                " Not Set"

                                }

                            </p>

                        </div>

                    </div>

                </div>

                {

                expired &&

                <div className="bg-red-50 border border-red-200 rounded-3xl mt-8 p-8">

                    <h2 className="font-bold text-xl">

                        Renew Your Subscription

                    </h2>

                    <p className="mt-4 text-gray-600">

                        Your subscription has expired.

                        To continue receiving appointments and messages,

                        please renew your subscription.

                    </p>

                    <div className="mt-8 space-y-5">

                        <div className="flex gap-4">

                            <CreditCard className="text-emerald-600"/>

                            <div>

                                <h3 className="font-semibold">

                                    Step 1

                                </h3>

                                <p>

                                    Make your subscription payment using your preferred payment method.

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Mail className="text-emerald-600"/>

                            <div>

                                <h3 className="font-semibold">

                                    Step 2

                                </h3>

                                <p>

                                    Email your proof of payment to:

                                </p>

                                <p className="font-bold text-emerald-700">

                                    subscriptions@careconnect.com

                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Calendar className="text-emerald-600"/>

                            <div>

                                <h3 className="font-semibold">

                                    Step 3

                                </h3>

                                <p>

                                    Once verified, an administrator will activate your subscription and update your expiry date.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                }

            </div>
        
        </>


    );

}