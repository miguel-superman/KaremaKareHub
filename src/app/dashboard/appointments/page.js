// "use client";

// import {

// useEffect,
// useState

// } from "react";

// import {

// useAuth

// } from "@/app/components/AuthProvider";

// import {

// subscribeAppointments

// } from "@/app/lib/appointments/appointmentService";

// import AppointmentCard from "./AppointmentCard";

// export default function AppointmentsPage(){

// const {user}=useAuth();

// const [appointments,setAppointments]=useState([]);

// const [loading,setLoading]=useState(true);

//     useEffect(()=>{

//     if(!user)return;

//     const unsubscribe =

//     subscribeAppointments({

//         uid:user.uid,

//         callback:data=>{

//             console.log("APPOINTMENTS FROM FIRESTORE: ", data);

//             console.log("USER ID FROM FIRESTORE: ", user.uid);

//             setAppointments(data);

//             setLoading(false);

//         }

//         });

//         return ()=>unsubscribe();

//         },[user]);

//         if(loading){

//             return(

//             <div className="p-10">

//             Loading appointments...

//             </div>

//             );

//         }

//     return(

//         <div className="max-w-5xl mx-auto p-8">

//             <h1 className="text-3xl font-bold">

//             Appointments

//             </h1>
//             <div className="space-y-5 mt-8">

//                 {
//                     appointments.length === 0 && (

//                     <div className="bg-white p-8 rounded-xl">

//                         No appointments found.

//                     </div>

//                 )
//                 }


//                 {
//                 appointments.map((appointment)=>(

//                     <AppointmentCard

//                         key={appointment.id}

//                         appointment={appointment}

//                     />

//                 ))

//                 }


//                 </div>

//         </div>

//     );

// }

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

import {
Search,
CalendarDays,
Filter,
X
} from "lucide-react";
import Navbar from "@/app/components/Navbar";


export default function AppointmentsPage(){


    const {user}=useAuth();


    const [appointments,setAppointments]=useState([]);

    const [filteredAppointments,setFilteredAppointments]=useState([]);


    const [loading,setLoading]=useState(true);


    const [search,setSearch]=useState("");

    const [dateFilter,setDateFilter]=useState("");





    useEffect(()=>{


    if(!user)
    return;



    const unsubscribe =

        subscribeAppointments({

        uid:user.uid,

        callback:data=>{


        console.log(
        "APPOINTMENTS:",
        data
        );



        setAppointments(data);

        setFilteredAppointments(data);


        setLoading(false);


        }

        });


    return ()=>unsubscribe();

        

    },[user]);






    useEffect(()=>{


    let results = [...appointments];




    // Search client name

    if(search.trim()){


    results = results.filter(
    appointment =>


    appointment.clientName
    ?.toLowerCase()
    .includes(
    search.toLowerCase()
    )

    );


    }





    // Filter date


    if(dateFilter){


    results =
    results.filter(

    appointment =>

    appointment.appointmentDate === dateFilter

    );


    }




    setFilteredAppointments(results);



    },[
    search,
    dateFilter,
    appointments
    ]);





    function clearFilters(){


    setSearch("");

    setDateFilter("");


    }





    if(loading){


    return (

    <div className="min-h-screen bg-slate-50 p-10">

        <div className="
        max-w-5xl 
        mx-auto
        bg-gradient-to-b from-emerald-50/50 via-white to-white
        rounded-2xl
        shadow
        p-10
        text-center
        ">

            <div className="animate-pulse">

            Loading appointments...

            </div>


        </div>

    </div>

    );


    }





    return(

        <>

        <Navbar />
        <div className="
            `min-h-screen 
            bg-slate-50
            p-6
            ">


            <div className="
            max-w-6xl
            mx-auto
            ">


            {/* Header */}


            <div className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            p-8
            ">


            <div className="
            flex
            justify-between
            items-center
            flex-wrap
            gap-4
            ">


            <div>


            <h1 className="
            text-3xl
            font-bold
            text-gray-800
            ">

            Appointments

            </h1>


            <p className="
            text-gray-500
            mt-2
            ">

            Manage your upcoming client appointments.

            </p>


            </div>



            <div className="
            bg-emerald-50
            text-emerald-700
            px-5
            py-3
            rounded-xl
            font-semibold
            ">

            {
            appointments.length
            } 

             {" "} Total


            </div>


            </div>





            {/* Filters */}


            <div className="
            mt-8
            grid
            md:grid-cols-3
            gap-4
            ">



            <div className="
            relative
            ">


            <Search

            className="
            absolute
            left-3
            top-3
            text-gray-400
            "

            />


            <input

            value={search}

            onChange={
            e=>setSearch(e.target.value)
            }

            placeholder="
            Search client name...
            "

            className="
                w-full
                border
                rounded-xl
                py-3
                pl-10
                pr-4
                focus:ring-2
                focus:ring-emerald-400
                outline-none
                "

            />


            </div>





            <div className="
            relative
            ">


            <CalendarDays

            className="
            absolute
            left-3
            top-3
            text-gray-400
            "

            />


            <input

            type="text"

            placeholder="
            Filter date e.g 27/7/2026
            "

            value={dateFilter}

            onChange={
            e=>setDateFilter(e.target.value)
            }

            className="
            w-full
            border
            rounded-xl
            py-3
            pl-10
            pr-4
            focus:ring-2
            focus:ring-emerald-400
            outline-none
            "

            />


            </div>






            <button

                onClick={clearFilters}

                className="
                flex
                items-center
                justify-center
                gap-2
                border
                rounded-xl
                px-5
                hover:bg-gray-50
                transition
                "


            >


            <X size={18}/>

            Clear Filters


            </button>




            </div>



            </div>






            {/* Appointment List */}


            <div className="
            mt-8
            space-y-5
            ">



            {
            filteredAppointments.length === 0 && (


            <div className="
            bg-white
            rounded-2xl
            border
            p-10
            text-center
            ">


            <Filter

            className="
            mx-auto
            text-gray-400
            mb-3
            "

            />


            <h3 className="
            font-semibold
            text-gray-700
            ">

            No appointments found

            </h3>


            <p className="
            text-gray-500
            mt-2
            ">

            Try adjusting your search filters.

            </p>


            </div>


            )

            }






            {
            filteredAppointments.map(
            appointment=>(


            <AppointmentCard

            key={
            appointment.id
            }

            appointment={
            appointment
            }


            />


            )

            )

            }





            </div>



            </div>


            </div>`
        
        </>
    


    );


}