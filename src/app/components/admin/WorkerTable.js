"use client";


import {useEffect,useState} from "react";

import {
collection,
query,
where,
getDocs
}
from "firebase/firestore";

import {db} from "../../lib/firebase/firebase";

import {
    ClipboardCheck,
    SearchX
} from "lucide-react";



export default function WorkerTable(){


const [workers,setWorkers]=useState([]);

const [loading,setLoading]=useState(true);




    useEffect(()=>{


    async function loadWorkers(){


    const q=query(

    collection(
    db,
    "healthcareWorkers"
    ),

    where(
    "verification.status",
    "==",
    "pending"
    )

    );


    console.log("Workers", workers
    );


    const snapshot =
    await getDocs(q);



    const list =
    snapshot.docs.map(doc=>({

    id:doc.id,

    ...doc.data()

    }));



    setWorkers(list);

    console.log("Workers", workers
    );


    console.log("Workers list ", list
    );


    setLoading(false);


    }



    loadWorkers();



    },[]);




    if (loading) {

        return (

            <div className="bg-white rounded-2xl border shadow mt-8 p-8">

                <div className="animate-pulse space-y-6">

                    <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>

                    {[1,2,3,4].map((item)=>(

                        <div
                            key={item}
                            className="grid grid-cols-4 gap-6 items-center"
                        >

                            <div className="h-5 bg-gray-200 rounded"></div>

                            <div className="h-5 bg-gray-200 rounded"></div>

                            <div className="h-5 bg-gray-200 rounded"></div>

                            <div className="h-5 w-20 bg-gray-200 rounded"></div>

                        </div>

                    ))}

                </div>

            </div>

        );

    }

    function StatusBadge({status}){


        const styles={

        pending:
        "bg-yellow-100 text-yellow-700",

        approved:
        "bg-green-100 text-green-700",

        rejected:
        "bg-red-100 text-red-700"

        };


        return (

        <span
        className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}
        >

        {status}

        </span>

        );

    }


    if (workers.length === 0) {

        return (

            <div className="bg-white rounded-3xl shadow border mt-8">

                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">

                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">

                        <ClipboardCheck
                            size={48}
                            className="text-emerald-600"
                        />

                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-gray-900">

                        No Verification Requests

                    </h2>

                    <p className="mt-3 text-gray-500 max-w-md">

                        You're all caught up.

                        There are currently no healthcare professionals waiting for verification.

                    </p>

                    <div className="mt-8 flex items-center gap-2 rounded-xl bg-slate-50 border px-5 py-3">

                        <SearchX
                            size={18}
                            className="text-gray-400"
                        />

                        <span className="text-gray-500">

                            New applications will appear here automatically.

                        </span>

                    </div>

                </div>

            </div>

        );

    }



    return (

        <div className="bg-white rounded-2xl shadow border mt-8">


        <table className="w-full">


        <thead className="bg-gray-100">


        <tr>

        <th className="p-4 text-left">

        Name

        </th>


        <th className="p-4 text-left">

        Profession

        </th>


        <th className="p-4 text-left">

        Location

        </th>


        <th className="p-4 text-left">

        Action

        </th>


        </tr>


        </thead>



        <tbody>


        {
        workers.map(worker=>(


        <tr

        key={worker.id}

        className="border-t"

        >


        <td className="p-4">


        {
        worker.personal?.firstName
        }

        {" "}

        {
        worker.personal?.lastName
        }


        </td>



        <td className="p-4">


        {
        worker.professional?.profession
        }


        </td>



        <td className="p-4">


        {
        worker.personal?.city
        }


        </td>




        <td className="p-4">


        <a

        href={`/admin/verification/workers?workerId=${worker.id}`}

        className="text-emerald-600 font-medium"

        >

        Review

        </a>


        </td>



        </tr>



        ))

        }


        </tbody>


        </table>


        </div>

);


}