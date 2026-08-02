// "use client";

// import { useState } from "react";


// export default function ProfileEditModal({
//     profile,
//     onClose,
//     onSave
// }) {


//     const [form,setForm] = useState({

//         firstName:
//         profile.personal?.firstName || "",

//         lastName:
//         profile.personal?.lastName || "",

//         phone:
//         profile.personal?.phone || "",

//         profession:
//         profile.professional?.profession || "",

//         experience:
//         profile.professional?.yearsExperience || "",

//         qualification:
//         profile.professional?.qualification || "",

//         bio:
//         profile.professional?.bio || "",

//         hourlyRate:
//         profile.rates?.hourly || "",

//         dailyRate:
//         profile.rates?.daily || "",

//     });



//     const updateField=(field,value)=>{


//     setForm(prev=>({

//     ...prev,

//     [field]:value


//     }));

//     };



//     const handleSubmit=(e)=>{

//     e.preventDefault();


//     onSave({

//     personal:{

//     firstName:form.firstName,

//     lastName:form.lastName,

//     phone:form.phone

//     },


//     professional:{

//     profession:form.profession,

//     yearsExperience:form.experience,

//     qualification:form.qualification,

//     bio:form.bio

//     },


//     rates:{

//     hourly:Number(form.hourlyRate),

//     daily:Number(form.dailyRate)

//     }



//     });


//     };



//     return (

//     <div className="
//     fixed inset-0
//     bg-black/40
//     flex
//     items-center
//     justify-center
//     z-50
//     ">


//     <div className="
//     bg-white
//     rounded-3xl
//     shadow-xl
//     w-full
//     max-w-2xl
//     p-8
//     max-h-[90vh]
//     overflow-y-auto
//     ">


//     <h2 className="
//     text-2xl
//     font-bold
//     mb-6
//     ">

//     Edit Professional Profile

//     </h2>



//     <form
//     onSubmit={handleSubmit}
//     className="space-y-4"
//     >


//     <div className="grid md:grid-cols-2 gap-4">


//     <input
//     className="input"
//     placeholder="First Name"
//     value={form.firstName}
//     onChange={
//     e=>updateField(
//     "firstName",
//     e.target.value
//     )
//     }
//     />


//     <input
//     className="input"
//     placeholder="Last Name"
//     value={form.lastName}
//     onChange={
//     e=>updateField(
//     "lastName",
//     e.target.value
//     )
//     }
//     />


//     </div>



//     <input
//     className="input"
//     placeholder="Phone"
//     value={form.phone}
//     onChange={
//     e=>updateField(
//     "phone",
//     e.target.value
//     )
//     }
//     />



//     <input
//     className="input"
//     placeholder="Profession"
//     value={form.profession}
//     onChange={
//     e=>updateField(
//     "profession",
//     e.target.value
//     )
//     }
//     />



//     <input
//     className="input"
//     placeholder="Years Experience"
//     value={form.experience}
//     onChange={
//     e=>updateField(
//     "experience",
//     e.target.value
//     )
//     }
//     />



//     <input
//     className="input"
//     placeholder="Qualification"
//     value={form.qualification}
//     onChange={
//     e=>updateField(
//     "qualification",
//     e.target.value
//     )
//     }
//     />




//     <textarea

//     className="
//     input
//     h-32
//     "

//     placeholder="Professional Bio"

//     value={form.bio}

//     onChange={
//     e=>updateField(
//     "bio",
//     e.target.value
//     )
//     }

//     />



//     <div className="
//     grid md:grid-cols-2 gap-4
//     ">


//     <input

//     className="input"

//     placeholder="Hourly Rate"

//     value={form.hourlyRate}

//     onChange={
//     e=>updateField(
//     "hourlyRate",
//     e.target.value
//     )
//     }

//     />


//     <input

//     className="input"

//     placeholder="Daily Rate"

//     value={form.dailyRate}

//     onChange={
//     e=>updateField(
//     "dailyRate",
//     e.target.value
//     )
//     }

//     />


//     </div>




//     <div className="
//     flex
//     justify-end
//     gap-3
//     mt-6
//     ">


//     <button

//     type="button"

//     onClick={onClose}

//     className="
//     px-5
//     py-2
//     rounded-xl
//     border
//     "

//     >

//     Cancel

//     </button>



//     <button

//     className="
//     px-5
//     py-2
//     rounded-xl
//     bg-emerald-600
//     text-white
//     "

//     >

//     Save Changes

//     </button>


//     </div>



//     </form>


//     </div>


//     </div>


//     );


// }

"use client";

import { useState } from "react";

import Input from "./components/Input";


export default function ProfileEditModal({
    profile,
    onClose,
    onSave
}) {

    


    const [form,setForm] = useState({


    firstName:
    profile.personal?.firstName || "",


    lastName:
    profile.personal?.lastName || "",


    phone:
    profile.personal?.phone || "",


    address:
    profile.personal?.address || "",


    city:
    profile.personal?.city || "",


    parish:
    profile.personal?.parish || "",



    profession:
    profile.professional?.profession || "",


    licenseNumber:
    profile.professional?.licenseNumber || "",


    experience:
    profile.professional?.experience || "",


    qualifications:
    profile.professional?.qualifications || "",


    languages:
    profile.professional?.languages || "",


    bio:
    profile.professional?.bio || "",



    hourlyRate:
    profile.rates?.hourlyRate || "",


    homeVisitRate:
    profile.rates?.homeVisitRate || "",


    overnightRate:
    profile.rates?.overnightRate || "",


    travelFee:
    profile.rates?.travelFee || "",


    availability:
    profile.rates?.availability || "",


    paymentMethod:
    profile.rates?.paymentMethod || "",

    specialization:
    profile.professional?.specialization || [],


    });





    const updateField=(field,value)=>{


    setForm(prev=>({

    ...prev,

    [field]:value

    }));


    };





    const handleSubmit=(e)=>{


    e.preventDefault();



    onSave({


    personal:{


    firstName:form.firstName,


    lastName:form.lastName,


    phone:form.phone,


    address:form.address,


    city:form.city,


    parish:form.parish


    },



    professional:{


    profession:form.profession,


    licenseNumber:form.licenseNumber,


    experience:form.experience,


    qualifications:form.qualifications,


    languages:form.languages,


    bio:form.bio


    },



    rates:{


    hourlyRate:form.hourlyRate,


    homeVisitRate:form.homeVisitRate,


    overnightRate:form.overnightRate,


    travelFee:form.travelFee,


    availability:form.availability,


    paymentMethod:form.paymentMethod


    }



    });


    };

    const SPECIALIZATIONS = [

        "Elderly Care",
        "Home Care",
        "Pediatric Care",
        "Emergency Care",
        "Post Surgery",
        "Dementia Care",
        "Disability Support",
        "Mental Health",
        "Palliative Care",
        "Hospice Care",
        "ICU",
        "Medical/Surgical",
        "Maternity",
        "Private Duty",
        "Companionship"

    ];

    const toggleSpecialization = (specialization) => {

    setForm(prev => ({

        ...prev,

        specialization: prev.specialization.includes(specialization)

            ? prev.specialization.filter(
                s => s !== specialization
            )

            : [...prev.specialization, specialization]

    }));

};





    return (

    <div className="
    fixed inset-0
    bg-black/40
    flex
    items-center
    justify-center
    z-50
    ">


    <div className="
    bg-white
    rounded-3xl
    shadow-xl
    w-full
    max-w-3xl
    p-8
    max-h-[90vh]
    overflow-y-auto
    ">


    <h2 className="
    text-2xl
    font-bold
    mb-6
    ">

    Edit Professional Profile

    </h2>




    <form
    onSubmit={handleSubmit}
    className="space-y-5"
    >



    <h3 className="font-semibold text-lg">

    Personal Information

    </h3>



    <div className="grid md:grid-cols-2 gap-4">


        <Input

        label="First Name"

        placeholder="Enter first name"

        value={form.firstName}

        onChange={
        e=>updateField(
        "firstName",
        e.target.value
        )
        }

        required

        />


        <Input

        label="Last Name"

        placeholder="Enter last name"

        value={form.lastName}

        onChange={
        e=>updateField(
        "lastName",
        e.target.value
        )
        }

        required

        />


        <Input

        label="Phone Number"

        placeholder="Enter phone number"

        value={form.phone}

        onChange={
        e=>updateField(
        "phone",
        e.target.value
        )
        }

        />

        <Input

        label="City"

        placeholder="Enter city"

        value={form.city}

        onChange={
        e=>updateField(
        "city",
        e.target.value
        )
        }

        />


        <Input

        label="Parish"

        placeholder="Enter parish"

        value={form.parish}

        onChange={
        e=>updateField(
        "parish",
        e.target.value
        )
        }

        />

    </div>



        <div className="space-y-2">

            <label className="
            text-sm
            font-medium
            text-slate-700
            ">

            Address

            </label>


            <textarea

            className="
            border
            rounded-xl
            p-3
            w-full
            h-24
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500
            "

            placeholder="Enter home address"

            value={form.address}

            onChange={
            e=>updateField(
            "address",
            e.target.value
            )
            }

            />


        </div>









        <h3 className="font-semibold text-lg pt-4">

        Professional Information

        </h3>



        <div className="grid md:grid-cols-2 gap-4">



            <Input

            label="Profession"

            placeholder="Example: Registered Nurse"

            value={form.profession}

            onChange={
            e=>updateField(
            "profession",
            e.target.value
            )
            }

            required

            />



            <Input

            label="Professional License Number"

            placeholder="Enter license number"

            value={form.licenseNumber}

            onChange={
            e=>updateField(
            "licenseNumber",
            e.target.value
            )
            }

            />

            <Input

            label="Years of Experience"

            placeholder="Example: 4 - 7 years"

            value={form.experience}

            onChange={
            e=>updateField(
            "experience",
            e.target.value
            )
            }

            />


            <Input

            label="Qualifications"

            placeholder="Example: BSc Nursing, CNA Certificate"

            value={form.qualifications}

            onChange={
            e=>updateField(
            "qualifications",
            e.target.value
            )
            }

            />

            <Input

            label="Languages Spoken"

            placeholder="Example: English, Spanish"

            value={form.languages}

            onChange={
            e=>updateField(
            "languages",
            e.target.value
            )
            }

            />


        </div>



        <div className="space-y-2">


            <label className="
            text-sm
            font-medium
            text-slate-700
            ">

            Professional Biography

            </label>


            <textarea

            className="
            border
            rounded-xl
            p-3
            w-full
            h-32
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500
            "

            placeholder="
            Describe your experience, specialties and approach to care
            "

            value={form.bio}

            onChange={
            e=>updateField(
            "bio",
            e.target.value
            )
            }

            />


        </div>





            <h3 className="font-semibold text-lg pt-4">

            Specializations

            </h3>

            <p className="text-sm text-slate-500 mb-4">

            Select every area you are experienced in.

            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                {SPECIALIZATIONS.map((item) => (

                    <label
                        key={item}
                        className={`
                            cursor-pointer
                            rounded-xl
                            border
                            p-3
                            transition-all
                            ${
                                form.specialization.includes(item)
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-white hover:bg-emerald-50"
                            }
                        `}
                    >

                        <input

                            type="checkbox"

                            checked={form.specialization.includes(item)}

                            onChange={() => toggleSpecialization(item)}

                            className="hidden"

                        />

                        {item}

                    </label>

                ))}

            </div>





        <h3 className="font-semibold text-lg pt-4">

        Rates & Availability

        </h3>



        <div className="grid md:grid-cols-2 gap-4">



            <Input

            label="Hourly Rate"

            placeholder="Example: 1500"

            value={form.hourlyRate}

            onChange={
            e=>updateField(
            "hourlyRate",
            e.target.value
            )
            }

            />


            <Input

            label="Home Visit Rate"

            placeholder="Example: 15000"

            value={form.homeVisitRate}

            onChange={
            e=>updateField(
            "homeVisitRate",
            e.target.value
            )
            }

            />



            <Input

            label="Overnight Rate"

            placeholder="Example: 24000"

            value={form.overnightRate}

            onChange={
            e=>updateField(
            "overnightRate",
            e.target.value
            )
            }

            />


            <Input
            placeholder="Travel Fee"
            value={form.travelFee}
            onChange={e=>updateField(
            "travelFee",
            e.target.value
            )}
            />



            <Input

            label="Travel Fee"

            placeholder="Example: 5000"

            value={form.travelFee}

            onChange={
            e=>updateField(
            "travelFee",
            e.target.value
            )
            }

            />


            <Input

            label="Availability"

            placeholder="Example: Weekdays, Weekends"

            value={form.availability}

            onChange={
            e=>updateField(
            "availability",
            e.target.value
            )
            }

            />


            <Input

            label="Preferred Payment Method"

            placeholder="Example: Bank Transfer"

            value={form.paymentMethod}

            onChange={
            e=>updateField(
            "paymentMethod",
            e.target.value
            )
            }

            />


        </div>





        <div className="
        flex
        justify-end
        gap-3
        pt-6
        ">



        <button

        type="button"

        onClick={onClose}

        className="
        px-5
        py-2
        rounded-xl
        border
        "

        >

        Cancel

        </button>




        <button

        className="
        px-5
        py-2
        rounded-xl
        bg-emerald-600
        text-white
        "

        >

        Save Changes

        </button>


        </div>



    </form>


    </div>


    </div>


    );

}
