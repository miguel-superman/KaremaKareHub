import Navbar from "../components/Navbar";
import ApplicationSteps from "../components/ApplicationSteps";

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      {/* <FirebaseBanner /> */}

      <main className="min-h-screen bg-slate-50 ">

        <div className="max-w-3xl mx-auto pt-10 pb-20 p-5">

          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-2xl shadow">
              ❤️
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mt-6">
            Healthcare Worker Application
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Step 1 of 5 — Account
          </p>

          <ApplicationSteps />

          <div className="mt-10 bg-white rounded-2xl shadow-lg border p-8">

            <h2 className="font-semibold text-2xl">
              Account
            </h2>

            <p className="text-gray-500 mt-1">
              Create your login credentials.
            </p>

            <div className="mt-8 space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  className="w-full border rounded-lg h-12 px-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password (min 6 chars)
                </label>

                <input
                  type="password"
                  className="w-full border rounded-lg h-12 px-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

            </div>

            <div className="flex justify-end mt-8">

              <button className="bg-emerald-400 hover:bg-emerald-500 transition text-white px-8 h-11 rounded-lg">
                Continue →
              </button>

            </div>

          </div>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?
            <span className="text-emerald-600 font-medium ml-2 cursor-pointer">
              Sign in
            </span>
          </p>

        </div>

      </main>
    </>
  );
}