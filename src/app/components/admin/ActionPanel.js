"use client";

import { useState } from "react";
import {
    updateDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/firebase";

import {
    CheckCircle,
    XCircle,
    Save
} from "lucide-react";


export default function ActionPanel({ worker,subscriptionExpiry }) {


    const [notes,setNotes] = useState(
        worker.verification?.adminNotes || ""
    );

    const [loading,setLoading] = useState(false);

    const [message,setMessage] = useState("");



    async function updateStatus(status){


        try {


            setLoading(true);


            const ref = doc(
                db,
                "healthcareWorkers",
                worker.id
            );

            if(status === "Approved" && subscriptionExpiry) {

                await updateDoc(ref,{

                    "verification.status": status,

                    "verification.reviewedAt":
                        serverTimestamp(),

                    "subscriptionExpiry": subscriptionExpiry

                });
            } else {


            await updateDoc(ref,{

                "verification.status": status,

                "verification.reviewedAt":
                    serverTimestamp(),

            });
        }
            setMessage(
                `Worker ${status}`
            );


        } catch(error){


            console.error(error);

            setMessage(
                "Something went wrong"
            );


        } finally {


            setLoading(false);


        }

    }




    async function saveNotes(){


        try{


            const ref = doc(
                db,
                "healthcareWorkers",
                worker.id
            );


            await updateDoc(ref,{

                "verification.adminNotes":
                    notes,

            });


            setMessage(
                "Notes saved"
            );


        }catch(error){

            console.error(error);

        }


    }



return (

<div className="space-y-6">


<div className="bg-white rounded-2xl shadow border p-6">


<h2 className="text-xl font-semibold">

Verification Status

</h2>


<div className="mt-4">


<span className="
inline-flex
px-4
py-2
rounded-full
bg-yellow-100
text-yellow-700
font-semibold
">

{worker.verification?.status || "pending"}

</span>


</div>


</div>





<div className="bg-white rounded-2xl shadow border p-6">


<h2 className="text-xl font-semibold">

Admin Notes

</h2>


<textarea

rows="5"

value={notes}

onChange={(e)=>setNotes(e.target.value)}

placeholder="Add verification notes..."

className="
w-full
mt-4
border
rounded-xl
p-4
"

/>



<button

onClick={saveNotes}

className="
mt-4
flex
items-center
gap-2
bg-slate-900
text-white
px-5
py-3
rounded-xl
"

>

<Save size={18}/>

Save Notes

</button>


</div>






<div className="bg-white rounded-2xl shadow border p-6">


<h2 className="text-xl font-semibold">

Application Decision

</h2>



<div className="flex gap-4 mt-6">


<button

disabled={loading}

onClick={()=>updateStatus("Approved")}

className="
flex
items-center
gap-2
bg-emerald-500
hover:bg-emerald-600
text-white
px-5
py-3
rounded-xl
"

>

<CheckCircle size={18}/>

Approve

</button>




<button

disabled={loading}

onClick={()=>updateStatus("Rejected")}

className="
flex
items-center
gap-2
bg-red-500
hover:bg-red-600
text-white
px-5
py-3
rounded-xl
"

>

<XCircle size={18}/>

Reject

</button>


</div>


{
message && (

<p className="
mt-4
text-sm
text-emerald-600
">

{message}

</p>

)
}


</div>



</div>


);


}