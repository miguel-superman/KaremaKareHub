"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    updateDoc
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/firebase";

import Navbar from "@/app/components/Navbar";

import {
    Search,
    Calendar,
    RefreshCw,
    AlertTriangle,
    CheckCircle,
    Clock
} from "lucide-react";
import AdminRenewSubscriptionModal from "@/app/components/admin/AdminRenewSubscriptionModal";

export default function SubscriptionManagementPage(){

    const [workers,setWorkers]=useState([]);

    const [loading,setLoading]=useState(true);

    const [search,setSearch]=useState("");

    const [filter,setFilter]=useState("all");



    useEffect(()=>{

        async function load(){

            

            const q=query(

                collection(
                    db,
                    "healthcareWorkers"
                ),

                // where(
                //     "verification.status",
                //     "==",
                //     "pending"
                //     ),

                //  where("subscriptionExpiry", "<=", now),

                orderBy("subscriptionExpiry")

            );

            const snapshot=await getDocs(q);

            const list=snapshot.docs.map(doc=>({

                id:doc.id,

                ...doc.data()

            }));

            setWorkers(list);

            setLoading(false);

        }

        load();

    },[]);

    const [selectedWorker, setSelectedWorker] = useState(null);

    const [showRenewModal, setShowRenewModal] = useState(false);



    async function handleRenewSubscription(newExpiryDate){

        if(!selectedWorker)
            return;

        await updateDoc(

            doc(
                db,
                "healthcareWorkers",
                selectedWorker.id
            ),

            {

                subscriptionExpiry:
                    new Date(newExpiryDate).getTime(),

                updatedAt:
                    Date.now(),

                subscriptionRenewalRequest:{
                    status:"approved",
                    approvedAt:Date.now()
                }

            }

        );

        setWorkers(previous =>

            previous.map(worker =>

                worker.id === selectedWorker.id

                    ? {

                        ...worker,

                        subscriptionExpiry:
                            new Date(newExpiryDate).getTime()

                    }

                    : worker

            )

        );

        setShowRenewModal(false);

        setSelectedWorker(null);

    }

    const filteredWorkers=useMemo(()=>{

        const today=Date.now();

        const next30=today+(1000*60*60*24*30);

        return workers.filter(worker=>{

            const expiry=
            worker.subscriptionExpiry || 0;

            const fullName=
            `${worker.personal?.firstName || ""} ${worker.personal?.lastName || ""}`
            .toLowerCase();

            const matchesSearch=
            fullName.includes(search.toLowerCase());

            if(filter==="expired"){

                return matchesSearch && expiry<today;

            }

            if(filter==="expiring"){

                return matchesSearch &&
                expiry>=today &&
                expiry<=next30;

            }

            if(filter==="active"){

                return matchesSearch &&
                expiry>next30;

            }

            return matchesSearch;

        });

    },[workers,search,filter]);



    function status(expiry){

        const today=Date.now();

        const next30=today+(1000*60*60*24*30);

        if(!expiry){

            return{

                label:"No Subscription",

                color:"bg-gray-100 text-gray-700"

            };

        }

        if(expiry<today){

            return{

                label:"Expired",

                color:"bg-red-100 text-red-700"

            };

        }

        if(expiry<=next30){

            return{

                label:"Expiring Soon",

                color:"bg-yellow-100 text-yellow-700"

            };

        }

        return{

            label:"Active",

            color:"bg-green-100 text-green-700"

        };

    }



    if(loading){

        return(

            <div>

                <Navbar/>

                <div className="p-10">

                    Loading subscriptions...

                </div>

            </div>

        );

    }



    return(

        <>

            <Navbar/>

            <div className="max-w-7xl bg-gradient-to-b from-emerald-50/50 via-white to-white mx-auto p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Subscription Management

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage worker subscriptions

                        </p>

                    </div>

                </div>



                {/* Summary */}

                <div className="grid md:grid-cols-3 gap-5 mb-8">

                    <SummaryCard

                        title="Active"

                        value={
                            workers.filter(w=>

                                (w.subscriptionExpiry||0)>
                                Date.now()+(1000*60*60*24*30)

                            ).length
                        }

                        icon={CheckCircle}

                        color="green"

                    />

                    <SummaryCard

                        title="Expiring Soon"

                        value={
                            workers.filter(w=>{

                                const e=w.subscriptionExpiry||0;

                                return e>Date.now() &&
                                e<Date.now()+(1000*60*60*24*30);

                            }).length
                        }

                        icon={Clock}

                        color="yellow"

                    />

                    <SummaryCard

                        title="Expired"

                        value={
                            workers.filter(w=>

                                (w.subscriptionExpiry||0)<Date.now()

                            ).length
                        }

                        icon={AlertTriangle}

                        color="red"

                    />

                </div>



                {/* Filters */}

                <div className="bg-white rounded-2xl border p-5 mb-8">

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="relative">

                            <Search
                                className="absolute left-3 top-3 text-gray-400"
                                size={18}
                            />

                            <input

                                value={search}

                                onChange={e=>setSearch(e.target.value)}

                                placeholder="Search worker..."

                                className="w-full border rounded-xl pl-10 p-3"

                            />

                        </div>

                        <select

                            value={filter}

                            onChange={e=>setFilter(e.target.value)}

                            className="border rounded-xl p-3"

                        >

                            <option value="all">

                                All

                            </option>

                            <option value="active">

                                Active

                            </option>

                            {/* <option value="expiring">

                                Expiring Soon

                            </option> */}

                            <option value="expired">

                                Expired

                            </option>

                        </select>

                    </div>

                </div>



                <div className="space-y-5">

                    {filteredWorkers.map(worker=>{

                        const s=status(worker.subscriptionExpiry);

                        return(

                            <div

                                key={worker.id}

                                className="bg-white rounded-2xl border p-6 flex justify-between items-center"

                            >

                                <div>

                                    <h2 className="font-bold text-xl">

                                        {worker.personal?.firstName}{" "}
                                        {worker.personal?.lastName}

                                    </h2>

                                    <p className="text-gray-500">

                                        {worker.professional?.profession}

                                    </p>

                                    <div className="flex items-center gap-2 mt-3">

                                        <Calendar size={16}/>

                                        {worker.subscriptionExpiry ?

                                            new Date(worker.subscriptionExpiry)
                                            .toLocaleDateString()

                                            :

                                            "No expiry"

                                        }

                                    </div>

                                </div>

                                <div className="flex gap-3 items-center">

                                    <span className={`${s.color} px-4 py-2 rounded-full`}>

                                        {s.label}

                                    </span>

                                    <button
                                        onClick={() => {

                                            setSelectedWorker(worker);

                                            setShowRenewModal(true);

                                        }}
                                        className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700"
                                    >

                                        Renew

                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>

            {

                showRenewModal && selectedWorker && (

                    <AdminRenewSubscriptionModal

                        worker={selectedWorker}

                        onClose={() => {

                            setShowRenewModal(false);

                            setSelectedWorker(null);

                        }}

                        onSave={handleRenewSubscription}

                    />

                )

            }

        </>

    );

}



function SummaryCard({

    title,

    value,

    icon:Icon,

    color

}){

    return(

        <div className="bg-white rounded-2xl border p-6">

            <div className="flex justify-between">

                <Icon className={`text-${color}-600`} />

                <h2 className="text-4xl font-bold">

                    {value}

                </h2>

            </div>

            <p className="text-gray-500 mt-3">

                {title}

            </p>

        </div>

    );

}