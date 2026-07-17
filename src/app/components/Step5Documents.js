// "use client";

// import { useState } from "react";


// export default function Step5Documents({previous,next}) {


//     const [files,setFiles] = useState({

//         profilePhoto:null,
//         governmentId:null,
//         license:null,
//         certificates:null,
//         employmentProof:null

//     });



//     function uploadFile(e,name){

//         setFiles({

//             ...files,

//             [name]:e.target.files[0]

//         });

//     }



//     return (

//     <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


//         <h2 className="text-2xl font-bold">

//             Document Verification

//         </h2>


//         <p className="text-gray-500 mt-1">

//             Upload documents required to verify your professional profile.

//         </p>



//         {/* Profile Image */}

//         <div className="mt-8">


//             <label className="font-medium">

//                 Profile Photo

//             </label>


//             <input

//                 type="file"

//                 accept="image/*"

//                 onChange={(e)=>
//                     uploadFile(e,"profilePhoto")
//                 }

//                 className="block mt-3"

//             />


//         </div>






//         <div className="grid md:grid-cols-2 gap-6 mt-8">


//             {/* Government ID */}

//             <div>

//                 <label className="font-medium">

//                     Government ID

//                 </label>


//                 <input

//                     type="file"

//                     onChange={(e)=>
//                         uploadFile(e,"governmentId")
//                     }

//                     className="block mt-3"

//                 />


//                 <p className="text-sm text-gray-500 mt-2">

//                     Passport, Driver License or National ID

//                 </p>

//             </div>





//             {/* License */}

//             <div>


//                 <label className="font-medium">

//                     Professional License

//                 </label>


//                 <input

//                     type="file"

//                     onChange={(e)=>
//                         uploadFile(e,"license")
//                     }

//                     className="block mt-3"

//                 />


//                 <p className="text-sm text-gray-500 mt-2">

//                     Nursing license, medical registration etc.

//                 </p>


//             </div>




//         </div>






//         <div className="grid md:grid-cols-2 gap-6 mt-8">



//             {/* Certificates */}

//             <div>


//                 <label className="font-medium">

//                     Certificates

//                 </label>


//                 <input

//                     type="file"

//                     multiple

//                     onChange={(e)=>
//                         uploadFile(e,"certificates")
//                     }

//                     className="block mt-3"

//                 />


//             </div>






//             {/* Employment */}

//             <div>


//                 <label className="font-medium">

//                     Employment Proof

//                 </label>


//                 <input

//                     type="file"

//                     onChange={(e)=>
//                         uploadFile(e,"employmentProof")
//                     }

//                     className="block mt-3"

//                 />


//             </div>


//         </div>








//         {/* Consent */}

//         <div className="mt-10 border rounded-lg p-5 bg-slate-50">


//             <label className="flex gap-3">


//                 <input

//                     type="checkbox"

//                 />


//                 <span>

//                 I confirm that the information provided is accurate
//                 and I authorize verification of my healthcare credentials.

//                 </span>


//             </label>


//         </div>






//         <div className="flex justify-between mt-10">


//             <button

//                 onClick={previous}

//                 className="px-6 py-3 border rounded-lg"

//             >

//                 ← Back

//             </button>





//             <button

//                 onClick={next}

//                 className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg"

//             >

//                 Continue →

//             </button>


//         </div>




//     </div>


//     );

// }

"use client";

import {
validateDocuments
}
from "../lib/firebase/validation";
import { useState } from "react";
import {
    Camera,
    Upload,
    FileText,
    Trash2,
    ShieldCheck
} from "lucide-react";

export default function Step5Documents({
    previous,
    next,
    save,
    data
}) {

    const [form, setForm] = useState({

        profilePhoto: null,
        governmentId: null,
        professionalLicense: null,
        certificates: [],
        employmentLetter: null,

        ...data

    });

    const [preview, setPreview] = useState(
        data?.profilePhoto
            ? URL.createObjectURL(data.profilePhoto)
            : null
    );

    function handleFile(name, file) {

        if (!file) return;

        if (name === "profilePhoto") {

            setPreview(URL.createObjectURL(file));

        }

        setForm({

            ...form,

            [name]: file

        });

    }

    function handleCertificates(files) {

        const list = [...files];

        setForm({

            ...form,

            certificates: [...form.certificates, ...list]

        });

    }

    const [error,setError]=useState("");

    function removeCertificate(index) {

        const updated = form.certificates.filter(
            (_, i) => i !== index
        );

        setForm({

            ...form,

            certificates: updated

        });

    }

    // function continueNext() {

    //     save(form);

    //     next();

    // }

    function continueNext(){


    const validation =
    validateDocuments(form);



    if(validation){

        setError(validation);
    alert(validation);

    return;

    }



    save(form);

    next();


    }

    

    return (

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mt-10 p-8">

            <h2 className="text-3xl font-bold">

                Verification Documents

            </h2>

            <p className="text-gray-500 mt-2">

                Upload the required documents so our team can verify your healthcare credentials.

            </p>

            {/* Profile */}

            <div className="mt-10 border rounded-2xl p-6">

                <div className="flex items-center gap-4">

                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">

                        {preview ? (

                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <Camera className="text-gray-400" size={40} />

                        )}

                    </div>

                    <div>

                        <h3 className="font-semibold text-lg">

                            Profile Photo (Optional)

                        </h3>

                        <p className="text-sm text-gray-500">

                            Upload a professional headshot.

                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            className="mt-3"
                            onChange={(e) =>
                                handleFile(
                                    "profilePhoto",
                                    e.target.files[0]
                                )
                            }
                        />

                    </div>

                </div>

            </div>

            {/* Government ID */}

            <DocumentCard
                title="Government ID"
                subtitle="Passport, National ID or Driver's License"
                onUpload={(file) =>
                    handleFile("governmentId", file)
                }
                uploaded={!!form.governmentId}
            />

            {/* Professional License */}

            <DocumentCard
                title="Professional License"
                subtitle="Medical Council / Nursing License"
                onUpload={(file) =>
                    handleFile("professionalLicense", file)
                }
                uploaded={!!form.professionalLicense}
            />

            {/* Employment Letter */}

            <DocumentCard
                title="Employment Letter (Optional)"
                subtitle="Current employer verification"
                onUpload={(file) =>
                    handleFile("employmentLetter", file)
                }
                uploaded={!!form.employmentLetter}
            />

            {/* Certificates */}

            <div className="border rounded-2xl p-6 mt-6">

                <h3 className="font-semibold text-lg">

                    Certificates

                </h3>

                <p className="text-gray-500 text-sm">

                    Upload CPR, ACLS, Degrees or other certifications.

                </p>

                <input

                    type="file"

                    multiple

                    className="mt-4"

                    onChange={(e)=>

                        handleCertificates(e.target.files)

                    }

                />

                <div className="mt-6 space-y-3">

                    {

                        form.certificates.map((file,index)=>(

                            <div

                                key={index}

                                className="flex justify-between items-center border rounded-lg p-3"

                            >

                                <div className="flex items-center gap-3">

                                    <FileText size={18}/>

                                    <span>

                                        {file.name}

                                    </span>

                                </div>

                                <button

                                    type="button"

                                    onClick={()=>removeCertificate(index)}

                                    className="text-red-500"

                                >

                                    <Trash2 size={18}/>

                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* Consent */}

            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">

                <div className="flex items-start gap-3">

                    <ShieldCheck
                        className="text-emerald-600 mt-1"
                        size={24}
                    />

                    <div>

                        <h3 className="font-semibold">

                            Verification Consent

                        </h3>

                        <p className="text-sm text-gray-600 mt-1">

                            By continuing, you authorize KameraCare Hub
                            to verify your professional credentials and
                            securely store these documents.

                        </p>

                    </div>

                </div>

            </div>

        {
            error && (

            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">

            {error}

            </div>

         )
        }
            {/* Buttons */}

            <div className="flex justify-between mt-10">

                <button

                    onClick={previous}

                    className="px-6 py-3 border rounded-xl"

                >

                    ← Back

                </button>

                <button

                    onClick={continueNext}

                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl"

                >

                    Continue →

                </button>

            </div>

        </div>

    );

}

function DocumentCard({
    title,
    subtitle,
    uploaded,
    onUpload
}) {

    return (

        <div className="border rounded-2xl p-6 mt-6">

            <div className="flex justify-between items-center">

                <div>

                    <h3 className="font-semibold text-lg">

                        {title}

                    </h3>

                    <p className="text-gray-500 text-sm">

                        {subtitle}

                    </p>

                </div>

                {uploaded && (

                    <span className="text-emerald-600 font-medium">

                        ✓ Uploaded

                    </span>

                )}

            </div>

            <label className="inline-flex items-center gap-2 mt-4 cursor-pointer text-emerald-600 hover:text-emerald-700">

                <Upload size={18} />

                <span>Choose File</span>

                <input
                    type="file"
                    className="hidden"
                    onChange={(e)=>onUpload(e.target.files[0])}
                />

            </label>

        </div>

    );

}