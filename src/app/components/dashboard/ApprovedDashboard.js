import {
  CalendarDays,
  Wallet,
  MessageSquare,
  Users
} from "lucide-react";
import Navbar from "../Navbar";

export default function ApprovedDashboard({ worker }) {
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

            <StatCard icon={CalendarDays} label="Appointments Today" value="3" />

            <StatCard icon={MessageSquare} label="Unread Messages" value="2" />

            <StatCard icon={Users} label="Pending Requests" value="4" />

            <StatCard icon={Wallet} label="This Week" value="J$48,000" />

          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <ActionCard title="Appointments" />

            <ActionCard title="Calendar" />

            <ActionCard title="Messages" />

            <ActionCard title="Payments" />

            <ActionCard title="Availability" />

            <ActionCard title="Profile" />

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

function ActionCard({ title }) {
  return (
    <button className="border rounded-2xl p-5 bg-white hover:bg-slate-50 text-left transition">

      <div className="font-semibold">

        {title}

      </div>

      <p className="text-sm text-gray-500 mt-1">

        Open {title.toLowerCase()}

      </p>

    </button>
  );
}