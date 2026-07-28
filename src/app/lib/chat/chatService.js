import {
    collection,
    doc,
    setDoc,
    addDoc,
    getDoc,
    serverTimestamp,
    writeBatch,
    where,
    increment,
    query,
    orderBy,
    onSnapshot,
    getDocs,
    updateDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const batch = writeBatch(db);

// export async function createConversation({

//     clientId,
//     clientName,
//     clientImage = "",

//     workerId,
//     workerName,
//     workerImage = ""

// }) {

//     const chatId = getConversationId(
//         clientId,
//         workerId
//     );

//     const conversationRef = doc(
//         db,
//         "conversations",
//         chatId
//     );

//     const conversation = await getDoc(
//         conversationRef
//     );

//     if (!conversation.exists()) {

//         await setDoc(conversationRef, {

//             participants: {

//                 clientId,
//                 workerId

//             },

//             createdAt: serverTimestamp(),

//             lastMessage: "",

//             lastMessageTime: serverTimestamp()

//         });

//     }

//     const batch = writeBatch(db);

//     batch.set(

//         doc(
//             db,
//             "clients",
//             clientId,
//             "Chats",
//             chatId
//         ),

//         {

//             chatId,

//             clientId,
//             workerId,

//             workerName,
//             workerImage,

//             lastMessage: "",

//             lastMessageTime: serverTimestamp(),

//             unreadCount: 0

//         },

//         { merge: true }

//     );

//     batch.set(

//         doc(
//             db,
//             "healthcareWorkers",
//             workerId,
//             "Chats",
//             chatId
//         ),

//         {

//             chatId,

//             clientId,
//             workerId,

//             clientName,
//             clientImage,

//             lastMessage: "",

//             lastMessageTime: serverTimestamp(),

//             unreadCount: 0

//         },

//         { merge: true }

//     );

//     await batch.commit();

//     return chatId;

// }

// export async function sendMessage({

//     chatId,

//     senderId,

//     senderType,

//     message

// }) {

//     if (!message.trim()) {

//         return;

//     }

//     const conversationRef = doc(
//         db,
//         "conversations",
//         chatId
//     );

//     const conversation = await getDoc(
//         conversationRef
//     );

//     if (!conversation.exists()) {

//         throw new Error(
//             "Conversation not found."
//         );

//     }

//     const data = conversation.data();

//     const {

//         clientId,
//         workerId

//     } = data.participants;

//     await addDoc(

//         collection(
//             db,
//             "conversations",
//             chatId,
//             "messages"
//         ),

//         {

//             senderId,

//             senderType,

//             message,

//             type: "text",

//             read: false,

//             createdAt: serverTimestamp()

//         }

//     );

//     const batch = writeBatch(db);

//     batch.update(

//         conversationRef,

//         {

//             lastMessage: message,

//             lastMessageTime: serverTimestamp()

//         }

//     );

//     batch.update(

//         doc(
//             db,
//             "clients",
//             clientId,
//             "Chats",
//             chatId
//         ),

//         {

//             lastMessage: message,

//             lastMessageTime: serverTimestamp(),

//             unreadCount:
//                 senderType === "worker"
//                     ? 1
//                     : 0

//         }

//     );

//     batch.update(

//         doc(
//             db,
//             "healthcareWorkers",
//             workerId,
//             "Chats",
//             chatId
//         ),

//         {

//             lastMessage: message,

//             lastMessageTime: serverTimestamp(),

//             unreadCount:
//                 senderType === "client"
//                     ? 1
//                     : 0

//         }

//     );

//     await batch.commit();

// }

// export function subscribeToMessages(

//     chatId,

//     callback

// ) {

//     const q = query(

//         collection(
//             db,
//             "conversations",
//             chatId,
//             "messages"
//         ),

//         orderBy(
//             "createdAt",
//             "asc"
//         )

//     );

//     return onSnapshot(

//         q,

//         (snapshot) => {

//             callback(

//                 snapshot.docs.map(doc => ({

//                     id: doc.id,

//                     ...doc.data()

//                 }))

//             );

//         }

//     );

// }

// export function subscribeWorkerChats(

//     workerId,

//     callback

// ) {

//     const q = query(

//         collection(

//             db,

//             "healthcareWorkers",

//             workerId,

//             "Chats"

//         ),

//         orderBy(

//             "lastMessageTime",

//             "desc"

//         )

//     );

//     return onSnapshot(

//         q,

//         snapshot => {

//             callback(

//                 snapshot.docs.map(doc => ({

//                     id: doc.id,

//                     ...doc.data()

//                 }))

//             );

//         }

//     );

// }

// export function subscribeClientChats(

//     clientId,

//     callback

// ) {

//     const q = query(

//         collection(

//             db,

//             "clients",

//             clientId,

//             "Chats"

//         ),

//         orderBy(

//             "lastMessageTime",

//             "desc"

//         )

//     );

//     return onSnapshot(

//         q,

//         snapshot => {

//             callback(

//                 snapshot.docs.map(doc => ({

//                     id: doc.id,

//                     ...doc.data()

//                 }))

//             );

//         }

//     );

// }


// export function subscribeChats({
//     role,
//     uid,
//     callback
// }) {


//     let chatRef;


//     if(role === "worker") {

//         chatRef = collection(
//             db,
//             "healthcareWorkers",
//             uid,
//             "Chats"
//         );

//     }


//     if(role === "client") {

//         chatRef = collection(
//             db,
//             "clients",
//             uid,
//             "Chats"
//         );

//     }



//     if(!chatRef){

//         throw new Error(
//             "Invalid chat role"
//         );

//     }



//     const q = query(
//         chatRef,
//         orderBy(
//             "lastMessageTime",
//             "desc"
//         )
//     );



//     return onSnapshot(
//         q,
//         snapshot => {


//             const chats =
//             snapshot.docs.map(doc => ({

//                 id: doc.id,

//                 ...doc.data()

//             }));


//             callback(chats);


//         }
//     );

// }

// import {
// collection,
// query,
// where,
// onSnapshot,
// orderBy
// }
// from "firebase/firestore";

// import {db} from "../firebase/firebase";




export function subscribeChats(
    uid,
    callback
){

    if(!uid){
        console.error(
            "Missing user UID"
        );

        return ()=>{};
    }



    const q = query(

        collection(
            db,
            "conversations"
        ),

        where(
            "workerId",
            "==",
            uid
        ),

        orderBy(
            "lastMessageTime",
            "desc"
        )

    );



    return onSnapshot(

        q,

        snapshot=>{


            const chats =
            snapshot.docs.map(doc=>(

                {
                    id:doc.id,
                    ...doc.data()
                }

            ));



            callback(chats);


        },

        error=>{

            console.error(
                "Chat listener error:",
                error
            );

        }

    );


}

export async function getConversation(chatId){


const ref =
doc(
db,
"conversations",
chatId
);



const snap =
await getDoc(ref);



if(!snap.exists())
return null;



return {

id:snap.id,

...snap.data()

};


}





export function subscribeMessages(
chatId,
callback
){


const q =
query(

collection(
db,
"conversations",
chatId,
"messages"
),

orderBy(
"timestamp",
"asc"
)

);



return onSnapshot(

q,

snapshot=>{


const messages =
snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));



callback(messages);



}


);



}


console.log("DB:", db);





export async function sendMessage({

chatId,

senderId,

message

}){

    console.log("chatId =", chatId);
    console.log("senderId =", senderId);
    console.log("message =", message);


    await addDoc(

        collection(

        db,

        "conversations",

        chatId,

        "messages"

        ),

        {


        senderId,

        message,

        timestamp:
        Date.now(),

        seen:false


        }

        );



    await updateConversation(chatId,message);


}





async function updateConversation(
chatId,
message
){


await setDoc(

doc(
db,
"conversations",
chatId
),

{

lastMessage:message,

lastMessageTime:
Date.now()

},

{

merge:true

}

);


}