"use client";

import { useState } from "react";
import { X } from "lucide-react";

import Step2PersonalUpdate from "./rejectedUpdates/Step2PersonalUpdate";
import Step3Professional from "../Step3Professional";
import Step4Rates from "../Step4Rates";
import Step5Documents from "../Step5Documents";


export default function ApplicationEditModal({
    worker,
    open,
    close
}) {


    const [tab,setTab] = useState("personal");



    if(!open) return null;



return (

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
w-full
max-w-5xl
max-h-[90vh]
overflow-y-auto
rounded-3xl
shadow-xl
p-8
">



<div className="
flex
justify-between
items-center
mb-8
">


<h2 className="
text-2xl
font-bold
">

Update Application

</h2>


<button
onClick={close}
>

<X/>

</button>


</div>





<div className="
flex
gap-3
border-b
pb-4
mb-6
">


<button

onClick={()=>setTab("personal")}

className={
tab==="personal"
?
"text-emerald-600 font-semibold"
:
"text-gray-500"
}

>

Personal

</button>




<button

onClick={()=>setTab("professional")}

className={
tab==="professional"
?
"text-emerald-600 font-semibold"
:
"text-gray-500"
}

>

Professional

</button>





<button

onClick={()=>setTab("rates")}

className={
tab==="rates"
?
"text-emerald-600 font-semibold"
:
"text-gray-500"
}

>

Rates

</button>





<button

onClick={()=>setTab("documents")}

className={
tab==="documents"
?
"text-emerald-600 font-semibold"
:
"text-gray-500"
}

>

Documents

</button>



</div>





{
tab==="personal" && (

<Step2PersonalUpdate
worker={worker}
/>

)
}





{
tab==="professional" && (

<Step3Professional
worker={worker}
/>

)
}





{
tab==="rates" && (

<Step4Rates
worker={worker}
/>

)
}





{
tab==="documents" && (

<Step5Documents
worker={worker}
/>

)
}





</div>


</div>


);

}