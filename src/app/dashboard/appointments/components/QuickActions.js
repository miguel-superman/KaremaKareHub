"use client";

import { Phone, MessageCircle, MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActions({ appointment }) {

    const router = useRouter();

    function openChat() {

        router.push(
            `/dashboard/messages/${appointment.userId}_${appointment.workerId}`
        );

    }

    return (

        <div className="grid md:grid-cols-3 gap-4 mt-6">

            <button
                className="bg-emerald-600 text-white rounded-2xl p-4 hover:bg-emerald-700 transition"
            >
                <Phone className="mx-auto mb-2"/>

                Call Client
            </button>

            <button
                onClick={openChat}
                className="bg-blue-600 text-white rounded-2xl p-4 hover:bg-blue-700 transition"
            >
                <MessageCircle className="mx-auto mb-2"/>

                Open Chat
            </button>

            <button
                className="bg-orange-500 text-white rounded-2xl p-4 hover:bg-orange-600 transition"
            >
                <MapPinned className="mx-auto mb-2"/>

                View Address
            </button>

        </div>

    );

}