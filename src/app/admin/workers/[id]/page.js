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

import { useParams } from "next/navigation";





export default function WorkerReview() {

    const params = useParams();


const [worker,setWorker]=useState(null);

const [message,setMessage] = useState("");



    useEffect(() => {

        if (!params?.id) return;

        async function load() {

            console.log("Loading worker:", params.id);

            const ref = doc(
                db,
                "healthcareWorkers",
                params.id
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
        }

        load();

    }, [params]);


    console.log("Worker data:", worker
    );  

    console.log("Worker data params:", params.id
    );  




    if(!worker){

    return <p>Loading...</p>

    }

    async function handleApprove(){


    await approveWorker(
        worker.id
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




    return (

    <div className="max-w-5xl mx-auto py-10">
        <Navbar />


    <h1 className="text-3xl font-bold">

    Worker Review

    </h1>



    <div className="bg-white shadow rounded-2xl p-8 mt-8">


    <h2 className="text-xl font-bold">

        {
        worker.personal.firstName
        }

        {" "}

        {
        worker.personal.lastName
        }

    </h2>



    <p>

    {
    worker.professional.profession
    }

    </p>



    <hr className="my-6"/>




    <h3 className="font-semibold">

    Documents

    </h3>



    <a

    href={
    worker.documents.governmentId
    }

    target="_blank"

    className="text-blue-600 block mt-3"

    >

    View Government ID

    </a>



    <a

    href={
    worker.documents.professionalLicense
    }

    target="_blank"

    className="text-blue-600 block mt-3"

    >

    View License

    </a>




    </div>

    {
        message && (

        <div className="mt-5 bg-green-50 text-green-700 p-4 rounded-lg">

        {message}

        </div>

        )
    }
    
    <div className="flex gap-4 mt-8">


        <button

        onClick={handleApprove}

        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg"

        >

        ✓ Approve Worker

        </button>




        <button

        onClick={handleReject}

        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"

        >

        ✕ Reject

        </button>


        </div>


    </div>


    );


}