import { uploadWorkerDocuments } from "./uploads";
import { createWorkerProfile } from "./workers";

/**
 * Complete the worker application after the email
 * has been verified.
 *
 * The Firebase Authentication account must already exist.
 */
export async function submitWorkerApplication(user, application) {
  if (!user) {
    throw new Error("A signed-in user is required.");
  }

  // Refresh the user's authentication state.
  const { reload } = await import("firebase/auth");
  await reload(user);

  if (!user.emailVerified) {
    throw new Error("Please verify your email before submitting.");
  }

  // Upload documents.
  const uploadedDocuments = await uploadWorkerDocuments(
    user.uid,
    application.documents
  );

  // Create the Firestore worker profile.
  await createWorkerProfile(
    user.uid,
    application,
    uploadedDocuments
  );

  return user;
}

// import { registerWorker } from "./auth";
// import { uploadWorkerDocuments } from "./uploads";
// import { createWorkerProfile } from "./workers";

// export async function submitWorkerApplication(application) {

//     // Create Firebase Authentication account
//     const user = await registerWorker(
//         application.account.email,
//         application.account.password
//     );

//     // Upload documents
//     const uploadedDocuments =
//         await uploadWorkerDocuments(
//             user.uid,
//             application.documents
//         );

//     // Create Firestore profile
//     await createWorkerProfile(
//         user.uid,
//         application,
//         uploadedDocuments
//     );
    
//     return user;

// }