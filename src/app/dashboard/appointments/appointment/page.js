"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ClientCard from "../components/ClientCard";
import QuickActions from "../components/QuickActions";
import AppointmentStatus from "../components/AppointmentStatus";
import AppointmentInfo from "../components/AppointmentInfo";
import CareNotes from "../components/CareNotes";
// import ActionButtons from "../components/ActionButtons";
// import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
    getAppointment,
    updateAppointmentStatus
} from "@/app/lib/appointments/appointmentService";
import Navbar from "@/app/components/Navbar";
import { app } from "@/app/lib/firebase/firebase";

export default function AppointmentDetailsPage() {

    // const params = useParams();

    // console.log(params);

    // const searchParams = useSearchParams();
    // const appointmentId = searchParams.get("appointmentId");

    const [appointmentId, setAppointmentId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setAppointmentId(params.get("appointmentId"));
    }, []);

    // const appointmentId = params.appointmentId;

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
            <div className="max-w-5xl mx-auto bg-gradient-to-b from-emerald-50/50 via-white to-white p-8 border border-1 rounded-3xl shadow bg-white mt-5">
                
            
            <ClientCard appointment={appointment} />

            <QuickActions appointment={appointment} />

            <AppointmentStatus status={appointment.status} />

            <AppointmentInfo appointment={appointment} />

            <CareNotes notes={appointment.notes} />

            {/* <ActionButtons appointment={appointment} /> */}

            

            <div className="grid md:grid-cols-3 gap-4 mt-6">

                {appointment.status === "Pending" || appointment.status === "Rescheduled" ?

                <>
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
                </> : <>
                </>
                 
                }
                

                {appointment.status === "Accepted" ? 
                
                    <button
                    onClick={() => changeStatus("Completed")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                    Complete
                </button>

                : null}
                

                <button
                    onClick={() => changeStatus("Cancelled")}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
                >
                    Cancel
                </button>

                </div>



        </div>
        <footer className="border-t border-slate-300 py-8 mt-10">
            <div className="container text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Karema Kare Hub. Built for verified freelance care.
            </div>
        </footer>
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