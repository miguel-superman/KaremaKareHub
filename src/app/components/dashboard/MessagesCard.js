"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";


export default function MessagesCard({unreadCount=0}) {

    const router = useRouter();


    return (

        <div
        className="
        bg-white
        rounded-3xl
        shadow
        border
        p-6
        hover:shadow-lg
        transition
        cursor-pointer
        "
        onClick={()=>router.push("/dashboard/messages")}
        >


            <div className="flex items-center gap-4">


                <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-emerald-100
                flex
                items-center
                justify-center
                "
                >

                    <MessageCircle
                    className="text-emerald-600"
                    size={28}
                    />

                </div>



                <div>

                    <h3 className="font-bold text-lg">
                        Messages
                    </h3>


                    <p className="text-gray-500 text-sm">

                    Communicate with your clients

                    </p>

                </div>


            </div>



            {
            unreadCount > 0 && (

            <div className="
            mt-5
            bg-emerald-50
            rounded-xl
            p-3
            text-emerald-700
            text-sm
            font-medium
            ">

            {unreadCount} unread messages

            </div>

            )
            }



            <button
            className="
            mt-6
            w-full
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            py-3
            rounded-xl
            "
            >

            Open Messages →

            </button>


        </div>

    );

}