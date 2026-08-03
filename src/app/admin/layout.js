"use client";


import {useEffect,useState} from "react";

import {
useRouter
} from "next/navigation";


import {
useAuth
} from "../components/AuthProvider";


import {
checkAdmin
} from "../lib/admin/checkAdmin";



export default function AdminLayout({
children
}){


    const router = useRouter();


    const {user,loading} = useAuth();


    const [checking,setChecking] =
    useState(true);



    useEffect(()=>{


    async function verify(){


    if(loading) return;



    if(!user){

    router.push("/login");

    return;

    }



    const allowed =
    await checkAdmin(
    user.uid
    );



    if(!allowed){

    router.push("/dashboard");

    return;

    }



    setChecking(false);


    }



    verify();


    },[user,loading]);




    if(checking){

        return (

            <div className="p-10">

            Checking permissions...

            </div>

        )

    }



    return children;


}