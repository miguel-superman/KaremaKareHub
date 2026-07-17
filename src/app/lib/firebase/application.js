import { registerWorker } from "./auth";
import { uploadWorkerDocuments } from "./uploads";
import { createWorkerProfile } from "./workers";

export async function submitWorkerApplication(application) {

    // Create Firebase Authentication account
    const user = await registerWorker(
        application.account.email,
        application.account.password
    );

    // Upload documents
    const uploadedDocuments =
        await uploadWorkerDocuments(
            user.uid,
            application.documents
        );

    // Create Firestore profile
    await createWorkerProfile(
        user.uid,
        application,
        uploadedDocuments
    );

    return user;

}