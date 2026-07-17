"use client";

import { useState } from "react";
import {validatePersonal} from "../lib/firebase/validation";

export default function Step2Personal({
next,
previous,
save,
data
}) {
  const [form,setForm]=useState({

        ...{
        firstName:"",
        lastName:"",
        phone:"",
        gender:"",
        dob:"",
        address:"",
        city:"",
        parish:"",
        emergencyName:"",
        emergencyPhone:"",
        },

        ...data

});
  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const [error,setError]=useState("");

  function continueNext(){


    const validation =
    validatePersonal(form);



    if(validation){

    setError(validation);

    return;

    }



    save(form);

    next();


  }

  return (
    <div className="bg-white mt-10 rounded-2xl shadow-lg border border-gray-100 p-8">

      <h2 className="text-2xl font-bold">
        Personal Information
      </h2>

      <p className="text-gray-500 mt-1">
        Tell us a little about yourself.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>
          <label className="font-medium">First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

        <div>
          <label className="font-medium">Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

        <div>
          <label className="font-medium">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

        <div>
          <label className="font-medium">Gender</label>

          <select
            name="gender"
            value={form.gender}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Date of Birth</label>

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

        <div>
          <label className="font-medium">City / Town</label>

          <input
            name="city"
            value={form.city}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

      </div>

      <div className="mt-6">
        <label className="font-medium">Home Address</label>

        <textarea
          rows={3}
          name="address"
          value={form.address}
          onChange={updateField}
          className="w-full mt-2 border rounded-lg p-4"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>
          <label className="font-medium">Parish</label>

          <select
            name="parish"
            value={form.parish}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          >
            <option value="">Select Parish</option>
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
        </div>

        <div />

      </div>

      <hr className="my-8" />

      <h3 className="font-semibold text-lg">
        Emergency Contact
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>
          <label className="font-medium">Contact Name</label>

          <input
            name="emergencyName"
            value={form.emergencyName}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

        <div>
          <label className="font-medium">Phone Number</label>

          <input
            name="emergencyPhone"
            value={form.emergencyPhone}
            onChange={updateField}
            className="w-full mt-2 border rounded-lg h-12 px-4"
          />
        </div>

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
          className="px-6 py-3 rounded-lg border"
        >
          ← Back
        </button>

        <button
        //   onClick={()=>{

        //     save(form);

        //     next();

        // }}
          onClick={continueNext}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"
        >
          Continue →
        </button>

      </div>

    </div>
  );
}