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





if(loading){

    return (

    <p>

    Loading applications...

    </p>

    )

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


        <th>

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

        href={`/admin/workers/${worker.id}`}

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