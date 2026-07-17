// "use client";

// import { useState } from "react";


// export default function Step3Professional({ next, previous }) {


//     const [form, setForm] = useState({

//         profession: "",
//         licenseNumber: "",
//         employer: "",
//         experience: "",
//         qualifications: "",
//         specialization: [],
//         languages: "",
//         bio: "",

//     });



//     function updateField(e){

//         setForm({

//             ...form,

//             [e.target.name]: e.target.value

//         });

//     }



//     function toggleSpecialization(value){

//         if(form.specialization.includes(value)){

//             setForm({

//                 ...form,

//                 specialization:
//                 form.specialization.filter(
//                     item => item !== value
//                 )

//             });


//         }else{


//             setForm({

//                 ...form,

//                 specialization:[
//                     ...form.specialization,
//                     value
//                 ]

//             });

//         }

//     }



//     return (

//     <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


//         <h2 className="text-2xl font-bold">

//             Professional Information

//         </h2>


//         <p className="text-gray-500 mt-1">

//             Tell us about your healthcare experience.

//         </p>



//         <div className="grid md:grid-cols-2 gap-6 mt-8">



//             {/* Profession */}

//             <div>

//                 <label className="font-medium">

//                     Profession

//                 </label>


//                 <select

//                     name="profession"

//                     value={form.profession}

//                     onChange={updateField}

//                     className="w-full mt-2 border rounded-lg h-12 px-4"

//                 >

//                     <option value="">

//                         Select Profession

//                     </option>

//                     <option>
//                         Registered Nurse
//                     </option>

//                     <option>
//                         Caregiver
//                     </option>

//                     <option>
//                         Doctor
//                     </option>

//                     <option>
//                         Physiotherapist
//                     </option>

//                     <option>
//                         Therapist
//                     </option>

//                     <option>
//                         Medical Assistant
//                     </option>


//                 </select>


//             </div>




//             {/* License */}

//             <div>

//                 <label className="font-medium">

//                     License / Registration Number

//                 </label>


//                 <input

//                     name="licenseNumber"

//                     value={form.licenseNumber}

//                     onChange={updateField}

//                     placeholder="Example: RN-123456"

//                     className="w-full mt-2 border rounded-lg h-12 px-4"

//                 />


//             </div>




//             {/* Employer */}

//             <div>

//                 <label className="font-medium">

//                     Current Employer

//                 </label>


//                 <input

//                     name="employer"

//                     value={form.employer}

//                     onChange={updateField}

//                     placeholder="Hospital / Clinic / Private"

//                     className="w-full mt-2 border rounded-lg h-12 px-4"

//                 />


//             </div>




//             {/* Experience */}

//             <div>

//                 <label className="font-medium">

//                     Years of Experience

//                 </label>


//                 <select

//                     name="experience"

//                     value={form.experience}

//                     onChange={updateField}

//                     className="w-full mt-2 border rounded-lg h-12 px-4"

//                 >

//                     <option value="">

//                         Select Years

//                     </option>

//                     <option>
//                         Less than 1 year
//                     </option>

//                     <option>
//                         1 - 3 years
//                     </option>

//                     <option>
//                         4 - 7 years
//                     </option>

//                     <option>
//                         8 - 10 years
//                     </option>

//                     <option>
//                         10+ years
//                     </option>


//                 </select>


//             </div>


//         </div>





//         {/* Qualifications */}

//         <div className="mt-6">


//             <label className="font-medium">

//                 Qualifications

//             </label>


//             <textarea

//                 rows="3"

//                 name="qualifications"

//                 value={form.qualifications}

//                 onChange={updateField}

//                 placeholder="Example: Bachelor of Nursing, CPR Certified..."

//                 className="w-full mt-2 border rounded-lg p-4"

//             />


//         </div>






//         {/* Specialization */}

//         <div className="mt-8">


//             <label className="font-medium">

//                 Areas of Specialization

//             </label>


//             <div className="grid md:grid-cols-3 gap-3 mt-4">


//             {
//                 [
//                     "Elderly Care",
//                     "Pediatric Care",
//                     "Emergency Care",
//                     "Mental Health",
//                     "Home Care",
//                     "Post Surgery",
//                 ]

//                 .map(item => (


//                     <button

//                     type="button"

//                     key={item}

//                     onClick={()=>toggleSpecialization(item)}

//                     className={

//                     form.specialization.includes(item)

//                     ?

//                     "border bg-emerald-500 text-white rounded-lg p-3"

//                     :

//                     "border rounded-lg p-3"

//                     }

//                     >

//                         {item}

//                     </button>


//                 ))

//             }


//             </div>


//         </div>





//         {/* Languages */}

//         <div className="mt-8">


//             <label className="font-medium">

//                 Languages Spoken

//             </label>


//             <input

//                 name="languages"

//                 value={form.languages}

//                 onChange={updateField}

//                 placeholder="English, Spanish, French..."

//                 className="w-full mt-2 border rounded-lg h-12 px-4"

//             />


//         </div>






//         {/* Bio */}

//         <div className="mt-6">


//             <label className="font-medium">

//                 Professional Bio

//             </label>


//             <textarea

//                 rows="5"

//                 name="bio"

//                 value={form.bio}

//                 onChange={updateField}

//                 placeholder="Describe your healthcare experience..."

//                 className="w-full mt-2 border rounded-lg p-4"

//             />


//         </div>






//         {/* Buttons */}

//         <div className="flex justify-between mt-10">


//             <button

//                 onClick={previous}

//                 className="px-6 py-3 border rounded-lg"

//             >

//                 ← Back

//             </button>




//             <button

//                 onClick={next}

//                 className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"

//             >

//                 Continue →

//             </button>



//         </div>



//     </div>

//     );

// }

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


    

const [form,setForm] = useState({

    profession:"",
    licenseNumber:"",
    employer:"",
    experience:"",
    qualifications:"",
    specialization:[],
    languages:"",
    bio:"",

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
        Doctor
        </option>

        <option>
        Therapist
        </option>

        <option>
        Medical Assistant
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

        <label className="font-medium">

        License / Registration Number (If Applicable)

        </label>


        <input

        name="licenseNumber"

        value={form.licenseNumber}

        onChange={updateField}

        placeholder="RN-123456"

        className="w-full mt-2 border rounded-lg h-12 px-4"

        />


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