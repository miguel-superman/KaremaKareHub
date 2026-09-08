const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const nodemailer = require("nodemailer");

initializeApp();

// ============================================================
// NEW HEALTHCARE WORKER
// ============================================================

exports.notifyNewHealthcareWorker = onDocumentCreated(
    "healthcareWorkers/{workerId}",
    async (event) => {
        try {
            const snapshot = event.data;

            if (!snapshot) {
                console.log("No worker document found.");
                return;
            }

            const worker = snapshot.data();
            const workerId = event.params.workerId;

            // ====================================================
            // WORKER INFORMATION
            // ====================================================

            const firstName =
                worker.personal?.firstName || "";

            const lastName =
                worker.personal?.lastName || "";

            const name =
                worker.name ||
                `${firstName} ${lastName}`.trim() ||
                "Healthcare Professional";

            const email =
                worker.email ||
                worker.account?.email ||
                "Not provided";

            const profession =
                worker.profession ||
                worker.professional?.profession ||
                "Not specified";

            const experience =
                worker.experience ||
                worker.professional?.experience ||
                "Not specified";

            const city =
                worker.city ||
                worker.personal?.city ||
                "Not specified";

            const parish =
                worker.personal?.parish ||
                "Not specified";

            const phone =
                worker.phone ||
                worker.personal?.phone ||
                "Not provided";

            const status =
                worker.status ||
                "pending";

            // ====================================================
            // SPECIALIZATIONS
            // ====================================================

            const specializations =
                worker.specialization ||
                worker.professional?.specialization ||
                [];

            const specializationText =
                Array.isArray(specializations) &&
                specializations.length > 0
                    ? specializations.join(", ")
                    : "Not specified";

            // ====================================================
            // REVIEW URL
            // ====================================================

            const reviewUrl =
                `https://karemakarehubbackend.web.app/admin/verification`;

            // ====================================================
            // LOGGING
            // ============================================================

            console.log(
                `New healthcare worker application: ${name}`
            );

            console.log(
                `Worker ID: ${workerId}`
            );

            console.log(
                `Profession: ${profession}`
            );

            console.log(
                `Status: ${status}`
            );


            console.log("GMAIL_USER exists:", !!process.env.NEXT_PUBLIC_GMAIL_APP_USER);

            console.log(
                "GMAIL_APP_PASSWORD exists:",
                !!process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD
            );

            console.log(
                "VERIFICATION_EMAIL exists:",
                !!process.env.VERIFICATION_EMAIL
            );


            // ====================================================
            // GMAIL TRANSPORTER
            // ====================================================

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NEXT_PUBLIC_GMAIL_APP_USER,
                    pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD,
                },
            });

            // ====================================================
            // EMAIL HTML
            // ====================================================

            const emailHtml = `
            <!DOCTYPE html>

            <html>

            <head>

                <meta charset="UTF-8">

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                >

                <title>
                    New Professional Application
                </title>

            </head>

            <body
                style="
                    margin:0;
                    padding:0;
                    background-color:#f4f7fb;
                    font-family:Arial, Helvetica, sans-serif;
                "
            >

            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color:#f4f7fb;"
            >

            <tr>

            <td
                align="center"
                style="padding:40px 15px;"
            >

            <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                    width:100%;
                    max-width:600px;
                    background:#ffffff;
                    border-radius:16px;
                    overflow:hidden;
                    box-shadow:0 4px 20px rgba(0,0,0,0.08);
                "
            >

            <!-- ===================================================== -->
            <!-- LOGO -->
            <!-- ===================================================== -->

            <tr>

            <td
                align="center"
                style="
                    padding:32px 30px 24px;
                    background:#ffffff;
                "
            >

            <img
                src="https://karemakarehubbackend.web.app/klogo.jpeg"
                alt="Karema Kare Hub"
                width="220"
                style="
                    display:block;
                    width:220px;
                    max-width:100%;
                    height:auto;
                    margin:0 auto;
                "
            >

            </td>

            </tr>


            <!-- ===================================================== -->
            <!-- HEADER -->
            <!-- ===================================================== -->

            <tr>

            <td
                style="
                    padding:34px 40px;
                    background:#0f766e;
                    text-align:center;
                "
            >

            <h1
                style="
                    margin:0;
                    color:#ffffff;
                    font-size:25px;
                    line-height:1.3;
                    font-weight:700;
                "
            >

                New Professional Application

            </h1>

            <p
                style="
                    margin:10px 0 0;
                    color:#dff7f4;
                    font-size:15px;
                    line-height:1.6;
                "
            >

                A new healthcare professional has submitted
                an application for verification.

            </p>

            </td>

            </tr>


            <!-- ===================================================== -->
            <!-- CONTENT -->
            <!-- ===================================================== -->

            <tr>

            <td
                style="
                    padding:35px 40px;
                "
            >

            <p
                style="
                    margin:0 0 20px;
                    color:#374151;
                    font-size:16px;
                    line-height:1.6;
                "
            >

                Hello,

            </p>

            <p
                style="
                    margin:0 0 25px;
                    color:#4b5563;
                    font-size:15px;
                    line-height:1.7;
                "
            >

                A new healthcare professional has completed an
                application through Karema Kare Hub and is now
                awaiting review.

            </p>


            <!-- ===================================================== -->
            <!-- STATUS -->
            <!-- ===================================================== -->

            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                    margin-bottom:25px;
                    background:#fff7ed;
                    border:1px solid #fed7aa;
                    border-radius:10px;
                "
            >

            <tr>

            <td
                style="
                    padding:15px 18px;
                    text-align:center;
                "
            >

            <span
                style="
                    color:#c2410c;
                    font-size:13px;
                    font-weight:700;
                    letter-spacing:0.5px;
                "
            >

                APPLICATION REQUIRES VERIFICATION

            </span>

            </td>

            </tr>

            </table>


            <!-- ===================================================== -->
            <!-- APPLICANT DETAILS -->
            <!-- ===================================================== -->

            <h2
                style="
                    margin:0 0 15px;
                    color:#111827;
                    font-size:18px;
                "
            >

                Applicant Details

            </h2>


            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                    background:#f8fafc;
                    border-radius:10px;
                    overflow:hidden;
                "
            >

            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                    width:40%;
                "
            >

                Name

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                    font-weight:600;
                "
            >

                ${name}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Profession

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                    font-weight:600;
                "
            >

                ${profession}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Email

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                "
            >

                ${email}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Phone

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                "
            >

                ${phone}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Location

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                "
            >

                ${city}, ${parish}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Experience

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                "
            >

                ${experience}

            </td>

            </tr>


            <tr>

            <td
                style="
                    padding:13px 18px;
                    color:#6b7280;
                    font-size:14px;
                "
            >

                Specialization

            </td>

            <td
                style="
                    padding:13px 18px;
                    color:#111827;
                    font-size:14px;
                    line-height:1.5;
                "
            >

                ${specializationText}

            </td>

            </tr>

            </table>


            <!-- ===================================================== -->
            <!-- ACTION -->
            <!-- ===================================================== -->

            <div
                style="
                    text-align:center;
                    margin-top:32px;
                "
            >

            <a
                href="${reviewUrl}"
                style="
                    display:inline-block;
                    background:#0f766e;
                    color:#ffffff;
                    text-decoration:none;
                    padding:15px 30px;
                    border-radius:8px;
                    font-size:15px;
                    font-weight:700;
                "
            >

                Review Application

            </a>

            </div>


            <p
                style="
                    margin:28px 0 0;
                    color:#6b7280;
                    font-size:13px;
                    line-height:1.6;
                    text-align:center;
                "
            >

                Please review the applicant's information and
                supporting documentation before approving or
                rejecting the application.

            </p>

            </td>

            </tr>


            <!-- ===================================================== -->
            <!-- FOOTER -->
            <!-- ===================================================== -->

            <tr>

            <td
                align="center"
                style="
                    padding:25px 30px;
                    background:#f8fafc;
                    border-top:1px solid #e5e7eb;
                "
            >

            <p
                style="
                    margin:0;
                    color:#374151;
                    font-size:13px;
                    font-weight:600;
                "
            >

                Karema Kare Hub

            </p>

            <p
                style="
                    margin:6px 0 0;
                    color:#9ca3af;
                    font-size:12px;
                    line-height:1.5;
                "
            >

                Connecting clients with trusted
                healthcare professionals.

            </p>

            <p
                style="
                    margin:12px 0 0;
                    color:#9ca3af;
                    font-size:11px;
                "
            >

                This is an automated notification.
                Please do not reply to this email.

            </p>

            </td>

            </tr>

            </table>

            </td>

            </tr>

            </table>

            </body>

            </html>
            `;

            // ====================================================
            // SEND EMAIL
            // ====================================================

            await transporter.sendMail({

                from:
                    `"Karema Kare Hub" <${process.env.GMAIL_USER}>`,

                to:
                    process.env.VERIFICATION_EMAIL,

                cc: process.env.SECONDARY_VERIFICATION_EMAIL,

                subject:
                    "🩺 New Healthcare Professional Application — Action Required",

                html:
                    emailHtml,
            });

            console.log(
                `Notification email successfully sent for ${name}`
            );

        } catch (error) {

            console.error(
                "Failed to send healthcare worker notification:",
                error
            );

            throw error;
        }
    }
);