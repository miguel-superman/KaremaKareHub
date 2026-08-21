"use client";


import {
useState
}
from "react";


import {
uploadWorkerDocument
}
from "@/app/lib/workers/uploadWorkerDocument";


import {
doc,
updateDoc
}
from "firebase/firestore";


import {
db
}
from "@/app/lib/firebase/firebase";



export default function DocumentsSection({
worker,
setWorker
}){


const [uploading,setUploading]=useState("");



const uploadDocument = async(
type,
file
)=>{


try{


setUploading(type);



const url =
await uploadWorkerDocument(

worker.uid,

type,

file

);



await updateDoc(

doc(
db,
"healthcareWorkers",
worker.uid
),

{

[`documents.${type}`]:url,

updatedAt:Date.now()

}

);



setWorker(prev=>({

...prev,

documents:{

...prev.documents,

[type]:url

}

}));


}

catch(error){

console.log(error);

}

finally{

setUploading("");

}


};




const documents=[

{
key:"governmentId",
label:"Government ID"
},

{
key:"professionalLicense",
label:"Professional License"
},

{
key:"employmentLetter",
label:"Employment Letter"
}


];



return (

    <div className="
    bg-white
    rounded-3xl
    border
    p-8
    mt-8
    ">


        <h2 className="
        text-2xl
        font-bold
        mb-6
        ">

        Verification Documents

        </h2>



        <div className="
        space-y-5
        ">


        {
        documents.map(item=>(


        <div

            key={item.key}

            className="
            flex
            items-center
            justify-between
            border
            rounded-xl
            p-4
            "


        >


        <div>


        <p className="
        font-semibold
        ">

        {item.label}

        </p>


        {
        worker.documents?.[item.key]
        ?
        <a

        href={
        worker.documents[item.key]
        }

        target="_blank"

        className="
        text-sm
        text-emerald-600
        "

        >

        View Document

        </a>

        :

        <p className="
        text-sm
        text-gray-500
        ">

        Not uploaded

        </p>

        }


        </div>




        <label

        className="
        cursor-pointer
        bg-emerald-600
        text-white
        px-4
        py-2
        rounded-xl
        "


        >


        {
        uploading===item.key
        ?
        "Uploading..."
        :
        "Replace"
        }



        <input

        hidden

        type="file"

        onChange={
        e=>
        uploadDocument(
        item.key,
        e.target.files[0]
        )
        }

        />


        </label>



        </div>


        ))

        }



        </div>


    </div>


);


}