"use client";

import { useState } from "react";

export default function AdminRenewSubscriptionModal({

    worker,

    onClose,

    onSave

}){

    const [date,setDate]=useState("");

    return(

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl w-full max-w-lg p-8">

                <h2 className="text-2xl font-bold">

                    Renew Subscription

                </h2>

                <p className="text-gray-500 mt-2">

                    {worker.personal?.firstName} {worker.personal?.lastName}

                </p>

                <label className="block mt-6 font-medium">

                    New Expiry Date

                </label>

                <input

                    type="date"

                    className="w-full border rounded-xl p-3 mt-2"

                    value={date}

                    onChange={e=>setDate(e.target.value)}

                />

                <div className="flex justify-end gap-3 mt-8">

                    <button

                        onClick={onClose}

                        className="border rounded-xl px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={()=>onSave(date)}

                        className="bg-emerald-600 text-white rounded-xl px-5 py-2"

                    >

                        Renew Subscription

                    </button>

                </div>

            </div>

        </div>

    );

}