"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Camera,
    Save,
    ShieldCheck,
    Loader2
} from "lucide-react";

import { useAuth } from "@/app/components/AuthProvider";

import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";

import {

    db,

} from "@/app/lib/firebase/firebase";

import {
uploadWorkerProfileImage
}
from "@/app/lib/workers/uploadProfileImage";



import ProfileEditModal 
from "./ProfileEditModal";

import DocumentsSection 
from "./DocumentsSection";
import Navbar from "@/app/components/Navbar";


const emptyWorker = {

    image: "",

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    parish: "",
    gender: "",
    dateOfBirth: "",

    profession: "",
    licenseNumber: "",
    currentEmployer: "",
    yearsExperience: "",
    qualifications: "",
    specialization: "",
    languages: "",
    bio: "",

    hourlyRate: "",
    homeVisitRate: "",
    overnightRate: "",
    travelFee: "",
    availability: "",
    paymentMethod: ""

};

export default function ProfilePage() {

    const { user } = useAuth();

    const [worker, setWorker] = useState(emptyWorker);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (!user?.uid) return;

        loadProfile();

    }, [user]);

    const [editing,setEditing]=useState(false);
    const [uploading,setUploading]=useState(false);

    const updateProfile = async(data)=>{


        try{


        await updateDoc(

        doc(
        db,
        "healthcareWorkers",
        user.uid
        ),

        {


        personal:data.personal,

        professional:data.professional,

        rates:data.rates,

        updatedAt:Date.now()

        }

        );


        setProfile(prev=>({

        ...prev,

        ...data

        }));


        setEditing(false);



        }

        catch(error){

        console.log(error);

        }


        };

        const handleProfilePhoto = async(e)=>{


            const file =
            e.target.files[0];


            if(!file)
            return;



            try{


            setUploading(true);



            const url =
            await uploadWorkerProfileImage(

            user.uid,

            file

            );



            await updateDoc(

            doc(
            db,
            "healthcareWorkers",
            user.uid
            ),

            {

            profileImage:url,

            updatedAt:Date.now()

            }

            );



            setProfile(prev=>({

            ...prev,

            profileImage:url

            }));


            }

            catch(error){

            console.log(error);

            }

            finally{


            setUploading(false);


            }


};

    async function loadProfile() {

        setLoading(true);

        try {

            const snap = await getDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                )

            );

            if (snap.exists()) {

                setWorker({

                    ...emptyWorker,

                    ...snap.data()

                });

            }

        } catch (e) {

            console.log(e);

        }

        setLoading(false);

    }

    async function saveProfile() {

        setSaving(true);

        try {

            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                worker

            );

            alert("Profile updated successfully!");

        } catch (e) {

            console.log(e);

            alert("Unable to save profile.");

        }

        setSaving(false);

    }

    async function uploadProfilePhoto(e) {

        const file = e.target.files[0];

        if (!file) return;

        try {

            const storageRef = ref(

                storage,

                `workerDocuments/${user.uid}/profile.jpg`

            );

            await uploadBytes(

                storageRef,

                file

            );

            const url = await getDownloadURL(storageRef);

            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                {

                    image: url

                }

            );

            setWorker(prev => ({

                ...prev,

                image: url

            }));

        } catch (e) {

            console.log(e);

            alert("Unable to upload image.");

        }

    }

    const completion = useMemo(() => {

        const values = Object.values(worker);

        const completed = values.filter(v => v !== "").length;

        return Math.round(

            completed / values.length * 100

        );

    }, [worker]);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <Loader2
                    className="animate-spin"
                    size={40}
                />

            </div>

        );

    }

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50">

                    <div className="max-w-6xl mx-auto px-6 py-10">

                        {/* Header */}

                        <div className="bg-white rounded-3xl border shadow-sm p-8">

                            <div className="flex flex-col md:flex-row gap-8 items-center">

                                {/* <div className="relative">

                                    <img

                                        src={
                                            worker.image ||
                                            "/avatar.png"
                                        }

                                        alt="Profile"

                                        className="w-44 h-44 rounded-full object-cover border-4 border-emerald-200"

                                    />

                                    <label

                                        className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 cursor-pointer"

                                    >

                                        <Camera size={18} />

                                        <input

                                            hidden

                                            type="file"

                                            accept="image/*"

                                            onChange={uploadProfilePhoto}

                                        />

                                    </label>

                                    <button

                                        onClick={()=>setEditing(true)}

                                        className="
                                        bg-emerald-600
                                        text-white
                                        px-5
                                        py-2
                                        rounded-xl
                                        "

                                        >

                                        Edit Profile

                                    </button>

                                </div> */}
                                <div className="relative">


                                    <img

                                    src={
                                    worker.profileImage ||
                                    "/avatar.png"
                                    }

                                    className="
                                    w-32
                                    h-32
                                    rounded-full
                                    object-cover
                                    border-4
                                    border-white
                                    shadow
                                    "

                                    />



                                    <label

                                    className="
                                    absolute
                                    bottom-0
                                    right-0
                                    bg-emerald-600
                                    text-white
                                    rounded-full
                                    p-3
                                    cursor-pointer
                                    "

                                    >


                                    📷


                                    <input

                                    type="file"

                                    accept="image/*"

                                    hidden

                                    onChange={handleProfilePhoto}

                                    />


                                    </label>


                                    </div>

                                <div className="flex-1">

                                    <h1 className="text-4xl font-bold">

                                        {worker.firstName} {worker.lastName}

                                    </h1>

                                    <p className="text-xl text-gray-500 mt-2">

                                        {worker.profession || "Healthcare Professional"}

                                    </p>

                                    <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full">

                                        <ShieldCheck size={18} />

                                        Verified Professional

                                    </div>


                                </div>

                            </div>

                            <div className="mt-10">

                                <div className="flex justify-between">

                                    <span className="font-medium">

                                        Profile Completion

                                    </span>

                                    <span>

                                        {completion}%

                                    </span>

                                </div>

                                <div className="h-3 rounded-full bg-slate-200 mt-3">

                                    <div

                                        className="bg-emerald-500 h-3 rounded-full transition-all"

                                        style={{

                                            width: `${completion}%`

                                        }}

                                    />

                                </div>

                            </div>

                        </div>

                        {/* Personal Card goes here */}

                        {/* Professional Card goes here */}

                        {/* Rates Card goes here */}

                        {/* Documents Card goes here */}
                        <DocumentsSection

                            worker={worker}

                            setWorker={setWorker}

                        />


                        <div className="mt-10 flex justify-end">

                            <button

                                onClick={saveProfile}

                                disabled={saving}

                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"

                            >

                                <Save size={18} />

                                {

                                    saving

                                        ? "Saving..."

                                        : "Save Changes"

                                }

                            </button>
                            <button

                                onClick={()=>setEditing(true)}

                                className="
                                bg-blue-600
                                text-white
                                px-5
                                py-2
                                rounded-xl
                                ml-8
                                "

                            >

                                Edit Profile

                            </button>

                        </div>

                    </div>
                    {
                        editing && (

                        <ProfileEditModal

                        profile={worker}

                        onClose={()=>setEditing(false)}

                        onSave={updateProfile}

                        />

                        )

                    }

            </div>

            <footer className="border-t border-slate-100 py-8">
                <div className="container text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} CareConnect. Built for verified freelance care.
                </div>
            </footer>
        </>

        
        

    );

}