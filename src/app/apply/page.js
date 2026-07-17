// "use client";

// import { useState } from "react";

// import Navbar from "../components/Navbar";
// // import FirebaseBanner from "./components/FirebaseBanner";
// import ProgressHeader from "../components/ProgressHeader";

// import Step1Account from "../components/Step1Account";
// import Step2Personal from "../components/Step2Personal";
// import Step3Professional from "../components/Step3Professional";
// import Step4Documents from "../components/Step4Documents";

// export default function ApplyPage() {
//   const [step, setStep] = useState(1);

// //   return (
// //     <main className="min-h-screen bg-slate-50">

// //       <Navbar />

// //       {/* <FirebaseBanner /> */}

// //       <div className="max-w-4xl mx-auto py-12 px-6">

// //         <ProgressHeader step={step} />

// //         {/* {step === 1 && (
// //           <Step1Account
// //             next={() => setStep(2)}
// //           />
// //         )} */}

// //         {step === 1 && (
// //         <Step1Account
// //                 next={() => setStep(2)}
// //             />
// //         )}

// //         {step === 2 && (
// //             <Step2Personal
// //                 previous={() => setStep(1)}
// //                 next={() => setStep(3)}
// //             />
// //         )}

// //         {step === 3 && (
// //             <Step3Professional
// //                 previous={() => setStep(2)}
// //                 next={() => setStep(4)}
// //             />
// //         )}

// //         {step === 4 && (
// //             <Step4Documents
// //                 previous={() => setStep(3)}
// //                 next={() => setStep(5)}
// //             />
// //         )}

// //       </div>

// //     </main>
// //   );
// // }

//     return (

//     <main className="min-h-screen bg-slate-50">


//     <Navbar />



//     <div className="max-w-4xl mx-auto py-12 px-6">


//     <ProgressHeader step={step}/>



//     {
//     step === 1 &&

//     <Step1Account

//     next={()=>setStep(2)}

//     />

//     }




//     {
//     step === 2 &&

//     <Step2Personal

//     previous={()=>setStep(1)}

//     next={()=>setStep(3)}

//     />

//     }




//     {
//     step === 3 &&

//     <Step3Professional

//     previous={()=>setStep(2)}

//     next={()=>setStep(4)}

//     />

//     }





//     {
//     step === 4 &&

//     <Step4Documents

//     previous={()=>setStep(3)}

//     next={()=>setStep(5)}

//     />

//     }





//     {
//     step === 5 &&

//     <Step5Review

//     previous={()=>setStep(4)}

//     application={application}

//     />

//     }



//     </div>


//     </main>

//     );

// }

"use client";

import { useState } from "react";

import Navbar from "../components/Navbar";
import ProgressHeader from "../components/ProgressHeader";

import Step1Account from "../components/Step1Account";
import Step2Personal from "../components/Step2Personal";
import Step3Professional from "../components/Step3Professional";
import Step4Rates from "../components/Step4Rates";
import Step5Documents from "../components/Step5Documents";
import Step6Review from "../components/Step6Review";


export default function ApplyPage() {


    const [step,setStep] = useState(1);



    const [application,setApplication] = useState({

        account:{},

        personal:{},

        professional:{},

        rates:{},

        documents:{}

    });



    function saveStep(section,data){


        setApplication(prev => ({

            ...prev,

            [section]:data

        }));


    }




    return (

        <main className="min-h-screen bg-slate-50">


            <Navbar />


            <div className="max-w-4xl mx-auto py-12 px-6">


            <ProgressHeader step={step}/>



            {step === 1 && (

            <Step1Account

            data={application.account}

            save={(data)=>saveStep("account",data)}

            next={()=>setStep(2)}

            />

            )}





            {step === 2 && (

            <Step2Personal

            data={application.personal}

            save={(data)=>saveStep("personal",data)}

            previous={()=>setStep(1)}

            next={()=>setStep(3)}

            />

            )}






            {step === 3 && (

            <Step3Professional

            data={application.professional}

            save={(data)=>saveStep("professional",data)}

            previous={()=>setStep(2)}

            next={()=>setStep(4)}

            />

            )}






            {step === 4 && (

                <Step4Rates

                data={application.documents}

                save={(data)=>saveStep("documents",data)}

                previous={()=>setStep(3)}

                next={()=>setStep(5)}

                />

            )}

            {step === 5 && (

            <Step5Documents

                data={application.documents}

                save={(data)=>saveStep("documents",data)}

                previous={()=>setStep(4)}

                next={()=>setStep(6)}

            />

            )}






            {step === 6 && (

            <Step6Review

            application={application}

            previous={()=>setStep(5)}

            />

            )}





            </div>


        </main>


    );

}