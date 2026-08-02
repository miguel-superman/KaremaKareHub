"use client";

import { 
    ShieldCheck,
    CreditCard,
    ArrowRight,
    Users,
    Activity
} from "lucide-react";

import { useRouter } from "next/navigation";

import Navbar from "@/app/components/Navbar";


export default function AdminDashboard(){


    const router = useRouter();



    return (

        <main className="
        min-h-screen
        bg-gradient-to-b from-emerald-50/50 via-white to-white
        ">

            <Navbar />


            <div className="
            max-w-6xl
            mx-auto
            px-6
            py-10
            ">


                {/* Header */}

                <div className="
                bg-white
                rounded-3xl
                border
                shadow-sm
                p-8
                ">


                    <div>

                        <p className="
                        text-gray-500
                        ">

                            Administration

                        </p>


                        <h1 className="
                        text-3xl
                        font-bold
                        mt-1
                        text-slate-900
                        ">

                            Healthcare Worker Management

                        </h1>


                        <p className="
                        text-gray-600
                        mt-3
                        ">

                            Manage applications, approvals and subscription renewals.

                        </p>

                    </div>



                    {/* Dashboard Cards */}

                    <div className="
                    grid
                    md:grid-cols-2
                    gap-6
                    mt-10
                    ">



                        <AdminCard

                            title="Worker Verification"

                            description="
                            Review healthcare professionals waiting for approval,
                            validate documents and activate accounts.
                            "

                            icon={ShieldCheck}

                            color="
                            bg-emerald-100
                            text-emerald-600
                            "

                            onClick={()=> 
                                router.push(
                                    "/admin/verification"
                                )
                            }

                        />




                        <AdminCard

                            title="Subscription Management"

                            description="
                            View expired subscriptions and renew healthcare
                            professional accounts.
                            "

                            icon={CreditCard}

                            color="
                            bg-red-100
                            text-red-600
                            "

                            onClick={()=> 
                                router.push(
                                    "/admin/subscriptions"
                                )
                            }

                        />



                    </div>



                    {/* Future Section */}

                    <div className="
                    mt-8
                    grid
                    md:grid-cols-3
                    gap-4
                    ">


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





function AdminCard({

    title,

    description,

    icon:Icon,

    color,

    onClick

}){


    return (

        <button

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
        "

        >


            <div className="
            flex
            justify-between
            items-start
            ">


                <div className={`
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center
                ${color}
                `}>


                    <Icon size={28}/>


                </div>



                <ArrowRight

                    className="
                    text-gray-400
                    "

                    size={22}

                />


            </div>




            <h2 className="
            text-xl
            font-bold
            mt-6
            text-slate-900
            ">

                {title}

            </h2>



            <p className="
            text-gray-500
            mt-3
            text-sm
            leading-relaxed
            ">

                {description}

            </p>



            <div className="
            mt-5
            text-sm
            font-semibold
            text-emerald-600
            ">

                Open Dashboard →

            </div>



        </button>

    );

}





function SmallStat({

    icon:Icon,

    title,

    value

}){


    return (

        <div className="
        bg-slate-50
        border
        rounded-2xl
        p-5
        flex
        items-center
        gap-4
        ">


            <div className="
            w-10
            h-10
            bg-white
            rounded-xl
            flex
            items-center
            justify-center
            ">

                <Icon
                className="text-emerald-600"
                size={20}
                />

            </div>


            <div>

                <p className="
                font-semibold
                ">

                    {title}

                </p>


                <p className="
                text-sm
                text-gray-500
                ">

                    {value}

                </p>


            </div>


        </div>

    );

}