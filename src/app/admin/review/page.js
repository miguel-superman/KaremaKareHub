"use client";

import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Star,
    User,
    BriefcaseMedical,
    Clock,
    Loader2,
    ShieldCheck,
    AlertCircle
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/firebase";
import Navbar from "@/app/components/Navbar";


export default function ReviewPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const reviewId = searchParams.get("id");

    const [review, setReview] = useState(null);
    const [worker, setWorker] = useState(null);

    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const [error, setError] = useState("");


    /*
    =====================================================
    LOAD REVIEW
    =====================================================
    */

    useEffect(() => {

        if (!reviewId) {

            setError("No review was specified.");
            setLoading(false);

            return;

        }


        const loadReview = async () => {

            try {

                setLoading(true);
                setError("");


                /*
                ---------------------------------------------
                GET REVIEW
                ---------------------------------------------
                */

                const reviewRef = doc(
                    db,
                    "reviews",
                    reviewId
                );

                const reviewSnap = await getDoc(
                    reviewRef
                );


                if (!reviewSnap.exists()) {

                    setError(
                        "This review could not be found."
                    );

                    setReview(null);

                    return;

                }


                const reviewData = {
                    id: reviewSnap.id,
                    ...reviewSnap.data()
                };


                setReview(reviewData);


                /*
                ---------------------------------------------
                GET HEALTHCARE WORKER
                ---------------------------------------------
                */

                if (reviewData.workerId) {

                    try {

                        const workerRef = doc(
                            db,
                            "healthcareWorkers",
                            reviewData.workerId
                        );

                        const workerSnap = await getDoc(
                            workerRef
                        );


                        if (workerSnap.exists()) {

                            setWorker({
                                id: workerSnap.id,
                                ...workerSnap.data()
                            });

                        }

                    } catch (workerError) {

                        console.error(
                            "Error loading healthcare worker:",
                            workerError
                        );

                    }

                }

            } catch (error) {

                console.error(
                    "Error loading review:",
                    error
                );

                setError(
                    "Unable to load this review."
                );

            } finally {

                setLoading(false);

            }

        };


        loadReview();

    }, [reviewId]);


    /*
    =====================================================
    APPROVE REVIEW
    =====================================================
    */

    const approveReview = async () => {

        if (!reviewId || !review) {
            return;
        }


        const confirmed = window.confirm(
            "Are you sure you want to approve this review?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setProcessing(true);
            setError("");


            const reviewRef = doc(
                db,
                "reviews",
                reviewId
            );


            await updateDoc(
                reviewRef,
                {
                    status: "Approved",
                    reviewedAt: serverTimestamp(),
                    reviewedBy: "admin"
                }
            );


            setReview((previous) => ({
                ...previous,
                status: "Approved"
            }));


        } catch (error) {

            console.error(
                "Error approving review:",
                error
            );

            setError(
                "Unable to approve this review. Please try again."
            );

        } finally {

            setProcessing(false);

        }

    };


    /*
    =====================================================
    REJECT REVIEW
    =====================================================
    */

    const rejectReview = async () => {

        if (!reviewId || !review) {
            return;
        }


        const confirmed = window.confirm(
            "Are you sure you want to reject this review?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setProcessing(true);
            setError("");


            const reviewRef = doc(
                db,
                "reviews",
                reviewId
            );


            await updateDoc(
                reviewRef,
                {
                    status: "Rejected",
                    reviewedAt: serverTimestamp(),
                    reviewedBy: "admin"
                }
            );


            setReview((previous) => ({
                ...previous,
                status: "Rejected"
            }));


        } catch (error) {

            console.error(
                "Error rejecting review:",
                error
            );

            setError(
                "Unable to reject this review. Please try again."
            );

        } finally {

            setProcessing(false);

        }

    };


    /*
    =====================================================
    DATE FORMATTER
    =====================================================
    */

    const formatDate = (value) => {

        if (!value) {
            return "Date unavailable";
        }


        try {

            if (
                typeof value === "object" &&
                typeof value.toDate === "function"
            ) {

                return value
                    .toDate()
                    .toLocaleString();

            }


            if (typeof value === "number") {

                return new Date(
                    value
                ).toLocaleString();

            }


            if (typeof value === "string") {

                return new Date(
                    value
                ).toLocaleString();

            }

        } catch (error) {

            console.error(
                "Error formatting date:",
                error
            );

        }


        return "Date unavailable";

    };


    /*
    =====================================================
    RATING
    =====================================================
    */

    const rating = Number(
        review?.rating || 0
    );


    /*
    =====================================================
    LOADING
    =====================================================
    */

    if (loading) {

        return (

            <main
                className="
                    min-h-screen
                    bg-gradient-to-b
                    from-emerald-50/50
                    via-white
                    to-white
                "
            >

                <Navbar />

                <div
                    className="
                        min-h-[70vh]
                        flex
                        items-center
                        justify-center
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            text-gray-500
                        "
                    >

                        <Loader2
                            size={24}
                            className="animate-spin"
                        />

                        Loading review...

                    </div>

                </div>

            </main>

        );

    }


    /*
    =====================================================
    ERROR
    =====================================================
    */

    if (error && !review) {

        return (

            <main
                className="
                    min-h-screen
                    bg-gradient-to-b
                    from-emerald-50/50
                    via-white
                    to-white
                "
            >

                <Navbar />


                <div
                    className="
                        max-w-4xl
                        mx-auto
                        px-6
                        py-10
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin"
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-gray-600
                            hover:text-gray-900
                            font-medium
                        "
                    >

                        <ArrowLeft size={18} />

                        Back to Reviews

                    </button>


                    <div
                        className="
                            mt-8
                            bg-white
                            border
                            rounded-3xl
                            shadow-sm
                            p-10
                            text-center
                        "
                    >

                        <AlertCircle
                            size={48}
                            className="
                                mx-auto
                                text-red-500
                            "
                        />


                        <h1
                            className="
                                text-2xl
                                font-bold
                                text-slate-900
                                mt-5
                            "
                        >

                            Review Not Found

                        </h1>


                        <p
                            className="
                                text-gray-500
                                mt-2
                            "
                        >

                            {error}

                        </p>

                    </div>

                </div>

            </main>

        );

    }


    return (

        <main
            className="
                min-h-screen
                bg-gradient-to-b
                from-emerald-50/50
                via-white
                to-white
            "
        >

            <Navbar />


            <div
                className="
                    max-w-5xl
                    mx-auto
                    px-6
                    py-10
                "
            >

                {/* =====================================================
                    BACK
                ===================================================== */}

                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            "/admin/reviews"
                        )
                    }
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-gray-600
                        hover:text-gray-900
                        font-medium
                        transition
                    "
                >

                    <ArrowLeft size={18} />

                    Back to Reviews

                </button>


                {/* =====================================================
                    ERROR
                ===================================================== */}

                {error && (

                    <div
                        className="
                            mt-6
                            bg-red-50
                            border
                            border-red-200
                            rounded-2xl
                            p-4
                            flex
                            items-center
                            gap-3
                            text-red-700
                        "
                    >

                        <AlertCircle size={20} />

                        {error}

                    </div>

                )}


                {/* =====================================================
                    REVIEW HEADER
                ===================================================== */}

                <div
                    className="
                        mt-6
                        bg-white
                        border
                        rounded-3xl
                        shadow-sm
                        p-8
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-start
                            md:justify-between
                            gap-6
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-amber-100
                                        text-amber-600
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Star
                                        size={28}
                                        fill="currentColor"
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                        "
                                    >

                                        Review Approval

                                    </p>


                                    <h1
                                        className="
                                            text-3xl
                                            font-bold
                                            text-slate-900
                                        "
                                    >

                                        Review Details

                                    </h1>

                                </div>

                            </div>

                        </div>


                        {/* Status */}

                        <ReviewStatus
                            status={review?.status}
                        />

                    </div>


                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div
                        className="
                            mt-8
                            p-6
                            rounded-2xl
                            bg-slate-50
                            border
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-500
                            "
                        >

                            Rating

                        </p>


                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                mt-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1
                                "
                            >

                                {Array.from({
                                    length: 5
                                }).map(
                                    (_, index) => (

                                        <Star
                                            key={index}
                                            size={28}
                                            className={
                                                index < rating
                                                    ? "text-amber-500"
                                                    : "text-slate-300"
                                            }
                                            fill={
                                                index < rating
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />

                                    )
                                )}

                            </div>


                            <span
                                className="
                                    text-2xl
                                    font-bold
                                    text-slate-900
                                    ml-2
                                "
                            >

                                {rating}/5

                            </span>

                        </div>

                    </div>


                    {/* =================================================
                        REVIEW COMMENT
                    ================================================= */}

                    <div className="mt-8">

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <ShieldCheck
                                size={19}
                                className="text-emerald-600"
                            />

                            <h2
                                className="
                                    text-lg
                                    font-bold
                                    text-slate-900
                                "
                            >

                                Client Feedback

                            </h2>

                        </div>


                        <div
                            className="
                                mt-4
                                bg-slate-50
                                border
                                rounded-2xl
                                p-6
                            "
                        >

                            {review?.comment ? (

                                <p
                                    className="
                                        text-gray-700
                                        leading-relaxed
                                        whitespace-pre-wrap
                                    "
                                >

                                    {review.comment}

                                </p>

                            ) : (

                                <p
                                    className="
                                        text-gray-400
                                        italic
                                    "
                                >

                                    No written comment was provided.

                                </p>

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        REVIEW INFORMATION
                    ================================================= */}

                    <div
                        className="
                            mt-8
                            grid
                            md:grid-cols-2
                            gap-5
                        "
                    >

                        {/* Client */}

                        <InfoCard
                            icon={User}
                            title="Submitted By"
                            value={
                                review?.clientName ||
                                "Client"
                            }
                        />


                        {/* Worker */}

                        <InfoCard
                            icon={BriefcaseMedical}
                            title="Healthcare Professional"
                            value={
                                review?.workerName ?review?.workerName:
                                      "Healthcare Professional"
                            }
                            secondary={
                                worker?.profession ||
                                review?.profession ||
                                ""
                            }
                        />


                        {/* Date */}

                        <InfoCard
                            icon={Clock}
                            title="Submitted"
                            value={formatDate(
                                review?.createdAt
                            )}
                        />


                        {/* Review ID */}

                        <InfoCard
                            icon={ShieldCheck}
                            title="Review ID"
                            value={review?.id}
                        />

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    {review?.status === "Pending" && (

                        <div
                            className="
                                mt-10
                                pt-8
                                border-t
                                flex
                                flex-col
                                sm:flex-row
                                justify-end
                                gap-4
                            "
                        >

                            <button
                                type="button"
                                onClick={rejectReview}
                                disabled={processing}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-6
                                    py-3
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    hover:bg-red-100
                                    text-red-700
                                    font-semibold
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {processing ? (

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                ) : (

                                    <XCircle size={18} />

                                )}

                                Reject Review

                            </button>


                            <button
                                type="button"
                                onClick={approveReview}
                                disabled={processing}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-7
                                    py-3
                                    rounded-xl
                                    bg-emerald-600
                                    hover:bg-emerald-700
                                    text-white
                                    font-semibold
                                    shadow-sm
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {processing ? (

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                ) : (

                                    <CheckCircle size={18} />

                                )}

                                Approve Review

                            </button>

                        </div>

                    )}
                    {review?.status === "Approved" && (

                        <div
                            className="
                                mt-10
                                pt-8
                                border-t
                                flex
                                flex-col
                                sm:flex-row
                                justify-end
                                gap-4
                            "
                        >

                            <button
                                type="button"
                                onClick={rejectReview}
                                disabled={processing}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-6
                                    py-3
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    hover:bg-red-100
                                    text-red-700
                                    font-semibold
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                "
                            >

                                {processing ? (

                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                ) : (

                                    <XCircle size={18} />

                                )}

                                Reject Review

                            </button>


                            

                        </div>

                    )}


                    {/* =================================================
                        ALREADY PROCESSED
                    ================================================= */}

                    {review?.status !== "Pending" && (

                        <div
                            className="
                                mt-10
                                pt-8
                                border-t
                            "
                        >

                            <div
                                className="
                                    rounded-2xl
                                    bg-slate-50
                                    border
                                    p-5
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                {review?.status === "Approved" ? (

                                    <CheckCircle
                                        className="text-emerald-600"
                                        size={22}
                                    />

                                ) : (

                                    <XCircle
                                        className="text-red-600"
                                        size={22}
                                    />

                                )}


                                <div>

                                    <p
                                        className="
                                            font-semibold
                                            text-slate-900
                                        "
                                    >

                                        This review has already been{" "}
                                        {review?.status}.

                                    </p>


                                    {review?.reviewedAt && (

                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            "
                                        >

                                            Processed{" "}
                                            {formatDate(
                                                review.reviewedAt
                                            )}

                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </main>

    );

}


/* =========================================================
   REVIEW STATUS
========================================================= */

function ReviewStatus({
    status
}) {

    if (status === "Approved") {

        return (

            <div
                className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-emerald-100
                    text-emerald-700
                    font-semibold
                    text-sm
                "
            >

                <CheckCircle size={17} />

                Approved

            </div>

        );

    }


    if (status === "Rejected") {

        return (

            <div
                className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-red-100
                    text-red-700
                    font-semibold
                    text-sm
                "
            >

                <XCircle size={17} />

                Rejected

            </div>

        );

    }


    return (

        <div
            className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-amber-100
                text-amber-700
                font-semibold
                text-sm
            "
        >

            <Clock size={17} />

            Pending Approval

        </div>

    );

}


/* =========================================================
   INFORMATION CARD
========================================================= */

function InfoCard({
    icon: Icon,
    title,
    value,
    secondary
}) {

    return (

        <div
            className="
                bg-white
                border
                rounded-2xl
                p-5
            "
        >

            <div
                className="
                    flex
                    items-start
                    gap-4
                "
            >

                <div
                    className="
                        w-10
                        h-10
                        rounded-xl
                        bg-slate-100
                        text-slate-600
                        flex
                        items-center
                        justify-center
                        shrink-0
                    "
                >

                    <Icon size={19} />

                </div>


                <div className="min-w-0">

                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-gray-400
                            font-semibold
                        "
                    >

                        {title}

                    </p>


                    <p
                        className="
                            mt-1
                            font-semibold
                            text-slate-900
                            break-words
                        "
                    >

                        {value}

                    </p>


                    {secondary && (

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >

                            {secondary}

                        </p>

                    )}

                </div>

            </div>

        </div>

    );

}