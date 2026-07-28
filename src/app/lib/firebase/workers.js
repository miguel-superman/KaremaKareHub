import {
    count,
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore";

import {
APPLICATION_STATUS
}
from "./status";

import {
    db
} from "./firebase";

export async function createWorkerProfile(
    uid,
    application,
    uploadedDocs
) {

    delete application.account.password;
    delete application.account.confirm;

    await setDoc(
        doc(db, "healthcareWorkers", uid),
        {

            uid,

            email:
                application.account.email,

            status: APPLICATION_STATUS.PENDING,

            account: application.account,

            personal: application.personal,

            professional: application.professional,

            rates: application.rates,

            documents: uploadedDocs,

            // verification: {

            //     approved: false,

            //     rejected: false,

            //     reviewedBy: null,

            //     reviewedAt: null

            // },
            
            verification: {

                status: "pending",

                reviewedBy: null,

                reviewedAt: null,

                rejectionReason: null

            },

            country: "Jamaica",

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        }
    );

}