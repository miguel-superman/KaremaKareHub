"use client";

import { useState } from "react";
import { X, Upload, Mail, Calendar } from "lucide-react";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import { db } from "@/app/lib/firebase/firebase";

export default function RenewSubscriptionModal({

    worker,
    onClose

}) {

    const [reference,setReference]=useState("");
    const [loading,setLoading]=useState(false);

    async function submitRenewal(){

        setLoading(true);

        await updateDoc(

            doc(
                db,
                "healthcareWorkers",
                worker.uid
            ),

            {

                subscriptionRenewalRequest:{

                    status:"pending",

                    paymentReference:reference,

                    requestedAt:Date.now()

                }

            }

        );

        setLoading(false);

        alert(
            "Renewal request submitted."
        );

        onClose();

    }

    return(

        <div className="
            fixed inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
            "
        >

            <div className="
            bg-white
            rounded-3xl
            p-8
            max-w-lg
            w-full
            ">

                <div className="flex justify-between">

                    <h2 className="text-2xl font-bold">

                        Renew Subscription

                    </h2>

                    <button onClick={onClose}>

                        <X/>

                    </button>

                </div>

                <div className="mt-6 space-y-5">

                    <div className="rounded-xl bg-amber-50 p-5">

                        <div className="flex gap-3">

                            <Calendar className="text-amber-600"/>

                            <div>

                                <p className="font-semibold">

                                    Subscription Expired

                                </p>

                                <p className="text-sm text-gray-600">

                                    {worker.subscriptionExpiryDate}

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-xl bg-blue-50 p-5">

                        <div className="flex gap-3">

                            <Mail className="text-blue-600"/>

                            <div>

                                <p className="font-semibold">

                                    Email proof of payment

                                </p>

                                <p>

                                    payments@careconnect.com

                                </p>

                            </div>

                        </div>

                    </div>

                    <div>

                        <label className="font-medium">

                            Payment Reference

                        </label>

                        <input

                            className="w-full mt-2 border rounded-xl p-3"

                            placeholder="Bank reference or transaction number"

                            value={reference}

                            onChange={(e)=>setReference(e.target.value)}

                        />

                    </div>

                    <div className="rounded-xl border p-4 bg-gray-50">

                        <div className="flex items-center gap-2">

                            <Upload size={18}/>

                            <span className="font-medium">

                                Proof of Payment

                            </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">

                            Email your bank receipt or transfer confirmation to

                        </p>

                        <p className="font-semibold">

                            payments@careconnect.com
                        </p>

                    </div>

                </div>

                <div className="flex justify-end gap-3 mt-8">

                    <button

                        onClick={onClose}

                        className="border px-5 py-3 rounded-xl"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={submitRenewal}

                        disabled={loading}

                        className="bg-emerald-600 text-white px-5 py-3 rounded-xl"

                    >

                        {loading ? "Submitting..." : "Submit Renewal"}

                    </button>

                </div>

            </div>

        </div>

    );

}