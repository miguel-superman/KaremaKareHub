"use client"
import {
  CalendarDays,
  Wallet,
  MessageSquare,
  Users,
  ArrowRight,
  CreditCard
} from "lucide-react";
import Navbar from "../Navbar";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/lib/dashboard/dashboardService";


export default function ApprovedDashboard({ worker }) {

  const router = useRouter();

  const [stats,setStats]=useState({

    appointmentsToday:0,

    unreadMessages:0,

    pendingAppointments:0

  });


  useEffect(()=>{

    if(!worker?.uid)
        return;

    getDashboardStats(worker.uid)
        .then(setStats);

  },[worker]);
  return (
    <main className="min-h-screen bg-slate-50">
        <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow border p-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-gray-500">

                Welcome back

              </p>

              <h1 className="text-3xl font-bold mt-1">

                {worker.personal?.firstName || "Healthcare Professional"}

              </h1>

            </div>

            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full font-semibold">

              ✅ Approved

            </div>

          </div>

          <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6">

            <h2 className="text-xl font-bold text-green-700">

              🎉 Congratulations! Your account is active.

            </h2>

            <p className="text-green-700 mt-1">

              Clients can now discover and book your services.

            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-8">

            {/* <StatCard icon={CalendarDays} label="Appointments Today" value="3" />

            <StatCard icon={MessageSquare} label="Unread Messages" value="2" />

            <StatCard icon={Users} label="Pending Requests" value="4" /> */}

            {/* <StatCard icon={Wallet} label="This Week" value="J$48,000" /> */}

            {/* <StatCard
              icon={CalendarDays}
              label="Appointments Today"
              value={stats.appointmentsToday}
          /> */}

          <StatCard
              icon={MessageSquare}
              label="Unread Messages"
              value={stats.unreadMessages}
          />

          <StatCard
              icon={Users}
              label="Pending Requests"
              value={stats.pendingAppointments}
          />
          

          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            {/* <ActionCard title="Appointments" /> */}

            {/* <ActionCard title="Calendar" /> */}

            {/* <ActionCard title="Messages" /> */}
            {/* <ActionCard
                title="Messages"
                onClick={() => router.push("/dashboard/messages")}
            /> */}

            {/* <ActionCard title="Payments" /> */}

            {/* <ActionCard title="Availability" /> */}

            {/* <ActionCard title="Profile" /> */}

            <ActionCard
                title="Messages"
                description="View and reply to client messages"
                icon={MessageSquare}
                onClick={() => router.push("/dashboard/messages")}
            />

            <ActionCard
                title="Appointments"
                description="Manage upcoming bookings"
                icon={CalendarDays}
                onClick={() => router.push("/dashboard/appointments")}
            />

            {/* <ActionCard
                title="Payments"
                description="Track your earnings"
                icon={Wallet}
                onClick={() => router.push("/dashboard/payments")}
            /> */}

            

            <ActionCard
                title="Profile"
                description="Edit your professional information"
                icon={Users}
                onClick={() => router.push("/dashboard/profile")}
            />

            <ActionCard
                title="Subscription"
                description="Keep up to date with your subscription"
                icon={CreditCard}
                onClick={() => router.push(`/dashboard/subscription/renewal?workerId=${worker.uid}`)}
            />

          </div>

        </div>

      </div>

    </main>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-50 border rounded-2xl p-5">

      <div className="flex items-center justify-between">

        <Icon className="text-emerald-600" size={24} />

        <span className="text-2xl font-bold">

          {value}

        </span>

      </div>

      <p className="text-sm text-gray-600 mt-3">

        {label}

      </p>

    </div>
  );
}

// function ActionCard({ title ,description,

//     icon: Icon,

//     onClick }) {
//   return (
//     <button className="border rounded-2xl p-5 bg-white hover:bg-slate-50 text-left transition" onClick={onClick}>

//       <div className="font-semibold">

//         {title}

//       </div>

//       <p className="text-sm text-gray-500 mt-1">

//         Open {title.toLowerCase()}

//       </p>

//     </button>
//   );
// }


function ActionCard({

    title,

    description,

    icon: Icon,

    onClick

}) {

    return (

        <button

            onClick={onClick}

            className="
            bg-white
            border
            rounded-3xl
            p-6
            hover:shadow-xl
            hover:border-emerald-300
            transition-all
            duration-200
            text-left
            "

        >

            <div className="flex justify-between items-start">

                <div
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-emerald-100
                    flex
                    items-center
                    justify-center
                    "
                >

                    <Icon
                        className="text-emerald-600"
                        size={22}
                    />

                </div>

                <ArrowRight
                    className="text-gray-400"
                    size={20}
                />

            </div>

            <h3 className="font-bold text-lg mt-6">

                {title}

            </h3>

            <p className="text-gray-500 mt-2 text-sm">

                {description}

            </p>

        </button>

    );

}