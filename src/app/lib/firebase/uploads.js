import { uploadFile } from "./storage";

export async function uploadWorkerDocuments(uid, documents) {

    const profilePhoto =
        await uploadFile(
            documents.profilePhoto,
            `workerDocuments/${uid}/profile-photo`
        );

    const governmentId =
        await uploadFile(
            documents.governmentId,
            `workerDocuments/${uid}/government-id`
        );

    const professionalLicense =
        await uploadFile(
            documents.professionalLicense,
            `workerDocuments/${uid}/professional-license`
        );

    const employmentLetter =
        await uploadFile(
            documents.employmentLetter,
            `workerDocuments/${uid}/employment-letter`
        );

    const certificates = [];

    for (const file of documents.certificates || []) {

        const url = await uploadFile(
            file,
            `workerDocuments/${uid}/certificates/${file.name}`
        );

        certificates.push(url);

    }

    return {

        profilePhoto,
        governmentId,
        professionalLicense,
        employmentLetter,
        certificates

    };

}