import {
  CheckCircle2,
  Clock,
  Lock
} from "lucide-react";
import Navbar from "../Navbar";

export default function PendingDashboard({ worker }) {
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

            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-full font-semibold">

              ⏳ Pending Verification

            </div>

          </div>

          <div className="mt-8 bg-slate-50 rounded-2xl p-6 border">

            <div className="flex items-center gap-3">

              <Clock className="text-yellow-600" size={28} />

              <div>

                <h2 className="font-bold text-lg">

                  Application Under Review

                </h2>

                <p className="text-gray-600">

                  Our team is reviewing your documents and credentials. Most applications are reviewed within 1–3 business days.

                </p>

              </div>

            </div>

          </div>

          <div className="mt-8">

            <div className="flex items-center justify-between mb-3">

              <h3 className="font-semibold">

                Application Progress

              </h3>

              <span className="text-sm text-gray-500">

                5 of 6 completed

              </span>

            </div>

            <div className="space-y-4">

              <ProgressItem label="Account Created" complete />

              <ProgressItem label="Personal Information" complete />

              <ProgressItem label="Professional Information" complete />

              <ProgressItem label="Rates Configured" complete />

              <ProgressItem label="Documents Uploaded" complete />

              <ProgressItem label="Verification Review" />

            </div>

          </div>

          <div className="mt-10">

            <h3 className="font-semibold mb-4">

              Features Unlock After Approval

            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <LockedFeature title="Appointments" />

              <LockedFeature title="Client Requests" />

              <LockedFeature title="Calendar" />

              <LockedFeature title="Messages" />

              <LockedFeature title="Earnings" />

              <LockedFeature title="Reviews" />

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

function ProgressItem({ label, complete = false }) {
  return (
    <div className="flex items-center gap-3">

      {complete ? (

        <CheckCircle2 className="text-emerald-600" size={22} />

      ) : (

        <Clock className="text-yellow-600" size={22} />

      )}

      <span className={complete ? "font-medium" : "text-gray-700"}>

        {label}

      </span>

    </div>
  );
}

function LockedFeature({ title }) {
  return (
    <div className="border rounded-xl p-4 bg-slate-50 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <Lock className="text-gray-400" size={18} />

        <span className="font-medium">

          {title}

        </span>

      </div>

      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">

        Locked

      </span>

    </div>
  );
}