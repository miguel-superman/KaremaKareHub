"use client";

import {
    ShieldCheck,
    CreditCard,
    ArrowRight,
    Users,
    Activity,
    Star,
    Clock,
    Loader2,
    MessageSquare
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit
} from "firebase/firestore";

import { db } from "@/app/lib/firebase/firebase";
import Navbar from "@/app/components/Navbar";


export default function AdminDashboard() {

    const router = useRouter();

    const [pendingReviews, setPendingReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);


    /*
    =====================================================
    LOAD PENDING REVIEWS
    =====================================================
    */

    useEffect(() => {

        const loadPendingReviews = async () => {

            try {

                setReviewsLoading(true);

                const reviewsRef = collection(
                    db,
                    "reviews"
                );

                const reviewsQuery = query(
                    reviewsRef,
                    where("status", "==", "Pending"),
                    orderBy("createdAt", "desc"),
                    limit(10)
                );

                const snapshot = await getDocs(
                    reviewsQuery
                );

                const reviews = snapshot.docs.map(
                    (reviewDoc) => ({
                        id: reviewDoc.id,
                        ...reviewDoc.data()
                    })
                );

                setPendingReviews(reviews);

                console.log(
                    "Loaded pending reviews:",
                    reviews
                );

            } catch (error) {

                console.error(
                    "Error loading pending reviews:",
                    error
                );

                setPendingReviews([]);

            } finally {

                setReviewsLoading(false);

            }

        };


        loadPendingReviews();

    }, []);

    


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
                    HEADER
                ===================================================== */}

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        shadow-sm
                        p-8
                    "
                >

                    <div>

                        <p className="text-gray-500">

                            Administration

                        </p>


                        <h1
                            className="
                                text-3xl
                                font-bold
                                mt-1
                                text-slate-900
                            "
                        >

                            Healthcare Worker Management

                        </h1>


                        <p
                            className="
                                text-gray-600
                                mt-3
                            "
                        >

                            Manage applications, approvals and
                            subscription renewals.

                        </p>

                    </div>


                    {/* =================================================
                        DASHBOARD CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-6
                            mt-10
                        "
                    >

                        {/* Worker Verification */}

                        <AdminCard
                            title="Worker Verification"
                            description="
                                Review healthcare professionals waiting
                                for approval, validate documents and
                                activate accounts.
                            "
                            icon={ShieldCheck}
                            color="
                                bg-emerald-100
                                text-emerald-600
                            "
                            onClick={() =>
                                router.push(
                                    "/admin/verification"
                                )
                            }
                        />


                        {/* Subscription Management */}

                        <AdminCard
                            title="Subscription Management"
                            description="
                                View expired subscriptions and renew
                                healthcare professional accounts.
                            "
                            icon={CreditCard}
                            color="
                                bg-red-100
                                text-red-600
                            "
                            onClick={() =>
                                router.push(
                                    "/admin/subscriptions"
                                )
                            }
                        />


                        {/* =================================================
                            PENDING REVIEWS
                        ================================================= */}

                        <AdminCard
                            title="Review Approval"
                            description="
                                Review ratings and feedback submitted
                                by clients before they are published
                                on healthcare professional profiles.
                            "
                            icon={Star}
                            color="
                                bg-amber-100
                                text-amber-600
                            "
                            badge={
                                reviewsLoading
                                    ? null
                                    : pendingReviews.length
                            }
                            badgeLabel="Pending"
                            onClick={() =>
                                router.push(
                                    "/admin/reviews"
                                )
                            }
                        />

                    </div>


                    {/* =====================================================
                        PENDING REVIEWS PREVIEW
                    ===================================================== */}

                    <div
                        className="
                            mt-8
                            bg-white
                            border
                            rounded-3xl
                            shadow-sm
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                p-6
                                border-b
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-11
                                        h-11
                                        rounded-xl
                                        bg-amber-100
                                        text-amber-600
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <MessageSquare
                                        size={21}
                                    />

                                </div>


                                <div>

                                    <h2
                                        className="
                                            text-xl
                                            font-bold
                                            text-slate-900
                                        "
                                    >

                                        Reviews Awaiting Approval

                                    </h2>


                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        "
                                    >

                                        Reviews submitted by clients
                                        that are currently pending.

                                    </p>

                                </div>

                            </div>


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
                                    justify-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-amber-500
                                    hover:bg-amber-600
                                    text-white
                                    text-sm
                                    font-semibold
                                    transition
                                "
                            >

                                Review All

                                <ArrowRight size={17} />

                            </button>

                        </div>


                        {/* Review content */}

                        {reviewsLoading ? (

                            <div
                                className="
                                    p-10
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    text-gray-500
                                "
                            >

                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />

                                Loading pending reviews...

                            </div>

                        ) : pendingReviews.length === 0 ? (

                            <div
                                className="
                                    p-10
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        w-14
                                        h-14
                                        mx-auto
                                        rounded-full
                                        bg-emerald-100
                                        text-emerald-600
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <ShieldCheck size={27} />

                                </div>


                                <h3
                                    className="
                                        mt-4
                                        font-semibold
                                        text-slate-900
                                    "
                                >

                                    No Pending Reviews

                                </h3>


                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                    "
                                >

                                    All submitted reviews have
                                    been processed.

                                </p>

                            </div>

                        ) : (

                            <div className="divide-y">

                                {pendingReviews.map(
                                    (review) => (

                                        <div
                                            key={review.id}
                                            className="
                                                p-5
                                                hover:bg-slate-50
                                                transition
                                                cursor-pointer
                                            "
                                            onClick={() =>
                                                router.push(
                                                    `/admin/review?id=${review.id}`
                                                )
                                            }
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-4
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
                                                            bg-amber-100
                                                            text-amber-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            shrink-0
                                                        "
                                                    >

                                                        <Star
                                                            size={19}
                                                            fill="currentColor"
                                                        />

                                                    </div>


                                                    <div>

                                                        <div
                                                            className="
                                                                flex
                                                                flex-wrap
                                                                items-center
                                                                gap-2
                                                            "
                                                        >

                                                            <p
                                                                className="
                                                                    font-semibold
                                                                    text-slate-900
                                                                "
                                                            >

                                                                {review.clientName ||
                                                                    "Client Review"}

                                                            </p>


                                                            <span
                                                                className="
                                                                    px-2
                                                                    py-1
                                                                    rounded-full
                                                                    bg-amber-100
                                                                    text-amber-700
                                                                    text-xs
                                                                    font-semibold
                                                                "
                                                            >

                                                                Pending

                                                            </span>

                                                        </div>


                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-1
                                                                mt-1
                                                            "
                                                        >

                                                            {Array.from({
                                                                length: 5
                                                            }).map(
                                                                (_, index) => (

                                                                    <Star
                                                                        key={index}
                                                                        size={15}
                                                                        className={
                                                                            index <
                                                                            Number(
                                                                                review.rating || 0
                                                                            )
                                                                                ? "text-amber-500"
                                                                                : "text-slate-300"
                                                                        }
                                                                        fill={
                                                                            index <
                                                                            Number(
                                                                                review.rating || 0
                                                                            )
                                                                                ? "currentColor"
                                                                                : "none"
                                                                        }
                                                                    />

                                                                )
                                                            )}

                                                        </div>


                                                        {review.comment && (

                                                            <p
                                                                className="
                                                                    text-sm
                                                                    text-gray-600
                                                                    mt-2
                                                                    line-clamp-2
                                                                "
                                                            >

                                                                {review.comment}

                                                            </p>

                                                        )}

                                                    </div>

                                                </div>


                                                <ArrowRight
                                                    size={20}
                                                    className="
                                                        text-gray-400
                                                        shrink-0
                                                    "
                                                />

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* =====================================================
                        FUTURE SECTION
                    ===================================================== */}

                    <div
                        className="
                            mt-8
                            grid
                            md:grid-cols-3
                            gap-4
                        "
                    >

                        <SmallStat
                            icon={Users}
                            title="Workers"
                            value="Manage profiles"
                        />


                        <SmallStat
                            icon={Activity}
                            title="Platform"
                            value="Monitor activity"
                        />

                    </div>

                </div>

            </div>

        </main>

    );

}


/* =========================================================
   ADMIN CARD
========================================================= */

function AdminCard({
    title,
    description,
    icon: Icon,
    color,
    badge,
    badgeLabel,
    onClick
}) {

    return (

        <button
            type="button"
            onClick={onClick}
            className="
                bg-white
                border
                rounded-3xl
                p-6
                text-left
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-200
                w-full
            "
        >

            <div
                className="
                    flex
                    justify-between
                    items-start
                "
            >

                <div
                    className={`
                        w-14
                        h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${color}
                    `}
                >

                    <Icon size={28} />

                </div>


                <div className="flex items-center gap-2">

                    {badge !== null &&
                        badge !== undefined && (

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    px-3
                                    py-1.5
                                    rounded-full
                                    bg-amber-100
                                    text-amber-700
                                    text-xs
                                    font-bold
                                "
                            >

                                <Clock size={13} />

                                {badge} {badgeLabel}

                            </div>

                        )}


                    <ArrowRight
                        className="text-gray-400"
                        size={22}
                    />

                </div>

            </div>


            <h2
                className="
                    text-xl
                    font-bold
                    mt-6
                    text-slate-900
                "
            >

                {title}

            </h2>


            <p
                className="
                    text-gray-500
                    mt-3
                    text-sm
                    leading-relaxed
                "
            >

                {description}

            </p>


            <div
                className="
                    mt-5
                    text-sm
                    font-semibold
                    text-emerald-600
                "
            >

                Open Dashboard →

            </div>

        </button>

    );

}


/* =========================================================
   SMALL STAT
========================================================= */

function SmallStat({
    icon: Icon,
    title,
    value
}) {

    return (

        <div
            className="
                bg-slate-50
                border
                rounded-2xl
                p-5
                flex
                items-center
                gap-4
            "
        >

            <div
                className="
                    w-10
                    h-10
                    bg-white
                    rounded-xl
                    flex
                    items-center
                    justify-center
                "
            >

                <Icon
                    className="text-emerald-600"
                    size={20}
                />

            </div>


            <div>

                <p className="font-semibold">

                    {title}

                </p>


                <p
                    className="
                        text-sm
                        text-gray-500
                    "
                >

                    {value}

                </p>

            </div>

        </div>

    );

}

// "use client";

// import { 
//     ShieldCheck,
//     CreditCard,
//     ArrowRight,
//     Users,
//     Activity
// } from "lucide-react";

// import { useRouter } from "next/navigation";

// import Navbar from "@/app/components/Navbar";


// export default function AdminDashboard(){


//     const router = useRouter();



//     return (

//         <main className="
//         min-h-screen
//         bg-gradient-to-b from-emerald-50/50 via-white to-white
//         ">

//             <Navbar />


//             <div className="
//             max-w-6xl
//             mx-auto
//             px-6
//             py-10
//             ">


//                 {/* Header */}

//                 <div className="
//                 bg-white
//                 rounded-3xl
//                 border
//                 shadow-sm
//                 p-8
//                 ">


//                     <div>

//                         <p className="
//                         text-gray-500
//                         ">

//                             Administration

//                         </p>


//                         <h1 className="
//                         text-3xl
//                         font-bold
//                         mt-1
//                         text-slate-900
//                         ">

//                             Healthcare Worker Management

//                         </h1>


//                         <p className="
//                         text-gray-600
//                         mt-3
//                         ">

//                             Manage applications, approvals and subscription renewals.

//                         </p>

//                     </div>



//                     {/* Dashboard Cards */}

//                     <div className="
//                     grid
//                     md:grid-cols-2
//                     gap-6
//                     mt-10
//                     ">



//                         <AdminCard

//                             title="Worker Verification"

//                             description="
//                             Review healthcare professionals waiting for approval,
//                             validate documents and activate accounts.
//                             "

//                             icon={ShieldCheck}

//                             color="
//                             bg-emerald-100
//                             text-emerald-600
//                             "

//                             onClick={()=> 
//                                 router.push(
//                                     "/admin/verification"
//                                 )
//                             }

//                         />




//                         <AdminCard

//                             title="Subscription Management"

//                             description="
//                             View expired subscriptions and renew healthcare
//                             professional accounts.
//                             "

//                             icon={CreditCard}

//                             color="
//                             bg-red-100
//                             text-red-600
//                             "

//                             onClick={()=> 
//                                 router.push(
//                                     "/admin/subscriptions"
//                                 )
//                             }

//                         />



//                     </div>



//                     {/* Future Section */}

//                     <div className="
//                     mt-8
//                     grid
//                     md:grid-cols-3
//                     gap-4
//                     ">


//                         <SmallStat

//                             icon={Users}

//                             title="Workers"

//                             value="Manage profiles"

//                         />


//                         <SmallStat

//                             icon={Activity}

//                             title="Platform"

//                             value="Monitor activity"

//                         />


//                     </div>



//                 </div>


//             </div>


//         </main>

//     );


// }





// function AdminCard({

//     title,

//     description,

//     icon:Icon,

//     color,

//     onClick

// }){


//     return (

//         <button

//         onClick={onClick}

//         className="
//         bg-white
//         border
//         rounded-3xl
//         p-6
//         text-left
//         hover:shadow-xl
//         hover:-translate-y-1
//         transition-all
//         duration-200
//         "

//         >


//             <div className="
//             flex
//             justify-between
//             items-start
//             ">


//                 <div className={`
//                 w-14
//                 h-14
//                 rounded-2xl
//                 flex
//                 items-center
//                 justify-center
//                 ${color}
//                 `}>


//                     <Icon size={28}/>


//                 </div>



//                 <ArrowRight

//                     className="
//                     text-gray-400
//                     "

//                     size={22}

//                 />


//             </div>




//             <h2 className="
//             text-xl
//             font-bold
//             mt-6
//             text-slate-900
//             ">

//                 {title}

//             </h2>



//             <p className="
//             text-gray-500
//             mt-3
//             text-sm
//             leading-relaxed
//             ">

//                 {description}

//             </p>



//             <div className="
//             mt-5
//             text-sm
//             font-semibold
//             text-emerald-600
//             ">

//                 Open Dashboard →

//             </div>



//         </button>

//     );

// }





// function SmallStat({

//     icon:Icon,

//     title,

//     value

// }){


//     return (

//         <div className="
//         bg-slate-50
//         border
//         rounded-2xl
//         p-5
//         flex
//         items-center
//         gap-4
//         ">


//             <div className="
//             w-10
//             h-10
//             bg-white
//             rounded-xl
//             flex
//             items-center
//             justify-center
//             ">

//                 <Icon
//                 className="text-emerald-600"
//                 size={20}
//                 />

//             </div>


//             <div>

//                 <p className="
//                 font-semibold
//                 ">

//                     {title}

//                 </p>


//                 <p className="
//                 text-sm
//                 text-gray-500
//                 ">

//                     {value}

//                 </p>


//             </div>


//         </div>

//     );

// }