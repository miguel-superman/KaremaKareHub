// "use client";

// import {useState} from "react";
// import {
// validateRates
// }
// from "../lib/firebase/validation";


// export default function Step4Rates({
//     next,
//     previous,
//     save,
//     data
// }) {


//     const [error,setError]=useState("");




// const [form,setForm] = useState({

//     hourlyRate:"",
//     homeVisitRate:"",
//     overnightRate:"",
//     travelFee:"",
//     availability:"",
//     paymentMethod:"",

//     ...data

// });



// function updateField(e){

// setForm({

// ...form,

// [e.target.name]:e.target.value

// });

// }




//     function continueNext(){


//         const validation =
//         validateRates(form);



//         if(validation){

//         setError(validation);

//         return;

//         }



//         save(form);

//         next();


// }





// return (

// <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


// <h2 className="text-2xl font-bold">

// Service Rates

// </h2>


// <p className="text-gray-500 mt-1">

// Set your healthcare service pricing.

// </p>




// <div className="grid md:grid-cols-2 gap-6 mt-8">



// <div>

// <label className="font-medium">

// Hourly Rate ($)

// </label>


// <input

// type="number"

// name="hourlyRate"

// value={form.hourlyRate}

// onChange={updateField}

// placeholder="Example: 35"

// className="w-full mt-2 border rounded-lg h-12 px-4"

// />

// </div>





// <div>

// <label className="font-medium">

// Home Visit Rate ($)

// </label>


// <input

// type="number"

// name="homeVisitRate"

// value={form.homeVisitRate}

// onChange={updateField}

// placeholder="Example: 75"

// className="w-full mt-2 border rounded-lg h-12 px-4"

// />

// </div>







// <div>

// <label className="font-medium">

// Overnight Care Rate ($)

// </label>


// <input

// type="number"

// name="overnightRate"

// value={form.overnightRate}

// onChange={updateField}

// placeholder="Example: 250"

// className="w-full mt-2 border rounded-lg h-12 px-4"

// />

// </div>







// <div>

// <label className="font-medium">

// Travel Fee ($)

// </label>


// <input

// type="number"

// name="travelFee"

// value={form.travelFee}

// onChange={updateField}

// placeholder="Optional"

// className="w-full mt-2 border rounded-lg h-12 px-4"

// />

// </div>


// </div>







// <div className="mt-8">


// <label className="font-medium">

// Availability

// </label>


// <select

// name="availability"

// value={form.availability}

// onChange={updateField}

// className="w-full mt-2 border rounded-lg h-12 px-4"

// >


// <option value="">

// Select Availability

// </option>


// <option>

// Weekdays

// </option>


// <option>

// Weekends

// </option>


// <option>

// Evenings

// </option>


// <option>

// Full Time

// </option>


// <option>

// Flexible

// </option>


// </select>


// </div>







// <div className="mt-8">


// <label className="font-medium">

// Preferred Payment Method

// </label>


// <select

// name="paymentMethod"

// value={form.paymentMethod}

// onChange={updateField}

// className="w-full mt-2 border rounded-lg h-12 px-4"

// >


// <option value="">

// Select Method

// </option>


// <option>

// Bank Transfer

// </option>


// <option>

// Mobile Money

// </option>


// <option>

// Cash

// </option>


// <option>

// Platform Payments

// </option>


// </select>


// </div>







// <div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-lg p-5">


// <h3 className="font-semibold">

// Pricing Tips

// </h3>


// <p className="text-sm text-gray-600 mt-2">

// You can update your rates anytime from your healthcare worker dashboard.

// </p>


// </div>



//         {
//             error && (

//             <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">

//             {error}

//             </div>

//          )
//         }


//         <div className="flex justify-between mt-10">


//         <button

//         onClick={previous}

//         className="px-6 py-3 border rounded-lg"

//         >

//         ← Back

//         </button>





//         <button

//         onClick={continueNext}

//         className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"

//         >

//         Continue →

//         </button>


//         </div>





//     </div>

// );

// }

"use client";

import { useState } from "react";

import {
    validateRates
} from "../lib/firebase/validation";


export default function Step4Rates({
    next,
    previous,
    save,
    data
}) {

    const [error, setError] = useState("");


    const [form, setForm] = useState({

        currency: "JMD",

        hourlyRate: "",
        homeVisitRate: "",
        overnightRate: "",
        travelFee: "",

        availability: "",
        paymentMethod: "",

        ...data

    });


    function updateField(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }


    function continueNext() {

        /*
         * Build the rates with the selected currency.
         *
         * Example:
         *
         * JMD$1500
         * USD$35
         */

        const formattedForm = {

            ...form,

            hourlyRate:
                form.hourlyRate
                    ? `${form.hourlyRate}`
                    : "",

            homeVisitRate:
                form.homeVisitRate
                    ? `${form.homeVisitRate}`
                    : "",

            overnightRate:
                form.overnightRate
                    ? `${form.overnightRate}`
                    : "",

            travelFee:
                form.travelFee
                    ? `${form.travelFee}`
                    : ""

        };


        const validation =
            validateRates(formattedForm);


        if (validation) {

            setError(validation);

            return;

        }


        save(formattedForm);

        next();

    }


    return (

        <div className="
            bg-white
            mt-10
            rounded-2xl
            shadow-lg
            border
            p-8
        ">


            <h2 className="text-2xl font-bold">

                Service Rates

            </h2>


            <p className="text-gray-500 mt-1">

                Set your healthcare service pricing and preferred currency.

            </p>


            {/* Currency */}

            <div className="mt-8">

                <label className="font-medium">

                    Rate Currency

                </label>


                <select

                    name="currency"

                    value={form.currency}

                    onChange={updateField}

                    className="
                        w-full
                        mt-2
                        border
                        rounded-lg
                        h-12
                        px-4
                        bg-white
                    "

                >

                    <option value="JMD">

                        JMD - Jamaican Dollar

                    </option>


                    <option value="USD">

                        USD - US Dollar

                    </option>


                    <option value="CAD">

                        CAD - Canadian Dollar

                    </option>


                    <option value="GBP">

                        GBP - British Pound

                    </option>


                    <option value="EUR">

                        EUR - Euro

                    </option>

                </select>


                <p className="
                    text-xs
                    text-gray-500
                    mt-2
                ">

                    This currency will be used for all of your service rates.

                </p>

            </div>


            {/* Rates */}

            <div className="
                grid
                md:grid-cols-2
                gap-6
                mt-8
            ">


                {/* Hourly */}

                <div>

                    <label className="font-medium">

                        Hourly Rate

                    </label>


                    <div className="relative mt-2">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                            font-medium
                        ">

                            {form.currency}$

                        </span>


                        <input

                            type="number"

                            name="hourlyRate"

                            value={form.hourlyRate}

                            onChange={updateField}

                            placeholder="Example: 1500"

                            className="
                                w-full
                                border
                                rounded-lg
                                h-12
                                pl-16
                                pr-4
                            "

                        />

                    </div>

                </div>


                {/* Home Visit */}

                <div>

                    <label className="font-medium">

                        Home Visit Rate

                    </label>


                    <div className="relative mt-2">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                            font-medium
                        ">

                            {form.currency}$

                        </span>


                        <input

                            type="number"

                            name="homeVisitRate"

                            value={form.homeVisitRate}

                            onChange={updateField}

                            placeholder="Example: 5000"

                            className="
                                w-full
                                border
                                rounded-lg
                                h-12
                                pl-16
                                pr-4
                            "

                        />

                    </div>

                </div>


                {/* Overnight */}

                <div>

                    <label className="font-medium">

                        Overnight Care Rate

                    </label>


                    <div className="relative mt-2">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                            font-medium
                        ">

                            {form.currency}$

                        </span>


                        <input

                            type="number"

                            name="overnightRate"

                            value={form.overnightRate}

                            onChange={updateField}

                            placeholder="Example: 15000"

                            className="
                                w-full
                                border
                                rounded-lg
                                h-12
                                pl-16
                                pr-4
                            "

                        />

                    </div>

                </div>


                {/* Travel */}

                <div>

                    <label className="font-medium">

                        Travel Fee

                    </label>


                    <div className="relative mt-2">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                            font-medium
                        ">

                            {form.currency}$

                        </span>


                        <input

                            type="number"

                            name="travelFee"

                            value={form.travelFee}

                            onChange={updateField}

                            placeholder="Optional"

                            className="
                                w-full
                                border
                                rounded-lg
                                h-12
                                pl-16
                                pr-4
                            "

                        />

                    </div>

                </div>


            </div>


            {/* Availability */}

            <div className="mt-8">

                <label className="font-medium">

                    Availability

                </label>


                <select

                    name="availability"

                    value={form.availability}

                    onChange={updateField}

                    className="
                        w-full
                        mt-2
                        border
                        rounded-lg
                        h-12
                        px-4
                    "

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


            {/* Payment Method */}

            <div className="mt-8">

                <label className="font-medium">

                    Preferred Payment Method

                </label>


                <select

                    name="paymentMethod"

                    value={form.paymentMethod}

                    onChange={updateField}

                    className="
                        w-full
                        mt-2
                        border
                        rounded-lg
                        h-12
                        px-4
                    "

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


            {/* Pricing Tips */}

            <div className="
                mt-10
                bg-emerald-50
                border
                border-emerald-100
                rounded-lg
                p-5
            ">

                <h3 className="font-semibold">

                    Pricing Tips

                </h3>


                <p className="text-sm text-gray-600 mt-2">

                    Your rates will be displayed using the currency you
                    selected. You can update your rates anytime from
                    your healthcare worker dashboard.

                </p>


                {/* Preview */}

                <div className="mt-4">

                    <p className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-gray-500
                    ">

                        Rate Preview

                    </p>


                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        mt-2
                        text-sm
                    ">

                        <div className="bg-white rounded-lg p-3">

                            <span className="text-gray-500">

                                Hourly

                            </span>

                            <p className="font-semibold">

                                {form.hourlyRate
                                    ? `${form.currency}$${form.hourlyRate}`
                                    : "Not set"
                                }

                            </p>

                        </div>


                        <div className="bg-white rounded-lg p-3">

                            <span className="text-gray-500">

                                Home Visit

                            </span>

                            <p className="font-semibold">

                                {form.homeVisitRate
                                    ? `${form.currency}$${form.homeVisitRate}`
                                    : "Not set"
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Error */}

            {
                error && (

                    <div className="
                        mt-5
                        bg-red-50
                        border
                        border-red-200
                        text-red-600
                        p-4
                        rounded-lg
                    ">

                        {error}

                    </div>

                )
            }


            {/* Navigation */}

            <div className="
                flex
                justify-between
                mt-10
            ">


                <button

                    onClick={previous}

                    className="
                        px-6
                        py-3
                        border
                        rounded-lg
                    "

                >

                    ← Back

                </button>


                <button

                    onClick={continueNext}

                    className="
                        bg-emerald-500
                        hover:bg-emerald-600
                        text-white
                        px-8
                        py-3
                        rounded-lg
                    "

                >

                    Continue →

                </button>


            </div>


        </div>

    );

}