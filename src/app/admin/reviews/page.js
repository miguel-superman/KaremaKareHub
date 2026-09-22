"use client";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    XCircle,
    Star,
    Search,
    Clock,
    Loader2,
    RefreshCw,
    MessageSquare,
    User,
    BriefcaseMedical
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
    collection,
    getDocs,
    query,
    orderBy,
    updateDoc,
    doc,
    serverTimestamp
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/firebase";
import Navbar from "@/app/components/Navbar";


export default function AdminReviewsPage() {

    const router = useRouter();

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [error, setError] = useState("");


    /*
    =====================================================
    LOAD REVIEWS
    =====================================================
    */

    const loadReviews = async () => {

        try {

            setLoading(true);
            setError("");


            const reviewsRef = collection(
                db,
                "reviews"
            );


            const reviewsQuery = query(
                reviewsRef,
                orderBy("createdAt", "desc")
            );


            const snapshot = await getDocs(
                reviewsQuery
            );


            const reviewData = snapshot.docs.map(
                (reviewDoc) => ({
                    id: reviewDoc.id,
                    ...reviewDoc.data()
                })
            );


            setReviews(reviewData);

        } catch (error) {

            console.error(
                "Error loading reviews:",
                error
            );

            setError(
                "Unable to load reviews. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadReviews();

    }, []);


    /*
    =====================================================
    FILTER REVIEWS
    =====================================================
    */

    const filteredReviews = useMemo(() => {

        let result = [...reviews];


        /*
        ---------------------------------------------
        STATUS
        ---------------------------------------------
        */

        if (statusFilter !== "all") {

            result = result.filter(
                (review) =>
                    (
                        review.status ||
                        "Pending"
                    ).toLowerCase() ===
                    statusFilter
            );

        }


        /*
        ---------------------------------------------
        SEARCH
        ---------------------------------------------
        */

        const searchValue =
            search.trim().toLowerCase();


        if (searchValue) {

            result = result.filter(
                (review) => {

                    const clientName =
                        review.clientName ||
                        "";

                    const workerName =
                        review.workerName ||
                        "";

                    const comment =
                        review.comment ||
                        "";

                    const workerProfession =
                        review.profession ||
                        "";


                    return (
                        clientName
                            .toLowerCase()
                            .includes(searchValue) ||

                        workerName
                            .toLowerCase()
                            .includes(searchValue) ||

                        comment
                            .toLowerCase()
                            .includes(searchValue) ||

                        workerProfession
                            .toLowerCase()
                            .includes(searchValue)
                    );

                }
            );

        }


        return result;

    }, [
        reviews,
        statusFilter,
        search
    ]);


    /*
    =====================================================
    COUNTS
    =====================================================
    */

    const pendingCount =
        reviews.filter(
            // (review) =>
            //     (
            //         review.status ||
            //         "Pending"
            //     ).toLowerCase() ===
            //     "Pending"

                  (review) =>
                review.status === "Pending"
        ).length;


    const approvedCount =
        reviews.filter(
            (review) =>
                review.status === "Approved"
        ).length;


    const rejectedCount =
        reviews.filter(
            (review) =>
                review.status === "Rejected"
        ).length;


    /*
    =====================================================
    APPROVE REVIEW
    =====================================================
    */

    const approveReview = async (
        reviewId
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to approve this review?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(reviewId);
            setError("");


            const reviewRef = doc(
                db,
                "reviews",
                reviewId
            );


            await updateDoc(
                reviewRef,
                {
                    status: "approved",
                    reviewedAt: serverTimestamp(),
                    reviewedBy: "admin"
                }
            );


            setReviews((previous) =>
                previous.map(
                    (review) =>
                        review.id === reviewId
                            ? {
                                ...review,
                                status: "approved"
                            }
                            : review
                )
            );

        } catch (error) {

            console.error(
                "Error approving review:",
                error
            );

            setError(
                "Unable to approve the review."
            );

        } finally {

            setProcessingId(null);

        }

    };


    /*
    =====================================================
    REJECT REVIEW
    =====================================================
    */

    const rejectReview = async (
        reviewId
    ) => {

        const confirmed = window.confirm(
            "Are you sure you want to reject this review?"
        );


        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(reviewId);
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


            setReviews((previous) =>
                previous.map(
                    (review) =>
                        review.id === reviewId
                            ? {
                                ...review,
                                status: "Rejected"
                            }
                            : review
                )
            );

        } catch (error) {

            console.error(
                "Error rejecting review:",
                error
            );

            setError(
                "Unable to reject the review."
            );

        } finally {

            setProcessingId(null);

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
                    .toLocaleDateString(
                        undefined,
                        {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        }
                    );

            }


            if (typeof value === "number") {

                return new Date(
                    value
                ).toLocaleDateString(
                    undefined,
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    }
                );

            }


            if (typeof value === "string") {

                return new Date(
                    value
                ).toLocaleDateString(
                    undefined,
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    }
                );

            }

        } catch (error) {

            console.error(
                "Date formatting error:",
                error
            );

        }


        return "Date unavailable";

    };


    /*
    =====================================================
    OPEN REVIEW
    =====================================================
    */

    const openReview = (
        reviewId
    ) => {

        router.push(
            `/admin/review?id=${reviewId}`
        );

    };


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
                    max-w-6xl
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
                        transition
                    "
                >

                    <ArrowLeft size={18} />

                    Admin Dashboard

                </button>


                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div
                    className="
                        mt-6
                        bg-white
                        rounded-3xl
                        border
                        shadow-sm
                        p-8
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
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

                                        Administration

                                    </p>


                                    <h1
                                        className="
                                            text-3xl
                                            font-bold
                                            text-slate-900
                                        "
                                    >

                                        Reviews

                                    </h1>

                                </div>

                            </div>


                            <p
                                className="
                                    text-gray-600
                                    mt-4
                                "
                            >

                                Review client feedback and manage
                                publication approval.

                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={loadReviews}
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                border
                                bg-white
                                hover:bg-slate-50
                                text-slate-700
                                font-semibold
                                transition
                                disabled:opacity-50
                            "
                        >

                            <RefreshCw
                                size={18}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh

                        </button>

                    </div>


                    {/* =================================================
                        STATISTICS
                    ================================================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-3
                            gap-4
                            mt-8
                        "
                    >

                        <ReviewStat
                            title="Pending"
                            value={pendingCount}
                            icon={Clock}
                            className="
                                bg-amber-50
                                border-amber-100
                                text-amber-600
                            "
                        />


                        <ReviewStat
                            title="Approved"
                            value={approvedCount}
                            icon={CheckCircle}
                            className="
                                bg-emerald-50
                                border-emerald-100
                                text-emerald-600
                            "
                        />


                        <ReviewStat
                            title="Rejected"
                            value={rejectedCount}
                            icon={XCircle}
                            className="
                                bg-red-50
                                border-red-100
                                text-red-600
                            "
                        />

                    </div>

                </div>


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
                            text-red-700
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <XCircle size={20} />

                        {error}

                    </div>

                )}


                {/* =====================================================
                    FILTERS
                ===================================================== */}

                <div
                    className="
                        mt-6
                        bg-white
                        border
                        rounded-3xl
                        shadow-sm
                        p-5
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            lg:flex-row
                            gap-4
                        "
                    >

                        {/* Search */}

                        <div
                            className="
                                relative
                                flex-1
                            "
                        >

                            <Search
                                size={19}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />


                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="
                                    Search reviews, clients or professionals...
                                "
                                className="
                                    w-full
                                    pl-11
                                    pr-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-emerald-500
                                    focus:border-transparent
                                "
                            />

                        </div>


                        {/* Status */}

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-2
                            "
                        >

                            <FilterButton
                                label="All"
                                value="all"
                                active={
                                    statusFilter === "all"
                                }
                                onClick={
                                    setStatusFilter
                                }
                            />


                            <FilterButton
                                label={`Pending (${pendingCount})`}
                                value="pending"
                                active={
                                    statusFilter === "pending"
                                }
                                onClick={
                                    setStatusFilter
                                }
                            />


                            <FilterButton
                                label={`Approved (${approvedCount})`}
                                value="approved"
                                active={
                                    statusFilter === "approved"
                                }
                                onClick={
                                    setStatusFilter
                                }
                            />


                            <FilterButton
                                label={`Rejected (${rejectedCount})`}
                                value="rejected"
                                active={
                                    statusFilter === "rejected"
                                }
                                onClick={
                                    setStatusFilter
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================================
                    REVIEW LIST
                ===================================================== */}

                <div
                    className="
                        mt-6
                        bg-white
                        border
                        rounded-3xl
                        shadow-sm
                        overflow-hidden
                    "
                >

                    {loading ? (

                        <div
                            className="
                                p-14
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-gray-500
                            "
                        >

                            <Loader2
                                size={30}
                                className="
                                    animate-spin
                                    text-emerald-600
                                "
                            />


                            <p className="mt-4">

                                Loading reviews...

                            </p>

                        </div>

                    ) : filteredReviews.length === 0 ? (

                        <div
                            className="
                                p-14
                                text-center
                            "
                        >

                            <div
                                className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-full
                                    bg-slate-100
                                    text-slate-400
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <MessageSquare
                                    size={28}
                                />

                            </div>


                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-slate-900
                                    mt-5
                                "
                            >

                                No Reviews Found

                            </h2>


                            <p
                                className="
                                    text-gray-500
                                    mt-2
                                "
                            >

                                There are no reviews matching
                                your current filters.

                            </p>

                        </div>

                    ) : (

                        <div className="divide-y">

                            {filteredReviews.map(
                                (review) => {

                                    const status =
                                        (
                                            review.status ||
                                            "pending"
                                        ).toLowerCase();

                                    const rating =
                                        Number(
                                            review.rating || 0
                                        );

                                    const processing =
                                        processingId ===
                                        review.id;


                                    return (

                                        <div
                                            key={review.id}
                                            className="
                                                p-6
                                                hover:bg-slate-50
                                                transition
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    xl:flex-row
                                                    xl:items-start
                                                    gap-6
                                                "
                                            >

                                                {/* =================================
                                                    REVIEW
                                                ================================= */}

                                                <div
                                                    className="
                                                        flex-1
                                                        min-w-0
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            flex-wrap
                                                            items-start
                                                            justify-between
                                                            gap-4
                                                        "
                                                    >

                                                        <div>

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    flex-wrap
                                                                "
                                                            >

                                                                <h2
                                                                    className="
                                                                        font-bold
                                                                        text-lg
                                                                        text-slate-900
                                                                    "
                                                                >

                                                                    {review.clientName ||
                                                                        "Client"}

                                                                </h2>


                                                                <StatusBadge
                                                                    status={
                                                                        status
                                                                    }
                                                                />

                                                            </div>


                                                            {/* Rating */}

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-1
                                                                    mt-2
                                                                "
                                                            >

                                                                {Array.from({
                                                                    length: 5
                                                                }).map(
                                                                    (_, index) => (

                                                                        <Star
                                                                            key={
                                                                                index
                                                                            }
                                                                            size={
                                                                                17
                                                                            }
                                                                            className={
                                                                                index <
                                                                                rating
                                                                                    ? "text-amber-500"
                                                                                    : "text-slate-300"
                                                                            }
                                                                            fill={
                                                                                index <
                                                                                rating
                                                                                    ? "currentColor"
                                                                                    : "none"
                                                                            }
                                                                        />

                                                                    )
                                                                )}


                                                                <span
                                                                    className="
                                                                        ml-2
                                                                        text-sm
                                                                        font-semibold
                                                                        text-slate-600
                                                                    "
                                                                >

                                                                    {rating}/5

                                                                </span>

                                                            </div>

                                                        </div>


                                                        <div
                                                            className="
                                                                text-sm
                                                                text-gray-400
                                                            "
                                                        >

                                                            {formatDate(
                                                                review.createdAt
                                                            )}

                                                        </div>

                                                    </div>


                                                    {/* Professional */}

                                                    <div
                                                        className="
                                                            flex
                                                            flex-wrap
                                                            items-center
                                                            gap-5
                                                            mt-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-sm
                                                                text-gray-600
                                                            "
                                                        >

                                                            <User
                                                                size={16}
                                                                className="
                                                                    text-gray-400
                                                                "
                                                            />

                                                            <span>

                                                                Client:

                                                            </span>

                                                            <strong
                                                                className="
                                                                    text-slate-800
                                                                "
                                                            >

                                                                {review.clientName ||
                                                                    "Unknown"}

                                                            </strong>

                                                        </div>


                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                text-sm
                                                                text-gray-600
                                                            "
                                                        >

                                                            <BriefcaseMedical
                                                                size={16}
                                                                className="
                                                                    text-gray-400
                                                                "
                                                            />

                                                            <span>

                                                                Professional:

                                                            </span>

                                                            <strong
                                                                className="
                                                                    text-slate-800
                                                                "
                                                            >

                                                                {review.workerName ||
                                                                    "Healthcare Professional"}

                                                            </strong>

                                                        </div>

                                                    </div>


                                                    {/* Comment */}

                                                    <div
                                                        className="
                                                            mt-4
                                                            bg-slate-50
                                                            border
                                                            rounded-2xl
                                                            p-4
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                text-sm
                                                                text-gray-700
                                                                leading-relaxed
                                                                line-clamp-3
                                                            "
                                                        >

                                                            {review.comment ||
                                                                "No written comment was provided."}

                                                        </p>

                                                    </div>

                                                </div>


                                                {/* =================================
                                                    ACTIONS
                                                ================================= */}

                                                <div
                                                    className="
                                                        flex
                                                        flex-col
                                                        sm:flex-row
                                                        xl:flex-col
                                                        gap-2
                                                        shrink-0
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openReview(
                                                                review.id
                                                            )
                                                        }
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            px-4
                                                            py-2.5
                                                            rounded-xl
                                                            border
                                                            bg-white
                                                            hover:bg-slate-50
                                                            text-slate-700
                                                            font-semibold
                                                            text-sm
                                                            transition
                                                        "
                                                    >

                                                        View Review

                                                        <ArrowRight
                                                            size={16}
                                                        />

                                                    </button>


                                                    {status ===
                                                        "pending" && (

                                                            <>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        rejectReview(
                                                                            review.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                    className="
                                                                        inline-flex
                                                                        items-center
                                                                        justify-center
                                                                        gap-2
                                                                        px-4
                                                                        py-2.5
                                                                        rounded-xl
                                                                        bg-red-50
                                                                        hover:bg-red-100
                                                                        text-red-700
                                                                        font-semibold
                                                                        text-sm
                                                                        transition
                                                                        disabled:opacity-50
                                                                    "
                                                                >

                                                                    {processing ? (

                                                                        <Loader2
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="
                                                                                animate-spin
                                                                            "
                                                                        />

                                                                    ) : (

                                                                        <XCircle
                                                                            size={
                                                                                16
                                                                            }
                                                                        />

                                                                    )}

                                                                    Reject

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        approveReview(
                                                                            review.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                    className="
                                                                        inline-flex
                                                                        items-center
                                                                        justify-center
                                                                        gap-2
                                                                        px-4
                                                                        py-2.5
                                                                        rounded-xl
                                                                        bg-emerald-600
                                                                        hover:bg-emerald-700
                                                                        text-white
                                                                        font-semibold
                                                                        text-sm
                                                                        transition
                                                                        disabled:opacity-50
                                                                    "
                                                                >

                                                                    {processing ? (

                                                                        <Loader2
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="
                                                                                animate-spin
                                                                            "
                                                                        />

                                                                    ) : (

                                                                        <CheckCircle
                                                                            size={
                                                                                16
                                                                            }
                                                                        />

                                                                    )}

                                                                    Approve

                                                                </button>

                                                            </>

                                                        )}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>


                {/* =====================================================
                    RESULTS COUNT
                ===================================================== */}

                {!loading &&
                    filteredReviews.length > 0 && (

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-4
                                text-center
                            "
                        >

                            Showing{" "}
                            <strong>
                                {filteredReviews.length}
                            </strong>{" "}
                            of{" "}
                            <strong>
                                {reviews.length}
                            </strong>{" "}
                            reviews

                        </p>

                    )}

            </div>

        </main>

    );

}


/* =========================================================
   REVIEW STAT
========================================================= */

function ReviewStat({
    title,
    value,
    icon: Icon,
    className
}) {

    return (

        <div
            className={`
                border
                rounded-2xl
                p-5
                ${className}
            `}
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-sm
                            font-medium
                            opacity-80
                        "
                    >

                        {title}

                    </p>


                    <p
                        className="
                            text-3xl
                            font-bold
                            mt-1
                        "
                    >

                        {value}

                    </p>

                </div>


                <Icon size={25} />

            </div>

        </div>

    );

}


/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
    label,
    value,
    active,
    onClick
}) {

    return (

        <button
            type="button"
            onClick={() => onClick(value)}
            className={`
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                    active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
            `}
        >

            {label}

        </button>

    );

}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
    status
}) {

    if (status === "approved") {

        return (

            <span
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-full
                    bg-emerald-100
                    text-emerald-700
                    text-xs
                    font-bold
                "
            >

                <CheckCircle size={13} />

                Approved

            </span>

        );

    }


    if (status === "rejected") {

        return (

            <span
                className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1
                    rounded-full
                    bg-red-100
                    text-red-700
                    text-xs
                    font-bold
                "
            >

                <XCircle size={13} />

                Rejected

            </span>

        );

    }


    return (

        <span
            className="
                inline-flex
                items-center
                gap-1.5
                px-2.5
                py-1
                rounded-full
                bg-amber-100
                text-amber-700
                text-xs
                font-bold
            "
        >

            <Clock size={13} />

            Pending

        </span>

    );

}


/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(value) {

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
                .toLocaleDateString(
                    undefined,
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    }
                );

        }


        if (typeof value === "number") {

            return new Date(
                value
            ).toLocaleDateString(
                undefined,
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );

        }


        if (typeof value === "string") {

            return new Date(
                value
            ).toLocaleDateString(
                undefined,
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );

        }

    } catch (error) {

        console.error(
            "Error formatting review date:",
            error
        );

    }


    return "Date unavailable";

}