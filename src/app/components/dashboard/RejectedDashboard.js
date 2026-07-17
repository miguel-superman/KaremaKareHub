import { AlertCircle } from "lucide-react";

export default function RejectedDashboard({ worker }) {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow border p-8">

          <div className="flex items-start gap-4">

            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

              <AlertCircle className="text-red-600" size={28} />

            </div>

            <div>

              <div className="inline-flex items-center bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">

                ❌ Rejected

              </div>

              <h1 className="text-3xl font-bold mt-3">

                Application Requires Attention

              </h1>

              <p className="text-gray-600 mt-2">

                We were unable to approve your application at this time.

              </p>

            </div>

          </div>

          <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-5">

            <h2 className="font-semibold text-red-700">

              Reason

            </h2>

            <p className="text-red-700 mt-2">

              {worker.verification?.rejectionReason || "Additional documentation is required."}

            </p>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl">

              Upload Updated Documents

            </button>

            <button className="border px-6 py-3 rounded-xl">

              Contact Support

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}