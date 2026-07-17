"use client";

import React, { useState } from "react";
import { submitWorkerApplication } from "../lib/firebase/application";
import { useRouter } from "next/navigation";




export default function Step5Review({
    previous,
    application
}){

    const router = useRouter();
    
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);


    async function submitApplication() {

        try {

            setLoading(true);
            setError("");

            await submitWorkerApplication(application);

            alert("🎉 Your application has been submitted!");
            // router.push("/apply/success");
            // router.push("/apply/status");
            router.push("/dashboard");

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);

        }

    }



    return (

        <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


            <h2 className="text-2xl font-bold">

            Review Application

            </h2>


            <p className="text-gray-500 mt-1">

            Please review your information before submitting.

            </p>

            {/* Personal */}


            <div className="mt-8">


            <h3 className="text-lg font-semibold">

            Personal Information

            </h3>


            <div className="bg-slate-50 rounded-lg p-5 mt-3">


            <p>

            Name:
            <span className="font-medium">

            {" "}
            {application.personal.firstName}

            {" "}

            {application.personal.lastName}

            </span>

            </p>



            <p>

            Phone:

            {" "}

            {application.personal.phone}

            </p>



            <p>

            Location:

            {" "}

            {application.personal.city}

            </p>



            </div>


            </div>






            {/* Professional */}



            <div className="mt-8">


            <h3 className="text-lg font-semibold">

            Professional Information

            </h3>



            <div className="bg-slate-50 rounded-lg p-5 mt-3">


            <p>

            Profession:

            {" "}

            {application.professional.profession}

            </p>



            <p>

            Experience:

            {" "}

            {application.professional.experience}

            </p>



            <p>

            Employer:

            {" "}

            {application.professional.employer}

            </p>



            <p>

            Specialties:

            </p>


            <ul className="list-disc ml-6">

            {
            application.professional.specialization?.map(
            (item,index)=>(

            <li key={index}>

            {item}

            </li>

            )

            )

            }

            </ul>


            </div>


            </div>






            {/* Documents */}


            <div className="mt-8">


            <h3 className="text-lg font-semibold">

            Documents

            </h3>


            <div className="bg-slate-50 rounded-lg p-5 mt-3">


            <p>

            ✓ Government ID Uploaded

            </p>


            <p>

            ✓ Professional License Uploaded

            </p>


            <p>

            ✓ Certificates Uploaded

            </p>


            </div>


            </div>






            <div className="mt-8 border rounded-lg p-5">


            <label className="flex gap-3">


            <input

            type="checkbox"

            />


            <span>

            I certify that all information provided is correct.

            </span>


            </label>


            </div>








            <div className="flex justify-between mt-10">


            <button

            onClick={previous}

            className="px-6 py-3 border rounded-lg"

            >

            ← Back

            </button>



                {error && (

                <div className="mt-6 rounded-lg bg-red-50 border border-red-200 text-red-700 p-4">

                    {error}

                </div>

)}


            <button
                onClick={submitApplication}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
            >

                {loading
                    ? "Submitting..."
                    : "Submit Application"}

            </button>


            </div>





        </div>

    );


}