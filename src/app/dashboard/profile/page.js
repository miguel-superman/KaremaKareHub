// "use client";

// import { useEffect, useMemo, useState } from "react";

// import {
//     Camera,
//     Save,
//     ShieldCheck,
//     Loader2
// } from "lucide-react";

// import { useAuth } from "@/app/components/AuthProvider";

// import {
//     doc,
//     getDoc,
//     updateDoc
// } from "firebase/firestore";

// import {
//     ref,
//     uploadBytes,
//     getDownloadURL
// } from "firebase/storage";

// import {

//     db,

// } from "@/app/lib/firebase/firebase";

// import {
// uploadWorkerProfileImage
// }
// from "@/app/lib/workers/uploadProfileImage";



// import ProfileEditModal 
// from "./ProfileEditModal";

// import DocumentsSection 
// from "./DocumentsSection";
// import Navbar from "@/app/components/Navbar";


// const emptyWorker = {

//     image: "",

//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     parish: "",
//     gender: "",
//     dateOfBirth: "",

//     profession: "",
//     licenseNumber: "",
//     currentEmployer: "",
//     yearsExperience: "",
//     qualifications: "",
//     specialization: "",
//     languages: "",
//     bio: "",

//     hourlyRate: "",
//     homeVisitRate: "",
//     overnightRate: "",
//     travelFee: "",
//     availability: "",
//     paymentMethod: ""

// };

// export default function ProfilePage() {

//     const { user } = useAuth();

//     const [worker, setWorker] = useState(emptyWorker);

//     const [loading, setLoading] = useState(true);

//     const [saving, setSaving] = useState(false);

//     useEffect(() => {

//         if (!user?.uid) return;

//         loadProfile();

//     }, [user]);

//     const [editing,setEditing]=useState(false);
//     const [uploading,setUploading]=useState(false);

//     const updateProfile = async(data)=>{


//         try{


//         await updateDoc(

//         doc(
//         db,
//         "healthcareWorkers",
//         user.uid
//         ),

//         {


//         personal:data.personal,

//         professional:data.professional,

//         rates:data.rates,

//         updatedAt:Date.now()

//         }

//         );


//         setProfile(prev=>({

//         ...prev,

//         ...data

//         }));


//         setEditing(false);



//         }

//         catch(error){

//         console.log(error);

//         }


//         };

//         const handleProfilePhoto = async(e)=>{


//             const file =
//             e.target.files[0];


//             if(!file)
//             return;



//             try{


//             setUploading(true);



//             const url =
//             await uploadWorkerProfileImage(

//             user.uid,

//             file

//             );



//             await updateDoc(

//             doc(
//             db,
//             "healthcareWorkers",
//             user.uid
//             ),

//             {

//             profileImage:url,

//             updatedAt:Date.now()

//             }

//             );



//             setProfile(prev=>({

//             ...prev,

//             profileImage:url

//             }));


//             }

//             catch(error){

//             console.log(error);

//             }

//             finally{


//             setUploading(false);


//             }


// };

//     async function loadProfile() {

//         setLoading(true);

//         try {

//             const snap = await getDoc(

//                 doc(
//                     db,
//                     "healthcareWorkers",
//                     user.uid
//                 )

//             );

//             if (snap.exists()) {

//                 setWorker({

//                     ...emptyWorker,

//                     ...snap.data()

//                 });

//             }

//         } catch (e) {

//             console.log(e);

//         }

//         setLoading(false);

//     }

//     async function saveProfile() {

//         setSaving(true);

//         try {

//             await updateDoc(

//                 doc(
//                     db,
//                     "healthcareWorkers",
//                     user.uid
//                 ),

//                 worker

//             );

//             alert("Profile updated successfully!");

//         } catch (e) {

//             console.log(e);

//             alert("Unable to save profile.");

//         }

//         setSaving(false);

//     }

//     async function uploadProfilePhoto(e) {

//         const file = e.target.files[0];

//         if (!file) return;

//         try {

//             const storageRef = ref(

//                 storage,

//                 `workerDocuments/${user.uid}/profile.jpg`

//             );

//             await uploadBytes(

//                 storageRef,

//                 file

//             );

//             const url = await getDownloadURL(storageRef);

//             await updateDoc(

//                 doc(
//                     db,
//                     "healthcareWorkers",
//                     user.uid
//                 ),

//                 {

//                     image: url

//                 }

//             );

//             setWorker(prev => ({

//                 ...prev,

//                 image: url

//             }));

//         } catch (e) {

//             console.log(e);

//             alert("Unable to upload image.");

//         }

//     }

//     const completion = useMemo(() => {

//         const values = Object.values(worker);

//         const completed = values.filter(v => v !== "").length;

//         return Math.round(

//             completed / values.length * 100

//         );

//     }, [worker]);

//     if (loading) {

//         return (

//             <div className="min-h-screen flex items-center justify-center">

//                 <Loader2
//                     className="animate-spin"
//                     size={40}
//                 />

//             </div>

//         );

//     }

//     return (

//         <>
//             <Navbar />
//             <div className="min-h-screen bg-slate-50">

//                     <div className="max-w-6xl mx-auto px-6 py-10">

//                         {/* Header */}

//                         <div className="bg-white rounded-3xl border shadow-sm p-8">

//                             <div className="flex flex-col md:flex-row gap-8 items-center">

//                                 {/* <div className="relative">

//                                     <img

//                                         src={
//                                             worker.image ||
//                                             "/avatar.png"
//                                         }

//                                         alt="Profile"

//                                         className="w-44 h-44 rounded-full object-cover border-4 border-emerald-200"

//                                     />

//                                     <label

//                                         className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-3 cursor-pointer"

//                                     >

//                                         <Camera size={18} />

//                                         <input

//                                             hidden

//                                             type="file"

//                                             accept="image/*"

//                                             onChange={uploadProfilePhoto}

//                                         />

//                                     </label>

//                                     <button

//                                         onClick={()=>setEditing(true)}

//                                         className="
//                                         bg-emerald-600
//                                         text-white
//                                         px-5
//                                         py-2
//                                         rounded-xl
//                                         "

//                                         >

//                                         Edit Profile

//                                     </button>

//                                 </div> */}
//                                 <div className="relative">


//                                     <img

//                                     src={
//                                     worker.profileImage ||
//                                     "/avatar.png"
//                                     }

//                                     className="
//                                     w-32
//                                     h-32
//                                     rounded-full
//                                     object-cover
//                                     border-4
//                                     border-white
//                                     shadow
//                                     "

//                                     />



//                                     <label

//                                     className="
//                                     absolute
//                                     bottom-0
//                                     right-0
//                                     bg-emerald-600
//                                     text-white
//                                     rounded-full
//                                     p-3
//                                     cursor-pointer
//                                     "

//                                     >


//                                     📷


//                                     <input

//                                     type="file"

//                                     accept="image/*"

//                                     hidden

//                                     onChange={handleProfilePhoto}

//                                     />


//                                     </label>


//                                     </div>

//                                 <div className="flex-1">

//                                     <h1 className="text-4xl font-bold">

//                                         {worker.firstName} {worker.lastName}

//                                     </h1>

//                                     <p className="text-xl text-gray-500 mt-2">

//                                         {worker.profession || "Healthcare Professional"}

//                                     </p>

//                                     <div className="mt-5 inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full">

//                                         <ShieldCheck size={18} />

//                                         Verified Professional

//                                     </div>


//                                 </div>

//                             </div>

//                             <div className="mt-10">

//                                 <div className="flex justify-between">

//                                     <span className="font-medium">

//                                         Profile Completion

//                                     </span>

//                                     <span>

//                                         {completion}%

//                                     </span>

//                                 </div>

//                                 <div className="h-3 rounded-full bg-slate-200 mt-3">

//                                     <div

//                                         className="bg-emerald-500 h-3 rounded-full transition-all"

//                                         style={{

//                                             width: `${completion}%`

//                                         }}

//                                     />

//                                 </div>

//                             </div>

//                         </div>

//                         {/* Personal Card goes here */}

//                         {/* Professional Card goes here */}

//                         {/* Rates Card goes here */}

//                         {/* Documents Card goes here */}
//                         <DocumentsSection

//                             worker={worker}

//                             setWorker={setWorker}

//                         />


//                         <div className="mt-10 flex justify-end">

//                             <button

//                                 onClick={saveProfile}

//                                 disabled={saving}

//                                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl flex items-center gap-3"

//                             >

//                                 <Save size={18} />

//                                 {

//                                     saving

//                                         ? "Saving..."

//                                         : "Save Changes"

//                                 }

//                             </button>
//                             <button

//                                 onClick={()=>setEditing(true)}

//                                 className="
//                                 bg-blue-600
//                                 text-white
//                                 px-5
//                                 py-2
//                                 rounded-xl
//                                 ml-8
//                                 "

//                             >

//                                 Edit Profile

//                             </button>

//                         </div>

//                     </div>
//                     {
//                         editing && (

//                         <ProfileEditModal

//                         profile={worker}

//                         onClose={()=>setEditing(false)}

//                         onSave={updateProfile}

//                         />

//                         )

//                     }

//             </div>

//             {/* <footer className="border-t border-slate-100 py-8">
//                 <div className="container text-center text-sm text-slate-500">
//                 &copy; {new Date().getFullYear()} CareConnect. Built for verified freelance care.
//                 </div>
//             </footer> */}
//         </>

        
        

//     );

// }

"use client";

import { useEffect, useMemo, useState } from "react";

import {
    Camera,
    Save,
    ShieldCheck,
    Loader2,
    ImagePlus,
    Trash2,
    X
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
    getDownloadURL,
    deleteObject
} from "firebase/storage";

import {
    db,
    storage
} from "../../lib/firebase/firebase";

import {
    uploadWorkerProfileImage
} from "@/app/lib/workers/uploadProfileImage";

import ProfileEditModal from "./ProfileEditModal";
import DocumentsSection from "./DocumentsSection";
import Navbar from "@/app/components/Navbar";


const emptyWorker = {
    profileImage: "",
    galleryImages: [],

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    parish: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",

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
    const [uploading, setUploading] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    const [editing, setEditing] = useState(false);

    const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);


    /*
    |--------------------------------------------------------------------------
    | Load Profile
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!user?.uid) {
            setLoading(false);
            return;
        }

        loadProfile();

    }, [user]);


    async function loadProfile() {

        if (!user?.uid) return;

        setLoading(true);

        try {

            const workerRef = doc(
                db,
                "healthcareWorkers",
                user.uid
            );

            const snap = await getDoc(workerRef);

            if (snap.exists()) {

                const data = snap.data();

                setWorker({
                    ...emptyWorker,
                    ...data,

                    /*
                     * Make sure galleryImages is always an array.
                     */
                    galleryImages: Array.isArray(data.galleryImages)
                        ? data.galleryImages.slice(0, 5)
                        : []
                });

            }

        } catch (error) {

            console.error(
                "Error loading professional profile:",
                error
            );

        } finally {

            setLoading(false);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | Update Profile From Edit Modal
    |--------------------------------------------------------------------------
    */

    const updateProfile = async (data) => {

        if (!user?.uid) return;

        try {

            /*
             * The edit modal may return the edited fields directly,
             * or may return personal/professional/rates objects.
             *
             * We support both formats.
             */

            const personal = data?.personal || {};
            const professional = data?.professional || {};
            const rates = data?.rates || {};

            const flattenedData = {
                ...data,
                ...personal,
                ...professional,
                ...rates
            };

            /*
             * Remove nested objects so they don't accidentally get
             * written as unwanted duplicate fields.
             */
            delete flattenedData.personal;
            delete flattenedData.professional;
            delete flattenedData.rates;


            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                {
                    ...flattenedData,
                    updatedAt: Date.now()
                }

            );


            /*
             * Update the local page state.
             */
            setWorker(prev => ({
                ...prev,
                ...flattenedData
            }));


            setEditing(false);

            alert("Profile updated successfully!");

        } catch (error) {

            console.error(
                "Error updating professional profile:",
                error
            );

            alert(
                error?.message || "Unable to update profile."

            );

        }

    };

    console.log("worker:", worker);

    /*
    |--------------------------------------------------------------------------
    | Profile Photo
    |--------------------------------------------------------------------------
    */

    const handleProfilePhoto = async (e) => {

        const file = e.target.files?.[0];

        /*
         * Allow selecting the same file again later.
         */
        e.target.value = "";

        if (!file) return;


        if (!user?.uid) {

            alert("You must be logged in to upload a profile photo.");

            return;

        }


        /*
         * Basic image validation.
         */
        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;

        }


        /*
         * Keep profile images reasonably sized.
         */
        if (file.size > 10 * 1024 * 1024) {

            alert("Profile images must be 10 MB or smaller.");

            return;

        }


        try {

            setUploading(true);


            /*
             * Continue using your existing helper for the
             * main profile image.
             */
            const url = await uploadWorkerProfileImage(
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
                    profileImage: url,
                    updatedAt: Date.now()
                }

            );


            setWorker(prev => ({
                ...prev,
                profileImage: url
            }));


        } catch (error) {

            console.error(
                "Error uploading profile photo:",
                error
            );

            alert(
                error?.message ||
                "Unable to upload profile photo."
            );

        } finally {

            setUploading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Gallery Images
    |--------------------------------------------------------------------------
    */

    const handleGalleryUpload = async (e) => {

        const files = Array.from(
            e.target.files || []
        );

        /*
         * Reset input so the same files can be selected again.
         */
        e.target.value = "";

        if (!files.length) return;


        if (!user?.uid) {

            alert(
                "You must be logged in to upload gallery images."
            );

            return;

        }


        const currentImages = Array.isArray(worker.galleryImages)
            ? worker.galleryImages
            : [];


        /*
         * Maximum total gallery images = 5.
         */
        const remainingSlots = 5 - currentImages.length;


        if (remainingSlots <= 0) {

            alert(
                "You can have a maximum of 5 gallery images."
            );

            return;

        }


        /*
         * Only process enough files to fill the remaining slots.
         */
        const selectedFiles = files.slice(
            0,
            remainingSlots
        );


        if (files.length > remainingSlots) {

            alert(
                `You can only add ${remainingSlots} more gallery image${
                    remainingSlots === 1 ? "" : "s"
                }.`
            );

        }


        /*
         * Validate all selected files before starting uploads.
         */
        for (const file of selectedFiles) {

            if (!file.type.startsWith("image/")) {

                alert(
                    `"${file.name}" is not a valid image.`
                );

                return;

            }


            if (file.size > 10 * 1024 * 1024) {

                alert(
                    `"${file.name}" is larger than 10 MB.`
                );

                return;

            }

        }


        try {

            setUploadingGallery(true);


            const uploadedUrls = [];


            /*
             * Upload each gallery image to:
             *
             * workerDocuments/{uid}/gallery/{unique-file}
             */
            for (const file of selectedFiles) {

                const uniqueName =
                    `${Date.now()}-${crypto.randomUUID()}-${file.name}`;


                const storageRef = ref(
                    storage,
                    `workerDocuments/${user.uid}/gallery/${uniqueName}`
                );


                await uploadBytes(
                    storageRef,
                    file
                );


                const url =
                    await getDownloadURL(storageRef);


                uploadedUrls.push(url);

            }


            /*
             * Combine existing images with new images.
             */
            const updatedGallery = [
                ...currentImages,
                ...uploadedUrls
            ].slice(0, 5);


            /*
             * Save gallery URLs to Firestore.
             */
            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                {
                    galleryImages: updatedGallery,
                    updatedAt: Date.now()
                }

            );


            /*
             * Update local state immediately.
             */
            setWorker(prev => ({
                ...prev,
                galleryImages: updatedGallery
            }));


        } catch (error) {

            console.error(
                "Error uploading gallery images:",
                error
            );

            alert(
                error?.message ||
                "Unable to upload gallery images."
            );

        } finally {

            setUploadingGallery(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Gallery Image
    |--------------------------------------------------------------------------
    */

    const removeGalleryImage = async (index) => {

        if (!user?.uid) return;


        const currentImages = Array.isArray(worker.galleryImages)
            ? worker.galleryImages
            : [];


        const imageUrl = currentImages[index];


        if (!imageUrl) return;


        const confirmed = window.confirm(
            "Remove this image from your professional gallery?"
        );


        if (!confirmed) return;


        try {

            /*
             * Attempt to delete the actual Storage file.
             *
             * If the URL cannot be converted into a Storage reference,
             * we still remove the URL from Firestore.
             */
            try {

                const storageRef =
                    ref(storage, imageUrl);

                await deleteObject(storageRef);

            } catch (storageError) {

                /*
                 * The Storage file may already have been deleted,
                 * or Firebase may not be able to resolve the URL.
                 *
                 * We don't want that to prevent Firestore cleanup.
                 */
                console.warn(
                    "Could not delete gallery file from Storage:",
                    storageError
                );

            }


            const updatedGallery =
                currentImages.filter(
                    (_, imageIndex) =>
                        imageIndex !== index
                );


            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                {
                    galleryImages: updatedGallery,
                    updatedAt: Date.now()
                }

            );


            setWorker(prev => ({
                ...prev,
                galleryImages: updatedGallery
            }));


        } catch (error) {

            console.error(
                "Error removing gallery image:",
                error
            );

            alert(
                error?.message ||
                "Unable to remove gallery image."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Save Profile
    |--------------------------------------------------------------------------
    */

    async function saveProfile() {

        if (!user?.uid) return;

        setSaving(true);

        try {

            /*
             * Never allow more than five gallery URLs
             * to be saved.
             */
            const galleryImages =
                Array.isArray(worker.galleryImages)
                    ? worker.galleryImages.slice(0, 5)
                    : [];


            const profileToSave = {
                ...worker,
                galleryImages,
                updatedAt: Date.now()
            };


            await updateDoc(

                doc(
                    db,
                    "healthcareWorkers",
                    user.uid
                ),

                profileToSave

            );


            setWorker(prev => ({
                ...prev,
                galleryImages
            }));


            alert(
                "Profile updated successfully!"
            );


        } catch (error) {

            console.error(
                "Error saving professional profile:",
                error
            );

            alert(
                error?.message ||
                "Unable to save profile."
            );

        } finally {

            setSaving(false);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Profile Completion
    |--------------------------------------------------------------------------
    */

    const completion = useMemo(() => {

        /*
         * Don't count galleryImages as one simple field.
         */
        const values = Object.entries(worker)
            .filter(
                ([key]) =>
                    key !== "galleryImages"
            )
            .map(
                ([, value]) =>
                    value
            );


        const completed =
            values.filter(value => {

                if (Array.isArray(value)) {
                    return value.length > 0;
                }

                return (
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                );

            }).length;


        if (!values.length) {
            return 0;
        }


        return Math.round(
            (completed / values.length) * 100
        );

    }, [worker]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <Loader2
                    className="animate-spin text-emerald-600"
                    size={40}
                />

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    const galleryImages =
        Array.isArray(worker.galleryImages)
            ? worker.galleryImages
            : [];


    const gallerySlotsRemaining =
        5 - galleryImages.length;


    return (

        <>

            <Navbar />


            <div className="min-h-screen bg-slate-50">

                <div className="max-w-6xl mx-auto px-6 py-10">


                    {/* =====================================================
                        PROFILE HEADER
                    ===================================================== */}

                    <div className="bg-white rounded-3xl border shadow-sm p-8">

                        <div className="flex flex-col md:flex-row gap-8 items-center">


                            {/* Profile Photo */}

                            <div className="relative shrink-0">

                                <img
                                    src={
                                        worker.profileImage ||
                                        "/avatar.png"
                                    }
                                    alt={`${worker.firstName} ${worker.lastName}`}
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
                                        hover:bg-emerald-700
                                        text-white
                                        rounded-full
                                        p-3
                                        cursor-pointer
                                        shadow
                                    "
                                    title="Change profile photo"
                                >

                                    {uploading ? (

                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />

                                    ) : (

                                        <Camera size={18} />

                                    )}


                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        disabled={uploading}
                                        onChange={handleProfilePhoto}
                                    />

                                </label>

                            </div>


                            {/* Profile Details */}

                            <div className="flex-1">

                                <h1 className="text-4xl font-bold">

                                    {worker.personal.accountType === "individual" ? (
                                        <>
                                            {worker.personal.firstName}{" "}
                                            {worker.personal.lastName}
                                        </>
                                    ) : (
                                        worker.personal.businessName
                                    )}

                                </h1>


                                <p className="text-xl text-gray-500 mt-2">

                                    {worker.profession ||
                                        "Healthcare Professional"}

                                </p>


                                <div className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-green-100
                                    text-green-700
                                    px-5
                                    py-2
                                    rounded-full
                                ">

                                    <ShieldCheck size={18} />

                                    Verified Professional

                                </div>

                            </div>

                        </div>


                        {/* Profile Completion */}

                        <div className="mt-10">

                            <div className="flex justify-between">

                                <span className="font-medium">

                                    Profile Completion

                                </span>

                                <span>

                                    {completion}%

                                </span>

                            </div>


                            <div className="
                                h-3
                                rounded-full
                                bg-slate-200
                                mt-3
                            ">

                                <div
                                    className="
                                        bg-emerald-500
                                        h-3
                                        rounded-full
                                        transition-all
                                    "
                                    style={{
                                        width: `${completion}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        PROFESSIONAL GALLERY
                    ===================================================== */}

                    {galleryImages.length > 0 ? (
                        <div
                            className="
                                grid
                                grid-cols-2
                                sm:grid-cols-3
                                md:grid-cols-4
                                lg:grid-cols-5
                                gap-3
                                mt-6
                            "
                        >
                            {galleryImages.map((imageUrl, index) => (
                                <div
                                    key={`${imageUrl}-${index}`}
                                    className="
                                        group
                                        relative
                                        aspect-square
                                        overflow-hidden
                                        rounded-xl
                                        bg-slate-100
                                        border
                                        cursor-pointer
                                    "
                                    onClick={() =>
                                        setSelectedGalleryImage(imageUrl)
                                    }
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Professional gallery image ${index + 1}`}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                            transition-transform
                                            duration-300
                                            group-hover:scale-105
                                        "
                                    />

                                    {/* View overlay */}
                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-black/0
                                            group-hover:bg-black/20
                                            transition
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        <div
                                            className="
                                                opacity-0
                                                group-hover:opacity-100
                                                transition
                                                bg-white/90
                                                text-slate-800
                                                px-3
                                                py-1.5
                                                rounded-full
                                                text-xs
                                                font-medium
                                                shadow
                                            "
                                        >
                                            View
                                        </div>
                                    </div>

                                    {/* Delete button */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeGalleryImage(index);
                                        }}
                                        className="
                                            absolute
                                            top-2
                                            right-2
                                            bg-red-600
                                            hover:bg-red-700
                                            text-white
                                            rounded-full
                                            p-1.5
                                            opacity-0
                                            group-hover:opacity-100
                                            transition
                                            shadow-lg
                                        "
                                        title="Remove image"
                                        aria-label={`Remove gallery image ${index + 1}`}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="
                                mt-6
                                border-2
                                border-dashed
                                border-slate-200
                                rounded-2xl
                                p-10
                                text-center
                            "
                        >
                            <ImagePlus
                                size={42}
                                className="mx-auto text-slate-300"
                            />

                            <p className="mt-4 font-medium text-slate-700">
                                No gallery images yet
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                                Add up to 5 images to showcase your professional profile.
                            </p>
                        </div>
                    )}
                    

                    <div className="
                        mt-8
                        bg-white
                        rounded-3xl
                        border
                        shadow-sm
                        p-8
                    ">

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-4
                        ">

                            <div>

                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                ">

                                    Professional Gallery

                                </h2>


                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">

                                    Showcase your work, professional
                                    environment, certifications, or
                                    other images relevant to your
                                    professional profile.

                                </p>

                            </div>


                            <div className="text-sm text-slate-500">

                                {galleryImages.length} / 5 images

                            </div>

                        </div>


                        {/* Gallery */}

                        {galleryImages.length > 0 ? (

                            <div className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                gap-5
                                mt-6
                            ">

                                {galleryImages.map(
                                    (imageUrl, index) => (

                                        <div
                                            key={`${imageUrl}-${index}`}
                                            className="
                                                group
                                                relative
                                                aspect-[4/3]
                                                overflow-hidden
                                                rounded-2xl
                                                bg-slate-100
                                                border
                                            "
                                        >

                                            <img
                                                src={imageUrl}
                                                alt={`Professional gallery image ${
                                                    index + 1
                                                }`}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-105
                                                "
                                            />


                                            {/* Delete button */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeGalleryImage(
                                                        index
                                                    )
                                                }
                                                className="
                                                    absolute
                                                    top-3
                                                    right-3
                                                    bg-red-600
                                                    hover:bg-red-700
                                                    text-white
                                                    rounded-full
                                                    p-2
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition
                                                    shadow-lg
                                                "
                                                title="Remove image"
                                            >

                                                <Trash2 size={17} />

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="
                                mt-6
                                border-2
                                border-dashed
                                border-slate-200
                                rounded-2xl
                                p-10
                                text-center
                            ">

                                <ImagePlus
                                    size={42}
                                    className="
                                        mx-auto
                                        text-slate-300
                                    "
                                />

                                <p className="
                                    mt-4
                                    font-medium
                                    text-slate-700
                                ">

                                    No gallery images yet

                                </p>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">

                                    Add up to 5 images to showcase
                                    your professional profile.

                                </p>

                            </div>

                        )}


                        {/* Upload */}

                        {gallerySlotsRemaining > 0 && (

                            <div className="mt-6">

                                <label className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-5
                                    py-3
                                    rounded-xl
                                    text-white
                                    font-medium
                                    transition
                                    ${
                                        uploadingGallery
                                            ? "bg-slate-400 cursor-not-allowed"
                                            : "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                                    }
                                `}>

                                    {uploadingGallery ? (

                                        <>

                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />

                                            Uploading...

                                        </>

                                    ) : (

                                        <>

                                            <ImagePlus size={18} />

                                            Add Gallery Images

                                        </>

                                    )}


                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        multiple
                                        hidden
                                        disabled={uploadingGallery}
                                        onChange={handleGalleryUpload}
                                    />

                                </label>


                                <p className="
                                    text-xs
                                    text-slate-500
                                    mt-2
                                ">

                                    You can add{" "}
                                    <strong>
                                        {gallerySlotsRemaining}
                                    </strong>{" "}
                                    more image
                                    {gallerySlotsRemaining === 1
                                        ? ""
                                        : "s"}
                                    . Maximum 10 MB per image.

                                </p>

                            </div>

                        )}

                    </div>


                    {/* =====================================================
                        DOCUMENTS
                    ===================================================== */}

                    <DocumentsSection
                        worker={worker}
                        setWorker={setWorker}
                    />


                    {/* =====================================================
                        SAVE / EDIT
                    ===================================================== */}

                    <div className="
                        mt-10
                        flex
                        flex-col
                        sm:flex-row
                        justify-end
                        gap-4
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                setEditing(true)
                            }
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >

                            Edit Profile

                        </button>


                        <button
                            type="button"
                            onClick={saveProfile}
                            disabled={saving}
                            className="
                                bg-emerald-600
                                hover:bg-emerald-700
                                disabled:bg-emerald-300
                                text-white
                                px-8
                                py-3
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-3
                            "
                        >

                            {saving ? (

                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />

                            ) : (

                                <Save size={18} />

                            )}


                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>


                </div>


                {/* =========================================================
                    EDIT PROFILE MODAL
                ========================================================= */}

                {editing && (

                    <ProfileEditModal
                        profile={worker}
                        onClose={() =>
                            setEditing(false)
                        }
                        onSave={updateProfile}
                    />

                )}

                {/* =====================================================
                        GALLERY IMAGE LIGHTBOX
                    ===================================================== */}

                    {selectedGalleryImage && (

                        <div
                            className="
                                fixed
                                inset-0
                                z-[100]
                                bg-black/80
                                backdrop-blur-sm
                                flex
                                items-center
                                justify-center
                                p-4
                            "
                            onClick={() => setSelectedGalleryImage(null)}
                        >

                            {/* Close button */}

                            <button
                                type="button"
                                onClick={() => setSelectedGalleryImage(null)}
                                className="
                                    absolute
                                    top-5
                                    right-5
                                    z-10
                                    bg-white/90
                                    hover:bg-white
                                    text-slate-900
                                    rounded-full
                                    p-3
                                    shadow-xl
                                    transition
                                "
                                aria-label="Close image viewer"
                            >

                                <X size={24} />

                            </button>


                            {/* Large Image */}

                            <div
                                className="
                                    relative
                                    max-w-6xl
                                    max-h-[90vh]
                                    w-full
                                    flex
                                    items-center
                                    justify-center
                                "
                                onClick={(e) => e.stopPropagation()}
                            >

                                <img
                                    src={selectedGalleryImage}
                                    alt="Professional gallery"
                                    className="
                                        max-w-full
                                        max-h-[90vh]
                                        object-contain
                                        rounded-2xl
                                        shadow-2xl
                                    "
                                />

                            </div>

                        </div>

                    )}

            </div>

        </>

    );

}