"use client";

import { useState } from "react";
import {
validateProfessional
}
from "../lib/firebase/validation";


export default function Step3Professional({
    next,
    previous,
    save,
    data
}) {

    const [showLicenseHelp, setShowLicenseHelp] = useState(false);


        

    const [form, setForm] = useState({

        profession: "",

        licenseNumber: "",

        employer: "",

        experience: "",

        qualifications: "",

        specialization: [],

        languages: "",

        bio: "",

        addittionalInfo: "",

        emergencyAvailable: false,

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
        validateProfessional(form);



        if(validation){

        setError(validation);

        return;

        }



        save(form);

        next();


    }




    function toggleSpecialization(value){


        let updated;


        if(form.specialization.includes(value)){


            updated =
            form.specialization.filter(
                item => item !== value
            );


        }else{


            updated = [

                ...form.specialization,

                value

            ];

        }



        setForm({

            ...form,

            specialization:updated

        });


    }

    const [error,setError]=useState("");




// function continueNext(){


//     save(form);

//     next();

// }




    return (

        <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


        <h2 className="text-2xl font-bold">

        Professional Information

        </h2>


        <p className="text-gray-500 mt-1">

        Tell us about your healthcare experience.

        </p>





        <div className="grid md:grid-cols-2 gap-6 mt-8">



        <div>

            <label className="font-medium">

                Profession

            </label>


            <select

            name="profession"

            value={form.profession}

            onChange={updateField}

            className="w-full mt-2 border rounded-lg h-12 px-4"

            >


                <option value="">

                Select Profession

                </option>

                <option>
                Registered Nurse
                </option>

                <option>
                Caregiver
                </option>

                <option>
                Medical Doctor
                </option>

                <option>
                Physical Therapist
                </option>

                <option>
                Gerontologist
                </option>

                <option>
                Baby Sitters
                </option>

                <option>
                Enrolled Nurse
                </option>

                <option>
                Student Nurse
                </option>

                <option>
                Dietician
                </option>

                <option>
                Domestic Care
                </option>

                <option>
                Pediatrician
                </option>

                <option>
                Student Nurse
                </option>


                <option>
                Patient Care Assistant
                </option>

                <option>
                Psychiatric Nurse
                </option>
            </select>


        </div>






        <div>

    <div className="flex items-center gap-2">

        <label className="font-medium">
            License / Registration Number (If Applicable)
        </label>

        <button
            type="button"
            onClick={() => setShowLicenseHelp(true)}
            className="
                flex
                items-center
                justify-center
                w-5
                h-5
                rounded-full
                bg-emerald-100
                text-emerald-700
                text-xs
                font-bold
                hover:bg-emerald-200
                transition
            "
            aria-label="License information"
        >
            ?
        </button>

    </div>


    <input
        name="licenseNumber"
        value={form.licenseNumber}
        onChange={updateField}
        placeholder="RN-123456"
        className="
            w-full
            mt-2
            border
            rounded-lg
            h-12
            px-4
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500
        "
    />


    {/* License Help Modal */}

    {showLicenseHelp && (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
                py-6
            "
            onClick={() => setShowLicenseHelp(false)}
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    w-full
                    max-w-md

                    max-h-[90vh]

                    overflow-y-auto

                    p-5
                    sm:p-6
                "
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <h3 className="
                            text-lg
                            sm:text-xl
                            font-bold
                            text-slate-900
                        ">
                            License / Registration Information
                        </h3>

                        <p className="
                            text-sm
                            text-gray-600
                            mt-2
                        ">
                            Find out whether your profession requires
                            a professional license or registration number.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() => setShowLicenseHelp(false)}
                        className="
                            flex-shrink-0
                            w-9
                            h-9
                            rounded-full
                            bg-slate-100
                            hover:bg-slate-200
                            text-gray-500
                            hover:text-gray-800
                            text-xl
                            flex
                            items-center
                            justify-center
                        "
                    >
                        ×
                    </button>

                </div>


                {/* Content */}

                <div className="mt-5 space-y-4">

                    {/* Required */}

                    <div className="
                        bg-emerald-50
                        border
                        border-emerald-100
                        rounded-xl
                        p-4
                    ">

                        <p className="
                            font-semibold
                            text-emerald-800
                        ">
                            License / Registration Required
                        </p>

                        <ul className="
                            mt-3
                            text-sm
                            text-emerald-700
                            space-y-2
                        ">

                            <li>• Registered Nurse</li>

                            <li>• Enrolled Nurse</li>

                            <li>• Psychiatric Nurse</li>

                            <li>• Medical Doctor</li>

                            <li>• Pediatrician</li>

                            <li>• Physical Therapist</li>

                            <li>• Dietician</li>

                            <li>• Other regulated healthcare professionals</li>

                        </ul>

                    </div>


                    {/* Not normally required */}

                    <div className="
                        bg-slate-50
                        border
                        border-slate-100
                        rounded-xl
                        p-4
                    ">

                        <p className="
                            font-semibold
                            text-slate-800
                        ">
                            May Not Require Professional Licensing
                        </p>

                        <ul className="
                            mt-3
                            text-sm
                            text-slate-600
                            space-y-2
                        ">

                            <li>• Caregiver</li>

                            <li>• Baby Sitter</li>

                            <li>• Patient Care Assistant</li>

                            <li>• Domestic Helper</li>

                        </ul>

                    </div>


                    {/* Important information */}

                    <div className="
                        bg-yellow-50
                        border
                        border-yellow-100
                        rounded-xl
                        p-4
                    ">

                        <p className="
                            text-sm
                            text-yellow-800
                            leading-relaxed
                        ">

                            <strong>Not sure?</strong>{" "}

                            If you are unsure whether your profession
                            requires registration, you may leave this
                            field blank. Our verification team will
                            review your application and determine what
                            documentation is required.

                        </p>

                    </div>

                </div>


                {/* Footer */}

                <div className="
                    mt-6
                    pt-4
                    border-t
                    border-slate-100
                ">

                    <button
                        type="button"
                        onClick={() => setShowLicenseHelp(false)}
                        className="
                            w-full
                            bg-emerald-500
                            hover:bg-emerald-600
                            text-white
                            py-3
                            rounded-xl
                            font-medium
                            transition
                        "
                    >
                        Got it
                    </button>

                </div>

            </div>

        </div>

    )}
    </div>





        <div>

        <label className="font-medium">

        Current Employer

        </label>


        <input

        name="employer"

        value={form.employer}

        onChange={updateField}

        placeholder="Hospital / Clinic"

        className="w-full mt-2 border rounded-lg h-12 px-4"

        />


        </div>







        <div>

        <label className="font-medium">

        Years of Experience

        </label>


        <select

        name="experience"

        value={form.experience}

        onChange={updateField}

        className="w-full mt-2 border rounded-lg h-12 px-4"

        >


        <option value="">

        Select Experience

        </option>


        <option>
        Less than 1 year
        </option>


        <option>
        1 - 3 years
        </option>


        <option>
        4 - 7 years
        </option>


        <option>
        8 - 10 years
        </option>


        <option>
        10+ years
        </option>


        </select>


        </div>



        </div>







        <div className="mt-6">


        <label className="font-medium">

        Qualifications

        </label>


        <textarea

        rows="3"

        name="qualifications"

        value={form.qualifications}

        onChange={updateField}

        placeholder="Bachelor of Nursing, CPR Certification..."

        className="w-full mt-2 border rounded-lg p-4"

        />


        </div>








        <div className="mt-8">


        <label className="font-medium">

        Areas of Specialization

        </label>



        <div className="grid md:grid-cols-3 gap-3 mt-4">


        {

        [

        "Elderly Care",

        "Pediatric Care",

        "Emergency Care",

        "Mental Health",

        "Home Care",

        "Post Surgery"

        ]


        .map(item=>(


        <button

        key={item}

        type="button"

        onClick={()=>toggleSpecialization(item)}

        className={

        form.specialization.includes(item)

        ?

        "bg-emerald-500 text-white border rounded-lg p-3"

        :

        "border rounded-lg p-3"

        }

        >


        {item}


        </button>



        ))


        }



        </div>


        </div>







        <div className="mt-8">


            <label className="font-medium">

            Languages Spoken

            </label>


            <input

            name="languages"

            value={form.languages}

            onChange={updateField}

            placeholder="English, Spanish..."

            className="w-full mt-2 border rounded-lg h-12 px-4"

            />


        </div>



        {/* Emergency Availability */}

        <div className="mt-8">

            <div
                className="
                border
                border-emerald-100
                bg-emerald-50/50
                rounded-2xl
                p-5
                "
            >

                <div className="flex items-start gap-4">

                    <input
                        type="checkbox"
                        name="emergencyAvailable"
                        checked={form.emergencyAvailable}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                emergencyAvailable: e.target.checked
                            })
                        }
                        className="
                        mt-1
                        h-5
                        w-5
                        accent-emerald-600
                        cursor-pointer
                        "
                    />

                    <div>

                        <label
                            htmlFor="emergencyAvailable"
                            className="
                            font-semibold
                            text-slate-900
                            cursor-pointer
                            "
                        >
                            Emergency Call Availability
                        </label>

                        <p className="text-sm text-slate-600 mt-1">

                            I am willing and able to be contacted for
                            emergency care requests or urgent assistance
                            when my services are required.

                        </p>

                        <p className="text-xs text-slate-500 mt-2">

                            Selecting this option indicates that you may
                            receive emergency requests. You are not required
                            to accept every request and should only accept
                            requests that you are qualified and available
                            to perform.

                        </p>

                    </div>

                </div>

            </div>

        </div>




        <div className="mt-6">


        <label className="font-medium">

        Professional Bio

        </label>


        <textarea

        rows="5"

        name="bio"

        value={form.bio}

        onChange={updateField}

        placeholder="Describe your healthcare experience..."

        className="w-full mt-2 border rounded-lg p-4"

        />


        </div>

        <div className="mt-6">


        <label className="font-medium">

        Additional Information

        </label>


        <textarea
            rows="5"
            name="addittionalInfo"
            value={form.addittionalInfo}
            onChange={updateField}
            placeholder="Provide any additional information..."
            className="w-full mt-2 border rounded-lg p-4"
        />


        </div>









        <div className="flex justify-between mt-10">


        <button

        onClick={previous}

        className="px-6 py-3 border rounded-lg"

        >

        ← Back

        </button>



        {
            error && (

            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">

            {error}

            </div>

         )
        }

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