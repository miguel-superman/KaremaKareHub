"use client";

export default function CareNotes({ notes }) {

    return (

        <div className="bg-white rounded-3xl border mt-8 p-6">

            <h3 className="text-xl font-bold">

                Care Notes

            </h3>

            <p className="text-gray-600 mt-4 whitespace-pre-wrap">

                {notes || "No additional notes provided."}

            </p>

        </div>

    );

}