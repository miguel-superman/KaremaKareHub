"use client";


import {
    useEffect,
    useState
} from "react";


import {
    useParams
} from "next/navigation";


import {
    useAuth
} from "@/app/components/AuthProvider";


import {
    subscribeMessages,
    getConversation,
    sendMessage
}
from "@/app/lib/chat/chatService";
import Navbar from "@/app/components/Navbar";



export default function ChatRoomPage(){


const {
    user
}=useAuth();


const params = useParams();


const chatId =
params.chatIUd;

console.log(params);

console.log(chatId);




const [chat,setChat]=useState(null);


const [messages,setMessages]=useState([]);


const [text,setText]=useState("");



useEffect(()=>{


    if(!chatId)
    return;



    async function loadChat(){


        const data =
        await getConversation(chatId);


        setChat(data);


    }


    loadChat();



    const unsubscribe =
    subscribeMessages(

    chatId,

    (data)=>{


    setMessages(data);


}


);



return ()=>unsubscribe();



},[chatId]);





async function handleSend(){


    if(!text.trim())
    return;



    await sendMessage({

        chatId,

        senderId:user.uid,

        message:text


    });



    setText("");



}





    return (

        <>
            <Navbar />
            <div className="
            min-h-screen
            bg-slate-50
            p-6
            ">


                <div className="
                    max-w-4xl
                    mx-auto
                    bg-white
                    rounded-3xl
                    shadow
                    border
                    overflow-hidden
                    ">



                    {/* HEADER */}

                    <div className="
                    p-6
                    border-b
                    ">


                    <h1 className="
                    text-xl
                    font-bold
                    ">


                    {
                    chat?.clientName ||
                    "Client Conversation"
                    }


                    </h1>


                    <p className="
                    text-sm
                    text-gray-500
                    ">

                    Live conversation

                    </p>


                    </div>





                    {/* MESSAGES */}


                    <div className="
                    h-[500px]
                    overflow-y-auto
                    p-6
                    space-y-4
                    ">


                    {
                    messages.map(msg=>(


                    <div

                    key={msg.id}

                    className={`
                    flex
                    ${msg.senderId===user.uid
                    ?
                    "justify-end"
                    :
                    "justify-start"
                    }
                    `}

                    >


                    <div

                    className={`
                    max-w-xs
                    px-4
                    py-3
                    rounded-2xl

                    ${
                    msg.senderId===user.uid
                    ?
                    "bg-emerald-500 text-white"
                    :
                    "bg-gray-100"
                    }

                    `}

                    >


                    <p>

                    {msg.message}

                    </p>


                    <p className="
                    text-xs
                    opacity-70
                    mt-1
                    ">


                    {
                    new Date(
                    msg.timestamp
                    )
                    .toLocaleTimeString()
                    }


                    </p>


                    </div>


                    </div>


                    ))

                    }



                    </div>





                    {/* INPUT */}


                    <div className="
                    border-t
                    p-4
                    flex
                    gap-3
                    ">


                    <input

                    value={text}

                    onChange={
                    e=>setText(e.target.value)
                    }

                    placeholder="
                    Type your message...
                    "

                    className="
                    flex-1
                    border
                    rounded-xl
                    px-4
                    h-12
                    "

                    />



                    <button

                    onClick={handleSend}

                    className="
                        bg-emerald-500
                        text-white
                        px-6
                        rounded-xl
                        "

                        >

                    Send

                    </button>


                    </div>



                </div>


            </div>
        </>
        


    );


}