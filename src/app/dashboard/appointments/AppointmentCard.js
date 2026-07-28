"use client";

import Link from "next/link";

export default function AppointmentCard({

    appointment

}) {

    return (

        <Link

            href={`/dashboard/appointments/${appointment.id}`}

        >

            <div className="bg-white rounded-2xl border shadow p-6 hover:shadow-lg transition">

                <div className="flex justify-between">

                    <div>

                        <h2 className="font-bold text-xl">

                            {appointment.workerName}

                        </h2>

                        <p className="text-gray-500">

                            {appointment.service}

                        </p>

                    </div>

                    <span className="capitalize">

                        {appointment.status}

                    </span>

                </div>

                <div className="mt-4 text-gray-600">

                    📅 {appointment.appointmentDate}

                </div>

                <div>

                    🕘 {appointment.appointmentTime}

                </div>

            </div>

        </Link>

    );

}