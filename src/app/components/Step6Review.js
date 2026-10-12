// "use client";

// import React, { useState } from "react";
// import {
//   sendEmailVerification,
//   reload,
// } from "firebase/auth";
// import { auth } from "../lib/firebase/config";
// import { submitWorkerApplication } from "../lib/firebase/application";
// import { useRouter } from "next/navigation";

"use client";

import React, { useState } from "react";
import {
  sendEmailVerification,
  reload,
  getIdToken,
} from "firebase/auth";

import { auth } from "../lib/firebase/firebase";
import { registerWorker } from "../lib/firebase/auth";
import { submitWorkerApplication } from "../lib/firebase/application";
import { useRouter } from "next/navigation";

export default function Step5Review({ previous, application }) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [certified, setCertified] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  async function sendVerificationEmail(user) {
    await sendEmailVerification(user);
    setVerificationRequired(true);
    setVerificationEmailSent(true);
    setError("");
  }

  async function submitApplication() {
    try {
        setLoading(true);
        setError("");

        if (!certified) {
        setError("Please certify that all information provided is correct.");
        return;
        }

        let user = auth.currentUser;

        // Create the account if this is the first submission attempt.
        if (!user) {
        user = await registerWorker(
            application.account.email,
            application.account.password
        );
    }

     await reload(user);

    if (!user.emailVerified) {
        setVerificationRequired(true);

        if (!verificationEmailSent) {
            await sendEmailVerification(user);
            setVerificationEmailSent(true);
            setError("");
        } else {
            setError(
            "Please verify your email using the link sent to your inbox."
            );
        }

        return;
    }

    // Complete the application without creating another account.
    await submitWorkerApplication(user, application);

        alert("Your application has been submitted!");
            router.push("/dashboard");

        } catch (err) {
            console.error("Application submission error:", err);

        setError(
            err?.message || "Something went wrong. Please try again."
        );

        } finally {
            setLoading(false);
        }
    }

   

    async function checkEmailVerification() {
        try {
            setLoading(true);
            setError("");

            const user = auth.currentUser;

            if (!user) {
            setError("Your session has expired. Please sign in again.");
            return;
            }

            await reload(user);

            if (!user.emailVerified) {
            setError(
                "Your email has not been verified yet. Open the verification email and click its link."
            );
            return;
            }

            // Refresh the token so Firebase receives the latest verification claim.
            await getIdToken(user, true);

            // Complete the application using the existing account.
            await submitWorkerApplication(user, application);

            alert("Your email is verified and your application has been submitted!");
            router.push("/dashboard");
        } catch (err) {
            console.error("Verification check failed:", err);

            setError(
            err?.message ||
                "Unable to complete your application. Please try again."
            );
        } finally {
            setLoading(false);
        }
        }

//   async function submitApplication() {
//     try {
//       setLoading(true);
//       setError("");

//       if (!certified) {
//         setError(
//           "Please certify that all information provided is correct."
//         );
//         return;
//       }

//       const user = auth.currentUser;

//       if (!user) {
//         setError(
//           "You must be signed in to submit your application. Please sign in and try again."
//         );
//         return;
//       }

//       // Refresh Firebase's user information before checking verification.
//       await reload(user);

//       if (!user.emailVerified) {
//         setVerificationRequired(true);

//         // Send the verification email only if one has not already
//         // been sent during this page session.
//         if (!verificationEmailSent) {
//           await sendVerificationEmail(user);
//         } else {
//           setError(
//             "Please verify your email using the link we sent you, then select the verification button below."
//           );
//         }

//         return;
//       }

//       // Submit only after Firebase confirms the email is verified.
//       await submitWorkerApplication(application);

//       alert("🎉 Your application has been submitted!");
//       router.push("/dashboard");
//     } catch (err) {
//       console.error("Application submission error:", err);

//       setError(
//         err?.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }


  async function resendVerificationEmail() {
    try {
      setLoading(true);
      setError("");

      const user = auth.currentUser;

      if (!user) {
        setError("Please sign in again to resend the verification email.");
        return;
      }

      await reload(user);

      if (user.emailVerified) {
        setVerificationRequired(false);
        setVerificationEmailSent(false);
        setError(
          "Your email is already verified. You can now submit your application."
        );
        return;
      }

      await sendEmailVerification(user);

      setVerificationEmailSent(true);
      setError("");
    } catch (err) {
      console.error("Resending verification email failed:", err);

      setError(
        err?.code === "auth/too-many-requests"
          ? "Too many requests. Please wait before trying again."
          : err?.message ||
              "Unable to resend the verification email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">
      <h2 className="text-2xl font-bold">Review Application</h2>

      <p className="text-gray-500 mt-1">
        Please review your information before submitting.
      </p>

      {/* Personal Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          Personal Information
        </h3>

        <div className="bg-slate-50 rounded-lg p-5 mt-3 space-y-2">
          <p>
            Name:{" "}
            <span className="font-medium">
              {application.personal.firstName}{" "}
              {application.personal.lastName}
            </span>
          </p>

          <p>Phone: {application.personal.phone}</p>
          <p>Location: {application.personal.city}</p>
        </div>
      </div>

      {/* Professional Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          Professional Information
        </h3>

        <div className="bg-slate-50 rounded-lg p-5 mt-3 space-y-2">
          <p>
            Profession: {application.professional.profession}
          </p>

          <p>
            Experience: {application.professional.experience}
          </p>

          <p>
            Employer: {application.professional.employer}
          </p>

          <p>Specialties:</p>

          <ul className="list-disc ml-6">
            {application.professional.specialization?.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Documents</h3>

        <div className="bg-slate-50 rounded-lg p-5 mt-3 space-y-2">
          <p>✓ Government ID uploaded</p>
          <p>✓ Professional license uploaded</p>
          <p>✓ Certificates uploaded</p>
        </div>
      </div>

      {/* Certification */}
      {!verificationRequired && (
        <div className="mt-8 border rounded-lg p-5">
          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={certified}
              onChange={(event) =>
                setCertified(event.target.checked)
              }
              className="mt-1"
            />

            <span>
              I certify that all information provided is correct.
            </span>
          </label>
        </div>
      )}

      {/* Email Verification */}
      {verificationRequired && (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-lg font-semibold text-amber-900">
            Verify your email address
          </h3>

          <p className="mt-2 text-sm text-amber-800">
            Before submitting your healthcare worker application,
            please verify the email address associated with your
            account.
          </p>

          {auth.currentUser?.email && (
            <p className="mt-3 font-medium text-gray-800">
              {auth.currentUser.email}
            </p>
          )}

          <p className="mt-3 text-sm text-gray-700">
            {verificationEmailSent
              ? "Check your inbox and spam folder. Open the verification email and click the link, then return here."
              : "Send a verification email to continue."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={checkEmailVerification}
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:bg-gray-400"
            >
              {loading
                ? "Checking..."
                : "I've verified my email"}
            </button>

            <button
              type="button"
              onClick={resendVerificationEmail}
              disabled={loading}
              className="rounded-lg border border-amber-300 px-5 py-3 text-amber-900 hover:bg-amber-100 disabled:opacity-50"
            >
              Resend verification email
            </button>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <div
          role="alert"
          className="mt-6 rounded-lg bg-red-50 border border-red-200 text-red-700 p-4"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap justify-between gap-4 mt-10">
        <button
          type="button"
          onClick={previous}
          disabled={loading}
          className="px-6 py-3 border rounded-lg disabled:opacity-50"
        >
          ← Back
        </button>

        {!verificationRequired && (
          <button
            type="button"
            onClick={submitApplication}
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import { submitWorkerApplication } from "../lib/firebase/application";
// import { useRouter } from "next/navigation";




// export default function Step5Review({
//     previous,
//     application
// }){

//     const router = useRouter();
    
//     const [error,setError]=useState("");
//     const [loading,setLoading]=useState(false);

//     console.log("application ", application)


//     async function submitApplication() {

//         try {

//             setLoading(true);
//             setError("");

//             await submitWorkerApplication(application);

//             alert("🎉 Your application has been submitted!");
//             // router.push("/apply/success");
//             // router.push("/apply/status");
//             router.push("/dashboard");

//         } catch (err) {

//             console.error(err);

//             setError(err.message);

//         } finally {

//             setLoading(false);

//         }

//     }



//     return (

//         <div className="bg-white mt-10 rounded-2xl shadow-lg border p-8">


//             <h2 className="text-2xl font-bold">

//             Review Application

//             </h2>


//             <p className="text-gray-500 mt-1">

//             Please review your information before submitting.

//             </p>

//             {/* Personal */}


//             <div className="mt-8">


//             <h3 className="text-lg font-semibold">

//             Personal Information

//             </h3>


//             <div className="bg-slate-50 rounded-lg p-5 mt-3">


//             <p>

//             Name:
//             <span className="font-medium">

//             {" "}
//             {application.personal.firstName}

//             {" "}

//             {application.personal.lastName}

//             </span>

//             </p>



//             <p>

//             Phone:

//             {" "}

//             {application.personal.phone}

//             </p>



//             <p>

//             Location:

//             {" "}

//             {application.personal.city}

//             </p>



//             </div>


//             </div>






//             {/* Professional */}



//             <div className="mt-8">


//             <h3 className="text-lg font-semibold">

//             Professional Information

//             </h3>



//             <div className="bg-slate-50 rounded-lg p-5 mt-3">


//             <p>

//             Profession:

//             {" "}

//             {application.professional.profession}

//             </p>



//             <p>

//             Experience:

//             {" "}

//             {application.professional.experience}

//             </p>



//             <p>

//             Employer:

//             {" "}

//             {application.professional.employer}

//             </p>



//             <p>

//             Specialties:

//             </p>


//             <ul className="list-disc ml-6">

//             {
//             application.professional.specialization?.map(
//             (item,index)=>(

//             <li key={index}>

//             {item}

//             </li>

//             )

//             )

//             }

//             </ul>


//             </div>


//             </div>






//             {/* Documents */}


//             <div className="mt-8">


//             <h3 className="text-lg font-semibold">

//             Documents

//             </h3>


//             <div className="bg-slate-50 rounded-lg p-5 mt-3">

//             {application.documents.governmentId.length === 0 ? (



//                  <p>

//             ✓ Government ID Uploaded

//             </p>


//             ):<>
            
//             </> }

//             <p>

//             ✓ Government ID Uploaded

//             </p>


//             <p>

//             ✓ Professional License Uploaded

//             </p>


//             <p>

//             ✓ Certificates Uploaded

//             </p>


//             </div>


//             </div>






//             <div className="mt-8 border rounded-lg p-5">


//             <label className="flex gap-3">


//             <input

//             type="checkbox"

//             />


//             <span>

//             I certify that all information provided is correct.

//             </span>


//             </label>


//             </div>








//             <div className="flex justify-between mt-10">


//             <button

//             onClick={previous}

//             className="px-6 py-3 border rounded-lg"

//             >

//             ← Back

//             </button>



//                 {error && (

//                 <div className="mt-6 rounded-lg bg-red-50 border border-red-200 text-red-700 p-4">

//                     {error}

//                 </div>

// )}


//             <button
//                 onClick={submitApplication}
//                 disabled={loading}
//                 className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg"
//             >

//                 {loading
//                     ? "Submitting..."
//                     : "Submit Application"}

//             </button>


//             </div>





//         </div>

//     );


// }