"use client";

import {

useEffect,
useState

} from "react";

import {

useAuth

} from "@/app/components/AuthProvider";

import {

subscribeAppointments

} from "@/app/lib/appointments/appointmentService";

import AppointmentCard from "./AppointmentCard";

export default function AppointmentsPage(){

const {user}=useAuth();

const [appointments,setAppointments]=useState([]);

const [loading,setLoading]=useState(true);

    useEffect(()=>{

    if(!user)return;

    const unsubscribe =

    subscribeAppointments({

        uid:user.uid,

        callback:data=>{

            console.log("APPOINTMENTS FROM FIRESTORE: ", data);

            console.log("USER ID FROM FIRESTORE: ", user.uid);

            setAppointments(data);

            setLoading(false);

        }

        });

        return ()=>unsubscribe();

        },[user]);

        if(loading){

            return(

            <div className="p-10">

            Loading appointments...

            </div>

            );

        }

    return(

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold">

            Appointments

            </h1>
            <div className="space-y-5 mt-8">

                {
                    appointments.length === 0 && (

                    <div className="bg-white p-8 rounded-xl">

                        No appointments found.

                    </div>

                )
                }


                {
                appointments.map((appointment)=>(

                    <AppointmentCard

                        key={appointment.id}

                        appointment={appointment}

                    />

                ))

                }


                </div>

        </div>

    );

}