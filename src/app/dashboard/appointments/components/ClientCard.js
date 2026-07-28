"use client";

export default function ClientCard({ appointment }) {

    return (

        <div className="bg-white rounded-3xl border shadow-sm p-6">

            <div className="flex items-center gap-5">

                <img
                    src={appointment.clientImage || "/avatar.png"}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border"
                />

                <div>

                    <h2 className="text-2xl font-bold">

                        {appointment.clientName || "Client"}

                    </h2>

                    <p className="text-gray-500">

                        {appointment.clientPhone || "No phone number"}

                    </p>

                </div>

            </div>

        </div>

    );

}