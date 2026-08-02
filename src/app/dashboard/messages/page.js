"use client";


import {
useEffect,
useState
}
from "react";


import {
useRouter
}
from "next/navigation";


import {
useAuth
}
from "@/app/components/AuthProvider";


import {
subscribeChats
}
from "@/app/lib/chat/chatService";


import ConversationCard
from "../../lib/chat/ConversationCard";





export default function MessagesPage(){


    const {
    user
    }=useAuth();


    const router = useRouter();



    const [chats,setChats]=useState([]);

    const [loading,setLoading]=useState(true);




    useEffect(()=>{


    if(!user?.uid)
    return;



    const unsubscribe =
    subscribeChats(

    user.uid,

    (data)=>{


    setChats(data);

    setLoading(false);


    }

    );



    return ()=>unsubscribe();



    },[user]);






    if(loading){

        return (

            <div className="p-10">

            Loading conversations...

            </div>

        );

    }





    return (

        <div className="
            min-h-screen
            bg-gradient-to-b from-emerald-50/50 via-white to-white
            p-6
            ">


            <div className="
            max-w-5xl
            mx-auto
            ">


            <h1 className="
            text-3xl
            font-bold
            ">

            Messages

            </h1>


            <p className="
            text-gray-500
            mt-2
            ">

            Your client conversations

            </p>



            <div className="
            mt-8
            space-y-4
            ">


            {
            chats.length === 0 && (

            <div
            className="
            bg-white
            rounded-2xl
            border
            p-10
            text-center
            text-gray-500
            "
            >

            No messages yet.

            </div>

            )

            }



            {
            chats.map(chat=>(


                <ConversationCard

                    key={chat.id}

                    chat={chat}

                    onClick={()=>


                    router.push(

                    `/dashboard/messages/chatId?chatId=${chat.id}`

                    )


                    }

                />


            ))

            }



            </div>



            </div>


        </div>


    );


}