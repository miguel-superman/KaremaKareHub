"use client";

import { MessageCircle } from "lucide-react";


export default function ConversationCard({
    chat,
    onClick
}) {


return (

<button

onClick={onClick}

className="
w-full
bg-white
border
rounded-2xl
p-5
hover:shadow-md
transition
text-left
"


>


<div className="flex items-center gap-4">


<div

className="
w-14
h-14
rounded-full
bg-emerald-100
flex
items-center
justify-center
"

>


<MessageCircle
className="text-emerald-600"
/>


</div>



<div className="flex-1">


<div className="flex justify-between">


<h3 className="
font-semibold
">

{chat.clientName || "Client"}

</h3>



{
chat.unreadCount > 0 && (

<span

className="
bg-emerald-500
text-white
text-xs
rounded-full
px-2
py-1
"

>

{chat.unreadCount}

</span>

)

}


</div>



<p className="
text-sm
text-gray-500
truncate
mt-1
">

{chat.lastMessage || "Start conversation"}

</p>


</div>


</div>


</button>


);


}