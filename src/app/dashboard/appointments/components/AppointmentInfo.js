"use client";

import {
Calendar,
Clock,
Briefcase,
MapPin
} from "lucide-react";

export default function AppointmentInfo({ appointment }) {

    return (

        <div className="grid md:grid-cols-2 gap-5 mt-8">

            <Card
                icon={<Calendar />}
                title="Appointment Date"
                value={appointment.appointmentDate}
            />

            <Card
                icon={<Clock />}
                title="Appointment Time"
                value={appointment.appointmentTime}
            />

            <Card
                icon={<Briefcase />}
                title="Requested Service"
                value={appointment.service}
            />

            <Card
                icon={<MapPin />}
                title="Address"
                value={appointment.address || "Not provided"}
            />

        </div>

    );

}

function Card({

    icon,

    title,

    value

}){

    return(

        <div className="bg-white rounded-2xl border p-5">

            <div className="flex items-center gap-2 text-emerald-600">

                {icon}

                <span className="font-semibold">

                    {title}

                </span>

            </div>

            <p className="mt-4 text-lg">

                {value}

            </p>

        </div>

    );

}