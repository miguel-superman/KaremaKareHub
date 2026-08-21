"use client";

import { AlertCircle, Mail, Phone, X, Headphones } from "lucide-react";

import { useState } from "react";

import ApplicationEditModal from "./ApplicationEditModal";

import Navbar from "../Navbar";

export default function RejectedDashboard({ worker }) {

  const [editOpen, setEditOpen] = useState(false);

  const [supportOpen, setSupportOpen] = useState(false);


  return (

    <main className="min-h-screen bg-slate-50">

      <Navbar />


      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow border p-8">

          {/* Header */}

          <div className="flex items-start gap-4">

            <div className="
              w-14
              h-14
              rounded-full
              bg-red-100
              flex
              items-center
              justify-center
              flex-shrink-0
            ">

              <AlertCircle
                className="text-red-600"
                size={28}
              />

            </div>


            <div>

              <div className="
                inline-flex
                items-center
                bg-red-50
                border
                border-red-200
                text-red-700
                px-3
                py-1
                rounded-full
                text-sm
                font-semibold
              ">

                ❌ Rejected

              </div>


              <h1 className="text-3xl font-bold mt-3">

                Application Requires Attention

              </h1>


              <p className="text-gray-600 mt-2">

                We were unable to approve your application
                at this time.

              </p>

            </div>

          </div>


          {/* Rejection Reason */}

          <div className="
            mt-8
            bg-red-50
            border
            border-red-100
            rounded-2xl
            p-5
          ">

            <h2 className="font-semibold text-red-700">

              Reason

            </h2>


            <p className="text-red-700 mt-2">

              {worker.verification?.rejectionReason ||
                "Additional documentation is required."}

            </p>

          </div>


          {/* Actions */}

          <div className="mt-8 flex flex-wrap gap-3">

            <button
              onClick={() => setEditOpen(true)}
              className="
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                px-6
                py-3
                rounded-xl
                transition
              "
            >

              Fix Application

            </button>


            <button
              onClick={() => setSupportOpen(true)}
              className="
                border
                border-slate-200
                hover:bg-slate-50
                px-6
                py-3
                rounded-xl
                transition
              "
            >

              Contact Support

            </button>

          </div>

        </div>

      </div>


      {/* Application Edit Modal */}

      <ApplicationEditModal
        worker={worker}
        open={editOpen}
        close={() => setEditOpen(false)}
      />


      {/* Support Modal */}

      {supportOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            px-4
            py-6
          "
          onClick={() => setSupportOpen(false)}
        >

          <div
            className="
              bg-white
              w-full
              max-w-md
              rounded-3xl
              shadow-2xl
              p-6
              sm:p-8
              max-h-[90vh]
              overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-100
                  flex
                  items-center
                  justify-center
                ">

                  <Headphones
                    className="text-emerald-600"
                    size={24}
                  />

                </div>


                <div>

                  <h2 className="text-xl font-bold">

                    Contact Support

                  </h2>

                  <p className="text-sm text-gray-500">

                    We're here to help.

                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => setSupportOpen(false)}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-slate-100
                  hover:bg-slate-200
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-gray-800
                  transition
                "
              >

                <X size={18} />

              </button>

            </div>


            {/* Description */}

            <p className="
              text-gray-600
              text-sm
              mt-6
              leading-relaxed
            ">

              If you have questions about your application,
              need assistance with your documents, or believe
              your application was rejected in error, please
              contact our support team.

            </p>


            {/* Email */}

            <a
              href="mailto:support@karemakarehub.com"
              className="
                mt-6
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                border
                border-slate-200
                hover:border-emerald-300
                hover:bg-emerald-50
                transition
                group
              "
            >

              <div className="
                w-11
                h-11
                rounded-xl
                bg-emerald-100
                flex
                items-center
                justify-center
                flex-shrink-0
              ">

                <Mail
                  className="text-emerald-600"
                  size={21}
                />

              </div>


              <div>

                <p className="text-xs text-gray-500">

                  Email Support

                </p>

                <p className="
                  font-semibold
                  text-slate-900
                  group-hover:text-emerald-600
                  break-all
                ">

                  support@karemakarehub.com

                </p>

              </div>

            </a>


            {/* Phone */}

            <a
              href="tel:+18765551234"
              className="
                mt-3
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                border
                border-slate-200
                hover:border-emerald-300
                hover:bg-emerald-50
                transition
                group
              "
            >

              <div className="
                w-11
                h-11
                rounded-xl
                bg-emerald-100
                flex
                items-center
                justify-center
                flex-shrink-0
              ">

                <Phone
                  className="text-emerald-600"
                  size={21}
                />

              </div>


              <div>

                <p className="text-xs text-gray-500">

                  Phone Support

                </p>

                <p className="
                  font-semibold
                  text-slate-900
                  group-hover:text-emerald-600
                ">

                  +1 (876) 555-1234

                </p>

              </div>

            </a>


            {/* Close */}

            <button
              type="button"
              onClick={() => setSupportOpen(false)}
              className="
                w-full
                mt-6
                bg-slate-900
                hover:bg-slate-800
                text-white
                py-3
                rounded-xl
                font-medium
                transition
              "
            >

              Close

            </button>

          </div>

        </div>

      )}

    </main>

  );

}