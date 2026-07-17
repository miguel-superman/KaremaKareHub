"use client";

import {useState} from "react";
import {
validateRates
}
from "../lib/firebase/validation";


export default function Step4Rates({
    next,
    previous,
    save,
    data
}) {


    const [error,setError]=useState("");




const [form,setForm] = useState({

    hourlyRate:"",
    homeVisitRate:"",
    overnightRate:"",
    travelFee:"",
    availability:"",
    paymentMethod:"",

    ...data

});



function updateField(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}




    function continueNext(){


        const validation =
        validateRates(form);



        if(validation){

        setError(validation);

        return;

        }



        save(form);

        next();


}





return (

<div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


<h2 className="text-2xl font-bold">

Service Rates

</h2>


<p className="text-gray-500 mt-1">

Set your healthcare service pricing.

</p>




<div className="grid md:grid-cols-2 gap-6 mt-8">



<div>

<label className="font-medium">

Hourly Rate ($)

</label>


<input

type="number"

name="hourlyRate"

value={form.hourlyRate}

onChange={updateField}

placeholder="Example: 35"

className="w-full mt-2 border rounded-lg h-12 px-4"

/>

</div>





<div>

<label className="font-medium">

Home Visit Rate ($)

</label>


<input

type="number"

name="homeVisitRate"

value={form.homeVisitRate}

onChange={updateField}

placeholder="Example: 75"

className="w-full mt-2 border rounded-lg h-12 px-4"

/>

</div>







<div>

<label className="font-medium">

Overnight Care Rate ($)

</label>


<input

type="number"

name="overnightRate"

value={form.overnightRate}

onChange={updateField}

placeholder="Example: 250"

className="w-full mt-2 border rounded-lg h-12 px-4"

/>

</div>







<div>

<label className="font-medium">

Travel Fee ($)

</label>


<input

type="number"

name="travelFee"

value={form.travelFee}

onChange={updateField}

placeholder="Optional"

className="w-full mt-2 border rounded-lg h-12 px-4"

/>

</div>


</div>







<div className="mt-8">


<label className="font-medium">

Availability

</label>


<select

name="availability"

value={form.availability}

onChange={updateField}

className="w-full mt-2 border rounded-lg h-12 px-4"

>


<option value="">

Select Availability

</option>


<option>

Weekdays

</option>


<option>

Weekends

</option>


<option>

Evenings

</option>


<option>

Full Time

</option>


<option>

Flexible

</option>


</select>


</div>







<div className="mt-8">


<label className="font-medium">

Preferred Payment Method

</label>


<select

name="paymentMethod"

value={form.paymentMethod}

onChange={updateField}

className="w-full mt-2 border rounded-lg h-12 px-4"

>


<option value="">

Select Method

</option>


<option>

Bank Transfer

</option>


<option>

Mobile Money

</option>


<option>

Cash

</option>


<option>

Platform Payments

</option>


</select>


</div>







<div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-lg p-5">


<h3 className="font-semibold">

Pricing Tips

</h3>


<p className="text-sm text-gray-600 mt-2">

You can update your rates anytime from your healthcare worker dashboard.

</p>


</div>



        {
            error && (

            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">

            {error}

            </div>

         )
        }


        <div className="flex justify-between mt-10">


        <button

        onClick={previous}

        className="px-6 py-3 border rounded-lg"

        >

        ← Back

        </button>





        <button

        onClick={continueNext}

        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"

        >

        Continue →

        </button>


        </div>





    </div>

);

}