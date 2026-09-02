// "use client";

// import { useState } from "react";
// import {validatePersonal} from "../lib/firebase/validation";

// export default function Step2Personal({
// next,
// previous,
// save,
// data
// }) {
//   const [form,setForm]=useState({

//         ...{
//         firstName:"",
//         lastName:"",
//         phone:"",
//         gender:"",
//         dob:"",
//         address:"",
//         city:"",
//         parish:"",
//         emergencyName:"",
//         emergencyPhone:"",
//         },

//         ...data

// });
//   function updateField(e) {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   }

//   const [error,setError]=useState("");

//   function continueNext(){


//     const validation =
//     validatePersonal(form);



//     if(validation){

//     setError(validation);

//     return;

//     }



//     save(form);

//     next();


//   }

//   return (
//     <div className="bg-white mt-10 rounded-2xl shadow-lg border border-gray-100 p-8">

//       <h2 className="text-2xl font-bold">
//         Personal Information
//       </h2>

//       <p className="text-gray-500 mt-1">
//         Tell us a little about yourself.
//       </p>

//       <div className="grid md:grid-cols-2 gap-6 mt-8">

//         <div>
//           <label className="font-medium">First Name</label>
//           <input
//             name="firstName"
//             value={form.firstName}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Last Name</label>
//           <input
//             name="lastName"
//             value={form.lastName}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Phone Number</label>
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Gender</label>

//           <select
//             name="gender"
//             value={form.gender}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Prefer not to say</option>
//           </select>
//         </div>

//         <div>
//           <label className="font-medium">Date of Birth</label>

//           <input
//             type="date"
//             name="dob"
//             value={form.dob}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//         <div>
//           <label className="font-medium">City / Town</label>

//           <input
//             name="city"
//             value={form.city}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//       </div>

//       <div className="mt-6">
//         <label className="font-medium">Home Address</label>

//         <textarea
//           rows={3}
//           name="address"
//           value={form.address}
//           onChange={updateField}
//           className="w-full mt-2 border rounded-lg p-4"
//         />
//       </div>

//       <div className="grid md:grid-cols-2 gap-6 mt-6">

//         <div>
//           <label className="font-medium">Parish</label>

//           <select
//             name="parish"
//             value={form.parish}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           >
//             <option value="">Select Parish</option>
//             <option>Kingston</option>
//             <option>St. Andrew</option>
//             <option>St. Catherine</option>
//             <option>Clarendon</option>
//             <option>Manchester</option>
//             <option>St. Elizabeth</option>
//             <option>Westmoreland</option>
//             <option>Hanover</option>
//             <option>St. James</option>
//             <option>Trelawny</option>
//             <option>St. Ann</option>
//             <option>St. Mary</option>
//             <option>Portland</option>
//             <option>St. Thomas</option>
//           </select>
//         </div>

//         <div />

//       </div>

//       <hr className="my-8" />

//       <h3 className="font-semibold text-lg">
//         Emergency Contact
//       </h3>

//       <div className="grid md:grid-cols-2 gap-6 mt-6">

//         <div>
//           <label className="font-medium">Contact Name</label>

//           <input
//             name="emergencyName"
//             value={form.emergencyName}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Phone Number</label>

//           <input
//             name="emergencyPhone"
//             value={form.emergencyPhone}
//             onChange={updateField}
//             className="w-full mt-2 border rounded-lg h-12 px-4"
//           />
//         </div>

//       </div>

//       {
//         error && (

//         <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">

//         {error}

//         </div>

//         )
//       }

//       <div className="flex justify-between mt-10">

//         <button
//           onClick={previous}
//           className="px-6 py-3 rounded-lg border"
//         >
//           ← Back
//         </button>

//         <button
//         //   onClick={()=>{

//         //     save(form);

//         //     next();

//         // }}
//           onClick={continueNext}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"
//         >
//           Continue →
//         </button>

//       </div>

//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { validatePersonal } from "../lib/firebase/validation";

export default function Step2Personal({
    next,
    previous,
    save,
    data
}) {

    // const [form, setForm] = useState({

    //     accountType: data?.accountType || "",

    //     // Individual
    //     firstName: data?.firstName || "",
    //     lastName: data?.lastName || "",
    //     phone: data?.phone || "",
    //     gender: data?.gender || "",
    //     dob: data?.dob || "",

    //     // Business
    //     businessName: data?.businessName || "",
    //     registrationNumber: data?.registrationNumber || "",
    //     businessPhone: data?.businessPhone || "",
    //     businessEmail: data?.businessEmail || "",

    //     // Address
    //     address: data?.address || "",
    //     city: data?.city || "",
    //     parish: data?.parish || "",

    //     // Individual emergency contact
    //     emergencyName: data?.emergencyName || "",
    //     emergencyPhone: data?.emergencyPhone || "",

    //     // Business contact person
    //     contactName: data?.contactName || "",
    //     contactPhone: data?.contactPhone || "",

    // });


    const [form, setForm] = useState({
        accountType: data?.accountType || "",

        // Individual
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        phone: data?.phone || "",
        gender: data?.gender || "",
        nationality: data?.nationality || "",
        dob: data?.dob || "",

        // Business
        businessName: data?.businessName || "",
        registrationNumber: data?.registrationNumber || "",
        businessPhone: data?.businessPhone || "",
        businessEmail: data?.businessEmail || "",

        // Address
        address: data?.address || "",
        city: data?.city || "",
        parish: data?.parish || "",

        // Individual emergency contact
        emergencyName: data?.emergencyName || "",
        emergencyPhone: data?.emergencyPhone || "",

        // Business contact person
        contactName: data?.contactName || "",
        contactPhone: data?.contactPhone || "",
    });



    const [error, setError] = useState("");



    function updateField(e) {

        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    }



    function selectAccountType(type) {

        setError("");

        setForm(prev => ({
            ...prev,
            accountType: type
        }));

    }



    function continueNext() {

        setError("");

        if (!form.accountType) {

            setError(
                "Please select whether you are registering as an individual or a business."
            );

            return;
        }



        /*
        |--------------------------------------------------------------------------
        | Individual validation
        |--------------------------------------------------------------------------
        */

        if (form.accountType === "individual") {

            const validation = validatePersonal(form);

            if (validation) {

                setError(validation);

                return;

            }

        }



        /*
        |--------------------------------------------------------------------------
        | Business validation
        |--------------------------------------------------------------------------
        */

        if (form.accountType === "business") {

            if (!form.businessName.trim()) {

                setError("Please enter your business name.");

                return;

            }

            if (!form.businessPhone.trim()) {

                setError("Please enter your business phone number.");

                return;

            }

            if (!form.businessEmail.trim()) {

                setError("Please enter your business email address.");

                return;

            }

            if (!form.address.trim()) {

                setError("Please enter your business address.");

                return;

            }

            if (!form.city.trim()) {

                setError("Please enter your city or town.");

                return;

            }

            if (!form.parish) {

                setError("Please select your parish.");

                return;

            }

        }



        save(form);

        next();

    }



    return (

        <div className="
        bg-white
        mt-10
        rounded-2xl
        shadow-lg
        border
        border-gray-100
        p-8
        ">


            {/* Header */}

            <h2 className="text-2xl font-bold">

                Personal Information

            </h2>

            <p className="text-gray-500 mt-1">

                Tell us a little about yourself or your organization.

            </p>



            {/* ========================================================= */}
            {/* ACCOUNT TYPE */}
            {/* ========================================================= */}

            <div className="mt-8">

                <label className="font-semibold text-lg">

                    How are you registering?

                </label>

                <p className="text-sm text-gray-500 mt-1">

                    Select the type of account you are creating.

                </p>


                <div className="
                grid
                md:grid-cols-2
                gap-4
                mt-4
                ">


                    {/* Individual */}

                    <button

                        type="button"

                        onClick={() =>
                            selectAccountType("individual")
                        }

                        className={`
                        text-left
                        rounded-2xl
                        border-2
                        p-5
                        transition-all
                        ${
                            form.accountType === "individual"
                                ? "border-emerald-500 bg-emerald-50 shadow-sm"
                                : "border-gray-200 hover:border-emerald-300"
                        }
                        `}

                    >

                        <div className="flex items-center gap-3">

                            <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-emerald-100
                            flex
                            items-center
                            justify-center
                            text-xl
                            ">

                                👤

                            </div>

                            <div>

                                <h3 className="font-bold">

                                    Individual

                                </h3>

                                <p className="text-sm text-gray-500">

                                    I am registering as an individual.

                                </p>

                            </div>

                        </div>

                    </button>



                    {/* Business */}

                    <button

                        type="button"

                        onClick={() =>
                            selectAccountType("business")
                        }

                        className={`
                        text-left
                        rounded-2xl
                        border-2
                        p-5
                        transition-all
                        ${
                            form.accountType === "business"
                                ? "border-emerald-500 bg-emerald-50 shadow-sm"
                                : "border-gray-200 hover:border-emerald-300"
                        }
                        `}

                    >

                        <div className="flex items-center gap-3">

                            <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-emerald-100
                            flex
                            items-center
                            justify-center
                            text-xl
                            ">

                                🏢

                            </div>

                            <div>

                                <h3 className="font-bold">

                                    Business

                                </h3>

                                <p className="text-sm text-gray-500">

                                    I am registering on behalf of a business.

                                </p>

                            </div>

                        </div>

                    </button>


                </div>

            </div>



            {/* ========================================================= */}
            {/* INDIVIDUAL */}
            {/* ========================================================= */}

            {
                form.accountType === "individual" && (

                    <>

                        <div className="
                        mt-8
                        pt-8
                        border-t
                        ">

                            <h3 className="text-lg font-semibold">

                                Personal Details

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                                Enter your personal information.

                            </p>


                            <div className="
                                grid
                                md:grid-cols-2
                                lg:grid-cols-3
                                gap-6
                                mt-6
                            ">


                                {/* First Name */}

                                <div>

                                    <label className="font-medium">

                                        First Name

                                    </label>

                                    <input

                                        name="firstName"

                                        value={form.firstName}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>



                                {/* Last Name */}

                                <div>

                                    <label className="font-medium">

                                        Last Name

                                    </label>

                                    <input

                                        name="lastName"

                                        value={form.lastName}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>



                                {/* Phone */}

                                <div>

                                    <label className="font-medium">

                                        Phone Number

                                    </label>

                                    <input

                                        name="phone"

                                        value={form.phone}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>



                                {/* Gender */}

                                <div>

                                    <label className="font-medium">

                                        Gender

                                    </label>

                                    <select

                                        name="gender"

                                        value={form.gender}

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

                                            Select Gender

                                        </option>

                                        <option>

                                            Male

                                        </option>

                                        <option>

                                            Female

                                        </option>

                                        <option>

                                            Prefer not to say

                                        </option>

                                    </select>

                                </div>

                                {/* Nationality */} 
                                {/* <div> 
                                    <label className="font-medium"> 
                                        Nationality 
                                    </label> 
                                    <input type="text" name="nationality" value={form.nationality} onChange={updateField} placeholder="e.g. Jamaican" className=" w-full mt-2 border rounded-lg h-12 px-4 " /> 
                                </div> */}

                                {/* Nationality */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nationality
                                    </label>

                                    <select
                                        name="nationality"
                                        value={form.nationality}
                                        onChange={updateField}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3
                                                text-gray-900 focus:border-emerald-500 focus:ring-2
                                                focus:ring-emerald-200 outline-none"
                                    >
                                        <option value="">Select nationality</option>

                                        <option value="Jamaican">Jamaican</option>
                                        <option value="American">American / United States</option>
                                        <option value="Canadian">Canadian</option>
                                        <option value="British">British / United Kingdom</option>

                                        <optgroup label="Caribbean">
                                        <option value="Trinidadian & Tobagonian">
                                            Trinidadian & Tobagonian
                                        </option>
                                        <option value="Haitian">Haitian</option>
                                        <option value="Cuban">Cuban</option>
                                        <option value="Dominican">Dominican</option>
                                        <option value="Dominican Republic">
                                            Dominican Republic
                                        </option>
                                        <option value="Guyanese">Guyanese</option>
                                        <option value="Barbadian">Barbadian</option>
                                        <option value="Bahamian">Bahamian</option>
                                        <option value="Grenadian">Grenadian</option>
                                        <option value="Vincentian">Vincentian</option>
                                        <option value="Saint Lucian">Saint Lucian</option>
                                        <option value="Antiguan & Barbudan">
                                            Antiguan & Barbudan
                                        </option>
                                        <option value="Belizean">Belizean</option>
                                        </optgroup>

                                        <optgroup label="North & South America">
                                        <option value="Mexican">Mexican</option>
                                        <option value="Brazilian">Brazilian</option>
                                        <option value="Colombian">Colombian</option>
                                        <option value="Venezuelan">Venezuelan</option>
                                        </optgroup>

                                        <optgroup label="Europe">
                                        <option value="German">German</option>
                                        <option value="French">French</option>
                                        <option value="Italian">Italian</option>
                                        <option value="Spanish">Spanish</option>
                                        <option value="Dutch">Dutch</option>
                                        <option value="Irish">Irish</option>
                                        </optgroup>

                                        <optgroup label="Asia">
                                        <option value="Indian">Indian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Filipino">Filipino</option>
                                        </optgroup>

                                        <optgroup label="Africa">
                                        <option value="Nigerian">Nigerian</option>
                                        <option value="South African">South African</option>
                                        </optgroup>

                                        <optgroup label="Oceania">
                                        <option value="Australian">Australian</option>
                                        <option value="New Zealander">New Zealander</option>
                                        </optgroup>

                                        <option value="Other">Other</option>
                                    </select>
                                </div>



                                {/* DOB */}

                                <div>

                                    <label className="font-medium">

                                        Date of Birth

                                    </label>

                                    <input

                                        type="date"

                                        name="dob"

                                        value={form.dob}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>

                            </div>

                        </div>



                        {/* Individual Address */}

                        <div className="mt-8">

                            <h3 className="font-semibold text-lg">

                                Address

                            </h3>


                            <div className="mt-5">

                                <label className="font-medium">

                                    Home Address

                                </label>

                                <textarea

                                    rows={3}

                                    name="address"

                                    value={form.address}

                                    onChange={updateField}

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    p-4
                                    "

                                />

                            </div>


                            <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                            mt-6
                            ">

                                <div>

                                    <label className="font-medium">

                                        City / Town

                                    </label>

                                    <input

                                        name="city"

                                        value={form.city}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>


                                <div>

                                    <label className="font-medium">

                                        Parish

                                    </label>

                                    <ParishSelect
                                        value={form.parish}
                                        onChange={updateField}
                                    />

                                </div>

                            </div>

                        </div>



                        {/* Emergency Contact */}

                        <div className="
                        mt-8
                        pt-8
                        border-t
                        ">

                            <h3 className="font-semibold text-lg">

                                Emergency Contact

                            </h3>

                            <p className="text-sm text-gray-500 mt-1">

                                Someone we can contact in case of an emergency.

                            </p>


                            <div className="
                            grid
                            md:grid-cols-2
                            gap-6
                            mt-6
                            ">

                                <div>

                                    <label className="font-medium">

                                        Contact Name

                                    </label>

                                    <input

                                        name="emergencyName"

                                        value={form.emergencyName}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>


                                <div>

                                    <label className="font-medium">

                                        Phone Number

                                    </label>

                                    <input

                                        name="emergencyPhone"

                                        value={form.emergencyPhone}

                                        onChange={updateField}

                                        className="
                                        w-full
                                        mt-2
                                        border
                                        rounded-lg
                                        h-12
                                        px-4
                                        "

                                    />

                                </div>

                            </div>

                        </div>

                    </>

                )
            }



            {/* ========================================================= */}
            {/* BUSINESS */}
            {/* ========================================================= */}

            {
                form.accountType === "business" && (

                    <div className="
                    mt-8
                    pt-8
                    border-t
                    ">

                        <h3 className="text-lg font-semibold">

                            Business Information

                        </h3>

                        <p className="text-sm text-gray-500 mt-1">

                            Tell us about the organization you are registering.

                        </p>


                        <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                        mt-6
                        ">


                            {/* Business Name */}

                            <div className="md:col-span-2">

                                <label className="font-medium">

                                    Business Name

                                </label>

                                <input

                                    name="businessName"

                                    value={form.businessName}

                                    onChange={updateField}

                                    placeholder="e.g. Karema Care Services Ltd."

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>



                            {/* Registration Number */}

                            <div>

                                <label className="font-medium">

                                    Business Registration Number

                                </label>

                                <input

                                    name="registrationNumber"

                                    value={form.registrationNumber}

                                    onChange={updateField}

                                    placeholder="Optional"

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>



                            {/* Business Phone */}

                            <div>

                                <label className="font-medium">

                                    Business Phone

                                </label>

                                <input

                                    name="businessPhone"

                                    value={form.businessPhone}

                                    onChange={updateField}

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>



                            {/* Business Email */}

                            <div>

                                <label className="font-medium">

                                    Business Email

                                </label>

                                <input

                                    type="email"

                                    name="businessEmail"

                                    value={form.businessEmail}

                                    onChange={updateField}

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>



                            {/* Contact Person */}

                            <div>

                                <label className="font-medium">

                                    Primary Contact Person

                                </label>

                                <input

                                    name="contactName"

                                    value={form.contactName}

                                    onChange={updateField}

                                    placeholder="Full name"

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>



                            {/* Contact Phone */}

                            <div>

                                <label className="font-medium">

                                    Contact Phone

                                </label>

                                <input

                                    name="contactPhone"

                                    value={form.contactPhone}

                                    onChange={updateField}

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>

                        </div>



                        {/* Business Address */}

                        <div className="mt-6">

                            <label className="font-medium">

                                Business Address

                            </label>

                            <textarea

                                rows={3}

                                name="address"

                                value={form.address}

                                onChange={updateField}

                                className="
                                w-full
                                mt-2
                                border
                                rounded-lg
                                p-4
                                "

                            />

                        </div>



                        <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                        mt-6
                        ">

                            <div>

                                <label className="font-medium">

                                    City / Town

                                </label>

                                <input

                                    name="city"

                                    value={form.city}

                                    onChange={updateField}

                                    className="
                                    w-full
                                    mt-2
                                    border
                                    rounded-lg
                                    h-12
                                    px-4
                                    "

                                />

                            </div>


                            <div>

                                <label className="font-medium">

                                    Parish

                                </label>

                                <ParishSelect
                                    value={form.parish}
                                    onChange={updateField}
                                />

                            </div>

                        </div>

                    </div>

                )
            }



            {/* Error */}

            {
                error && (

                    <div className="
                    mt-6
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

            <div className="flex justify-between mt-10">

                <button

                    type="button"

                    onClick={previous}

                    className="
                    px-6
                    py-3
                    rounded-lg
                    border
                    hover:bg-gray-50
                    "

                >

                    ← Back

                </button>


                <button

                    type="button"

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



/* ========================================================= */
/* PARISH SELECT */
/* ========================================================= */

function ParishSelect({
    value,
    onChange
}) {

    return (

        <select

            name="parish"

            value={value}

            onChange={onChange}

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

                Select Parish

            </option>

            <option>Kingston</option>
            <option>St. Andrew</option>
            <option>St. Catherine</option>
            <option>Clarendon</option>
            <option>Manchester</option>
            <option>St. Elizabeth</option>
            <option>Westmoreland</option>
            <option>Hanover</option>
            <option>St. James</option>
            <option>Trelawny</option>
            <option>St. Ann</option>
            <option>St. Mary</option>
            <option>Portland</option>
            <option>St. Thomas</option>

        </select>

    );

}