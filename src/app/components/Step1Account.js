"use client";

import { useState } from "react";
import {validateAccount} from "../lib/firebase/validation";

export default function Step1Account({
    next,
    save,
    data
}) {

    console.log({
    next,
    save,
    data
})

const [error,setError] = useState("");

        const [form,setForm]=useState({

        email:data.email || "",

        password:data.password || "",

        confirm:data.confirm || ""

    });

    function updateField(e){

        setForm({

        ...form,

        [e.target.name]:e.target.value

        });

    }

    function continueNext(){


const validation =
validateAccount(form);



if(validation){

    setError(validation);

    return;

}



save(form);

next();


}

    return (

        <div className="bg-white mt-10 rounded-2xl shadow border p-8">

            <h2 className="text-2xl font-bold">

                Account

            </h2>

            <p className="text-gray-500 mt-1">

                Create your login credentials.

            </p>

            <div className="space-y-6 mt-8">

                <div>

                    <label>Email</label>

                    <input

                        name="email"

                        type="email"

                        value={form.email}

                        onChange={updateField}

                        className="w-full mt-2 border rounded-lg h-12 px-4"

                        />

                </div>

                <div>

                    <label>Password</label>

                    <input

                    name="password"

                    type="password"

                    value={form.password}

                    onChange={updateField}

                    className="w-full mt-2 border rounded-lg h-12 px-4"

                    />

                </div>

                <div>

                    <label>Confirm Password</label>

                    <input

                    name="confirm"

                    type="password"

                    value={form.confirm}

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

            <div className="flex justify-end mt-8">
                

                <button
                    // onClick={()=>{

                    // save(form);

                    // next();

                    // }}
                    onClick={continueNext}
                    className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-lg text-white"
                >

                    Continue →

                </button>

            </div>

        </div>

    );

}