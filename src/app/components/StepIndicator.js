import {
    User,
    UserRound,
    Briefcase,
    DollarSign,
    FileText
} from "lucide-react";

const steps = [
    {
        title: "Account",
        icon: User
    },
    {
        title: "Personal",
        icon: UserRound
    },
    {
        title: "Professional",
        icon: Briefcase
    },
    {
        title: "Rates",
        icon: DollarSign
    },
    {
        title: "Documents",
        icon: FileText
    }
];

export default function StepIndicator({ current }) {

    return (

        <div className="mt-10">

            <div className="h-2 rounded-full bg-gray-200">

                <div
                    className="h-2 bg-emerald-500 rounded-full transition-all"
                    style={{
                        width: `${current * 20}%`
                    }}
                />

            </div>

            <div className="flex justify-between mt-6">

                {steps.map((step, index) => {

                    const Icon = step.icon;

                    const active = current === index + 1;

                    return (

                        <div
                            key={step.title}
                            className="flex flex-col items-center"
                        >

                            <div
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                                    active
                                        ? "border-emerald-500 text-emerald-500"
                                        : "border-gray-300 text-gray-400"
                                }`}
                            >

                                <Icon size={20} />

                            </div>

                            <span
                                className={`mt-2 text-sm ${
                                    active
                                        ? "font-semibold text-emerald-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {step.title}
                            </span>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}