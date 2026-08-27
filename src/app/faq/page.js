"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
Search,
ChevronDown,
ShieldCheck,
UserCheck,
BadgeCheck,
CreditCard,
CalendarDays,
Siren,
UserRound,
LockKeyhole,
Headphones,
HelpCircle,
} from "lucide-react";

const categories = [
{
id: "getting-started",
title: "Getting Started",
description: "Learn the basics of Karema Kare Hub.",
icon: HelpCircle,
color: "emerald",
questions: [
{
question: "What is Karema Kare Hub?",
answer:
"Karema Kare Hub is a digital care marketplace that connects clients, families, businesses, and institutions with healthcare and care professionals. Professionals can create profiles, submit credentials for verification, set their service rates, and receive opportunities to provide care services.",
},
{
question: "Who can use Karema Kare Hub?",
answer:
"Karema Kare Hub is designed for both clients seeking care services and healthcare or care professionals looking for freelance opportunities.",
},
{
question: "What types of professionals can join?",
answer:
"Depending on the services offered, professionals may include registered nurses, enrolled nurses, caregivers, patient care assistants, physiotherapists, dietitians, gerontologists, babysitters, psychiatric nurses, student nurses, and other qualified care professionals.",
},
{
question: "Is Karema Kare Hub an employer?",
answer:
"No. Karema Kare Hub operates as a digital marketplace that facilitates connections between clients and independent healthcare and care professionals. Professionals are responsible for the services they provide and maintaining any required professional licenses or certifications.",
},
],
},

{
id: "registration",
title: "Healthcare Professional Registration",
description: "Everything you need to know about joining as a professional.",
icon: UserCheck,
color: "blue",
questions: [
{
question: "How do I become a healthcare professional on Karema Kare Hub?",
answer:
"Create an account and complete the professional application. You will be asked to provide your personal information, professional information, qualifications, areas of specialization, rates, availability, and required verification documents.",
},
{
question: "How long does verification take?",
answer:
"Verification times may vary depending on the information and documents submitted. Our team will review your application and notify you when a decision has been made.",
},
{
question: "What documents do I need?",
answer:
"Depending on your profession, you may be required to provide identification, professional licenses or registration information, employment documentation, certificates, and other information necessary to verify your professional profile.",
},
{
question: "Do all professionals need a license?",
answer:
"No. Licensing requirements depend on the profession. Professionals whose occupation requires registration or licensing with a relevant regulatory body must provide valid registration or license information.",
},
{
question: "Which professionals need to provide a license or registration number?",
answer:
"Professionals whose profession is regulated by an appropriate professional or regulatory body should provide their valid license or registration number. Examples may include registered nurses and other regulated healthcare professionals. If you are unsure whether your profession requires a license, please contact support.",
},
{
question: "Can I update my application after submitting it?",
answer:
"If your application requires changes, you may be able to update your professional information through your dashboard. If your application has been rejected, follow the instructions provided on your dashboard to correct the requested information.",
},
],
},

{
id: "verification",
title: "Verification",
description: "Understand the professional verification process.",
icon: BadgeCheck,
color: "violet",
questions: [
{
question: "Why was my application rejected?",
answer:
"An application may be rejected if information is incomplete, inaccurate, inconsistent, or if submitted documents cannot be adequately verified. Your dashboard should display the reason for rejection when available.",
},
{
question: "What should I do if my application is rejected?",
answer:
"Review the rejection reason provided in your dashboard. Correct the requested information or documentation and resubmit your application. You can also contact support if you need assistance.",
},
{
question: "Can I contact support about my verification?",
answer:
"Yes. You can contact Karema Kare Hub support through the Contact Support option available in your dashboard.",
},
{
question: "Can I work before my profile is approved?",
answer:
"No. Professionals should wait until their profile has been approved before accepting opportunities through Karema Kare Hub.",
},
],
},

{
id: "subscriptions",
title: "Subscriptions",
description: "Information about professional subscriptions and renewals.",
icon: CreditCard,
color: "amber",
questions: [
{
question: "Do healthcare professionals need a subscription?",
answer:
"Yes, an active subscription may be required for healthcare professionals to continue using certain Karema Kare Hub services and receiving opportunities through the platform.",
},
{
question: "What happens when my subscription expires?",
answer:
"When your subscription expires, access to certain professional features may be restricted. Your dashboard will notify you that your subscription requires renewal.",
},
{
question: "How do I renew my subscription?",
answer:
"When your subscription is due for renewal, follow the renewal instructions provided in your dashboard. If required, submit proof of purchase according to the instructions provided by Karema Kare Hub.",
},
{
question: "Why do I need to provide proof of purchase?",
answer:
"Proof of purchase may be required so that Karema Kare Hub can verify your subscription payment before updating your account's subscription period.",
},
{
question: "Can I continue using my account after my subscription expires?",
answer:
"Your account may remain available, but certain professional features may be restricted until your subscription is renewed.",
},
],
},

{
id: "rates",
title: "Rates & Payments",
description: "Learn about setting your rates and receiving opportunities.",
icon: CreditCard,
color: "teal",
questions: [
{
question: "Can I set my own rates?",
answer:
"Yes. Healthcare professionals can specify their service rates during registration and update them through their professional dashboard.",
},
{
question: "What currencies can I use for my rates?",
answer:
"Professionals can select an available currency when entering their rates. The selected currency is displayed alongside their service pricing.",
},
{
question: "Can I change my rates later?",
answer:
"Yes. You can update your rates from your professional profile when the feature is available.",
},
{
question: "Does Karema Kare Hub guarantee that I will receive work?",
answer:
"No. Creating a professional profile does not guarantee bookings, employment, or a specific level of income. Opportunities depend on client demand, availability, qualifications, location, and other factors.",
},
],
},

{
id: "appointments",
title: "Appointments",
description: "Everything you need to know about bookings.",
icon: CalendarDays,
color: "rose",
questions: [
{
question: "How do I receive an appointment?",
answer:
"Clients can discover approved professionals and request their services. Appointment requests will appear in your professional dashboard.",
},
{
question: "How do I accept an appointment?",
answer:
"Open the appointment from your dashboard and review the appointment details. If you are available and willing to provide the requested service, you can accept the appointment.",
},
{
question: "Can I reject an appointment?",
answer:
"Yes. If you are unavailable or unable to provide the requested service, you may reject the appointment where the feature is available. You may be asked to provide a reason.",
},
{
question: "Can I cancel an appointment?",
answer:
"Appointments may be cancelled according to the applicable appointment rules. Where possible, communicate with the client as soon as possible if you are unable to attend.",
},
{
question: "What information can I see about an appointment?",
answer:
"Appointment details may include the client's information, requested service, appointment date and time, notes, and other information necessary to provide the requested service.",
},
],
},

{
id: "emergency",
title: "Emergency Requests",
description: "Important information about urgent care requests.",
icon: Siren,
color: "red",
questions: [
{
question: "What is an emergency request?",
answer:
"An emergency request allows clients to indicate that they require urgent assistance. Professionals who have indicated that they are willing and able to respond to emergency requests may be contacted when suitable opportunities arise.",
},
{
question:
"Does selecting emergency availability guarantee that I will respond to every emergency?",
answer:
"No. Selecting emergency availability indicates that you are willing and able to be contacted for emergency requests. You should only accept a request when you are available and capable of providing the required service.",
},
{
question: "What should I do during a medical emergency?",
answer:
"Karema Kare Hub is not a replacement for emergency medical services. In a life-threatening emergency, clients should contact the appropriate emergency services immediately.",
},
],
},

{
id: "profile",
title: "Profile",
description: "Manage your professional information.",
icon: UserRound,
color: "cyan",
questions: [
{
question: "How do I update my professional profile?",
answer:
"Open your Professional Dashboard and select Profile. From there you can update the professional information that is available for editing.",
},
{
question: "Can I change my specialization?",
answer:
"Yes. You can update your areas of specialization through your professional profile when the editing feature is available.",
},
{
question: "Can clients see my profile?",
answer:
"Approved professionals may have their professional profile made available to clients searching for care services. Certain private account information is not publicly displayed.",
},
],
},

{
id: "privacy",
title: "Privacy & Security",
description: "Learn how your information is protected.",
icon: LockKeyhole,
color: "indigo",
questions: [
{
question: "How is my information protected?",
answer:
"Karema Kare Hub takes reasonable measures to protect user information and uses security controls to help protect personal and professional information.",
},
{
question: "Why does Karema Kare Hub collect my personal information?",
answer:
"Information may be collected to create your account, verify your professional credentials, facilitate connections between clients and professionals, manage appointments, process subscriptions, and provide platform services.",
},
{
question: "Can I request a copy of my personal information?",
answer:
"Users may have rights concerning their personal information under applicable Jamaican data protection laws. Contact Karema Kare Hub support if you would like assistance with a data request.",
},
{
question: "Can I request deletion of my account?",
answer:
"You can contact Karema Kare Hub support regarding account deletion and applicable data retention requirements.",
},
],
},

{
id: "support",
title: "Contact Support",
description: "Need assistance? Find out how to contact us.",
icon: Headphones,
color: "emerald",
questions: [
{
question: "How do I contact Karema Kare Hub support?",
answer:
"You can contact our support team using the Contact Support option available within the application. You may also use the support email or telephone number provided on the platform.",
},
{
question: "What information should I provide when contacting support?",
answer:
"Please provide your name, account email address, and a brief description of the issue. If you are contacting us about an appointment, verification request, or subscription, include any relevant reference information.",
},
],
},
];

function colorClasses(color) {
const colors = {
emerald: "bg-emerald-100 text-emerald-700",
blue: "bg-blue-100 text-blue-700",
violet: "bg-violet-100 text-violet-700",
amber: "bg-amber-100 text-amber-700",
teal: "bg-teal-100 text-teal-700",
rose: "bg-rose-100 text-rose-700",
red: "bg-red-100 text-red-700",
cyan: "bg-cyan-100 text-cyan-700",
indigo: "bg-indigo-100 text-indigo-700",
};

return colors[color] || colors.emerald;
}

function QuestionItem({ item, open, onClick }) {
return ( <div className="border-b border-slate-100 last:border-0"> <button
     onClick={onClick}
     className="w-full flex items-center justify-between gap-6 py-5 text-left"
   > <span className="font-semibold text-slate-800">
{item.question} </span>

    <span
      className={`shrink-0 rounded-full p-2 bg-slate-100 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <ChevronDown size={18} className="text-slate-500" />
    </span>
  </button>

  {open && (
    <div className="pb-5 pr-8">
      <p className="text-sm leading-7 text-slate-600">
        {item.answer}
      </p>
    </div>
  )}
</div>


);
}

export default function QuestionsAnswersPage() {
const [search, setSearch] = useState("");
const [openQuestion, setOpenQuestion] = useState(null);

const filteredCategories = useMemo(() => {
const term = search.trim().toLowerCase();


if (!term) return categories;

return categories
  .map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.question.toLowerCase().includes(term) ||
        item.answer.toLowerCase().includes(term)
    ),
  }))
  .filter((category) => category.questions.length > 0);


}, [search]);

const totalQuestions = categories.reduce(
(total, category) => total + category.questions.length,
0
);

return ( <main className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white"> <Navbar />

  {/* Hero */}
  <section className="relative overflow-hidden">
    <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
    <div className="absolute top-20 -right-32 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />

    <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700">
        <HelpCircle size={16} />
        Karema Kare Hub Help Centre
      </div>

      <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
        How can we{" "}
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          help you?
        </span>
      </h1>

      <p className="max-w-2xl mx-auto mt-5 text-lg leading-8 text-slate-600">
        Find answers about professional registration, verification,
        subscriptions, appointments, emergency requests, privacy, and
        more.
      </p>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto mt-8">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={21}
        />

        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpenQuestion(null);
          }}
          placeholder="Search questions and answers..."
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-slate-200
            bg-white
            pl-14
            pr-5
            shadow-xl
            shadow-slate-200/40
            outline-none
            focus:border-emerald-400
            focus:ring-4
            focus:ring-emerald-100
            transition
          "
        />
      </div>

      <div className="mt-5 text-sm text-slate-500">
        {search
          ? `${filteredCategories.reduce(
              (total, category) => total + category.questions.length,
              0
            )} results found`
          : `${totalQuestions} questions across ${categories.length} topics`}
      </div>
    </div>
  </section>

  {/* Categories */}
  {!search && (
    <section className="max-w-6xl mx-auto px-6 pb-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="
                group
                bg-white
                border
                border-slate-100
                rounded-2xl
                p-5
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                hover:border-emerald-200
                transition-all
              "
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${colorClasses(
                  category.color
                )}`}
              >
                <Icon size={21} />
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                {category.title}
              </h3>

              <p className="text-sm text-slate-500 mt-1 leading-6">
                {category.description}
              </p>

              <div className="mt-3 text-xs font-semibold text-emerald-600">
                {category.questions.length} questions →
              </div>
            </a>
          );
        })}
      </div>
    </section>
  )}

  {/* Questions */}
  <section className="max-w-4xl mx-auto px-6 pb-20">
    {filteredCategories.length === 0 ? (
      <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
          <Search className="text-slate-400" size={28} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mt-5">
          No answers found
        </h2>

        <p className="text-slate-500 mt-2">
          Try searching for a different question or keyword.
        </p>
      </div>
    ) : (
      <div className="space-y-8">
        {filteredCategories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.id}
              id={category.id}
              className="scroll-mt-24 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              {/* Category Header */}
              <div className="p-6 md:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses(
                      category.color
                    )}`}
                  >
                    <Icon size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {category.title}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="px-6 md:px-7">
                {category.questions.map((item, index) => {
                  const questionId = `${category.id}-${index}`;

                  return (
                    <QuestionItem
                      key={questionId}
                      item={item}
                      open={openQuestion === questionId}
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === questionId
                            ? null
                            : questionId
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </section>

  {/* Support CTA */}
  <section className="max-w-6xl mx-auto px-6 pb-20">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-12 text-white shadow-2xl shadow-emerald-600/20">
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
            <Headphones size={23} />
          </div>

          <span className="font-semibold text-emerald-100">
            Still need help?
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mt-5">
          We're here to help.
        </h2>

        <p className="mt-3 text-emerald-50 leading-7 max-w-2xl">
          If you cannot find the answer you're looking for, contact the
          Karema Kare Hub support team and we'll be happy to assist you.
        </p>

        <a
          href="/contact"
          className="
            inline-flex
            items-center
            justify-center
            mt-7
            bg-white
            text-emerald-700
            font-semibold
            px-6
            py-3
            rounded-xl
            hover:bg-emerald-50
            transition
          "
        >
          Contact Support →
        </a>
      </div>
    </div>
  </section>

  <footer className="border-t border-slate-100 bg-white py-8">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()} Karema Kare Hub. Built for trusted
        care, opportunity, and connection.
      </p>
    </div>
  </footer>
</main>


);
}
