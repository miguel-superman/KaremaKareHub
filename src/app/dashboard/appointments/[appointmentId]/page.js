"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ClientCard from "../components/ClientCard";
import QuickActions from "../components/QuickActions";
import AppointmentStatus from "../components/AppointmentStatus";
import AppointmentInfo from "../components/AppointmentInfo";
import CareNotes from "../components/CareNotes";
// import ActionButtons from "../components/ActionButtons";

import { Button } from "@/components/ui/button";

import {
    getAppointment,
    updateAppointmentStatus
} from "@/app/lib/appointments/appointmentService";
import Navbar from "@/app/components/Navbar";

export default function AppointmentDetailsPage() {

    const params = useParams();

    console.log(params);

    const appointmentId = params.appointmentId;

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadAppointment() {

            const data = await getAppointment(appointmentId);

            setAppointment(data);

            setLoading(false);

        }

        if (appointmentId) {
            loadAppointment();
        }

    }, [appointmentId]);

    async function changeStatus(status) {

        await updateAppointmentStatus(
            appointmentId,
            status
        );

        setAppointment(prev => ({
            ...prev,
            status
        }));

    }

    if (loading) {

        return (

            <div className="p-10">

                Loading appointment...

            </div>

        );

    }

    if (!appointment) {

        return (

            <div className="p-10">

                Appointment not found.

            </div>

        );

    }

    return (

        <>
            <Navbar />
            <div className="max-w-5xl mx-auto p-8">
            

            {/* <div className="bg-white rounded-3xl shadow border p-6">

            <div className="flex gap-5">

                <img
                    src={appointment.clientImage || "/avatar.png"}
                    className="w-20 h-20 rounded-full object-cover"
                />

                <div>

                    <h2 className="text-2xl font-bold">

                        {appointment.clientName}

                        James

                    </h2>

                    <p>

                        {appointment.clientPhone}
                        18764323

                    </p>

                </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4">

                <Button>

                📞 Call Client

                </Button>

                <Button>

                💬 Message Client

                </Button>

                <Button>

                📍 View Address

                </Button>

            </div>

            </div>

            <div className="bg-white rounded-3xl border shadow p-8">

                <div className="flex justify-between items-start">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Appointment

                        </h1>

                        <p className="text-gray-500 mt-1">

                            {appointment.status}

                        </p>

                    </div>

                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold">

                        {appointment.status}

                    </span>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-10">

                    <Info
                        title="Client"
                        value={appointment.clientName || "Unknown"}
                    />

                    <Info
                        title="Service"
                        value={appointment.service}
                    />

                    <Info
                        title="Date"
                        value={appointment.appointmentDate}
                    />

                    <Info
                        title="Time"
                        value={appointment.appointmentTime}
                    />

                    <Info
                        title="Notes"
                        value={appointment.notes || "None"}
                    />

                    <Info
                        title="Status"
                        value={appointment.status}
                    />

                </div>

                <div className="flex flex-wrap gap-4 mt-10">

                    <button
                        onClick={() => changeStatus("Accepted")}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                    >
                        Accept
                    </button>

                    <button
                        onClick={() => changeStatus("Rejected")}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                    >
                        Reject
                    </button>

                    <button
                        onClick={() => changeStatus("Completed")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                    >
                        Complete
                    </button>

                    <button
                        onClick={() => changeStatus("Cancelled")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
                    >
                        Cancel
                    </button>

                </div>

            </div> */}

            {/* <ServiceCard />

            <DateCard />

            <TimeCard />

            <AddressCard />

            <NotesCard /> */}

            <ClientCard appointment={appointment} />

            <QuickActions appointment={appointment} />

            <AppointmentStatus status={appointment.status} />

            <AppointmentInfo appointment={appointment} />

            <CareNotes notes={appointment.notes} />

            {/* <ActionButtons appointment={appointment} /> */}

        </div>
        </>
        

    );

}

function Info({ title, value }) {

    return (

        <div className="bg-slate-50 rounded-xl p-5 border">

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <p className="font-semibold mt-2">

                {value}

            </p>

        </div>

    );

}