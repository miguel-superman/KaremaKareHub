"use client";

export default function AppointmentStatus({ status }) {

    const colors = {

        Pending:
            "bg-yellow-100 text-yellow-700",

        Accepted:
            "bg-green-100 text-green-700",

        Travelling:
            "bg-blue-100 text-blue-700",

        Arrived:
            "bg-indigo-100 text-indigo-700",

        Started:
            "bg-purple-100 text-purple-700",

        Completed:
            "bg-emerald-100 text-emerald-700",

        Cancelled:
            "bg-red-100 text-red-700"

    };

    return (

        <div className="mt-8">

            <span
                className={`px-5 py-2 rounded-full font-semibold ${colors[status]}`}
            >

                {status}

            </span>

        </div>

    );

}