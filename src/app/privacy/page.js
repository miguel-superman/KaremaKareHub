"use client";

import {
ShieldCheck,
LockKeyhole,
Database,
UserCheck,
Scale,
Globe2,
AlertTriangle,
Mail,
Phone,
ChevronRight,
CheckCircle2,
FileText,
} from "lucide-react";

import Navbar from "../components/Navbar";

export default function PrivacyPage() {
const sections = [
{
id: "information",
title: "Information We Collect",
icon: Database,
},
{
id: "purpose",
title: "Why We Collect Your Information",
icon: UserCheck,
},
{
id: "sharing",
title: "How We Share Information",
icon: Globe2,
},
{
id: "retention",
title: "Data Retention",
icon: Database,
},
{
id: "rights",
title: "Your Privacy Rights",
icon: Scale,
},
{
id: "security",
title: "Security",
icon: LockKeyhole,
},
{
id: "jamaica",
title: "Data Protection in Jamaica",
icon: ShieldCheck,
},
{
id: "verification",
title: "Professional Verification",
icon: UserCheck,
},
{
id: "communications",
title: "Communications",
icon: Mail,
},
{
id: "changes",
title: "Changes to This Policy",
icon: FileText,
},
];

return ( <main className="min-h-screen bg-slate-50 text-slate-800"> <Navbar />


  {/* HERO */}
  <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white" />
      <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-white" />
    </div>

    <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl">

        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
          <ShieldCheck size={18} />
          Your Privacy Matters
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-6">
          Privacy Policy
        </h1>

        <p className="text-emerald-50 text-lg md:text-xl mt-6 leading-relaxed">
          Learn how Karema Kare Hub collects, uses, protects, and
          manages your personal and professional information.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">

          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <p className="text-xs text-emerald-100">
              Operated by
            </p>

            <p className="font-semibold">
              Karema Kare Hub Limited
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <p className="text-xs text-emerald-100">
              Last Updated
            </p>

            <p className="font-semibold">
              August 27, 2026
            </p>
          </div>

        </div>

      </div>
    </div>
  </section>

  {/* INTRO */}
  <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">

    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-7 md:p-10">

      <div className="flex gap-5 items-start">

        <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-emerald-100 items-center justify-center shrink-0">
          <LockKeyhole
            className="text-emerald-600"
            size={26}
          />
        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Our Commitment to Your Privacy
          </h2>

          <p className="text-slate-600 leading-relaxed mt-4">
            At Karema Kare Hub Limited, we respect the privacy of
            our users and are committed to protecting the personal
            and professional information entrusted to us.
          </p>

          <p className="text-slate-600 leading-relaxed mt-4">
            Karema Kare Hub is a digital care marketplace designed
            to connect clients, families, businesses, and
            institutions with healthcare and care professionals.
            Our approach to privacy is guided by transparency,
            accountability, security, and compliance with applicable
            Jamaican data protection laws.
          </p>

        </div>

      </div>

    </div>

  </section>

  {/* CONTENT */}
  <section className="max-w-6xl mx-auto px-6 py-12">

    <div className="grid lg:grid-cols-[280px_1fr] gap-10">

      {/* TABLE OF CONTENTS */}

      <aside className="lg:sticky lg:top-24 h-fit">

        <div className="bg-white border rounded-2xl p-5 shadow-sm">

          <h3 className="font-bold text-lg mb-4">
            On This Page
          </h3>

          <div className="space-y-1">

            {sections.map((section) => {

              const Icon = section.icon;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    text-slate-600
                    hover:bg-emerald-50
                    hover:text-emerald-700
                    transition
                  "
                >

                  <Icon size={16} />

                  <span>
                    {section.title}
                  </span>

                </a>
              );

            })}

          </div>

        </div>

      </aside>

      {/* POLICY */}

      <div className="space-y-8">

        {/* SECTION 1 */}

        <PolicySection
          id="information"
          number="01"
          icon={Database}
          title="Information We Collect"
        >

          <p>
            To provide and improve our services, Karema Kare Hub
            may collect several categories of information.
          </p>

          <InfoGrid
            items={[
              {
                title: "Personal Information",
                items: [
                  "Full name",
                  "Email address",
                  "Telephone number",
                  "Residential or service address",
                  "Date of birth",
                  "Gender",
                  "Emergency contact information",
                  "Payment and subscription information",
                ],
              },
              {
                title: "Professional Information",
                items: [
                  "Professional qualifications",
                  "Professional licenses and registration numbers",
                  "Certifications",
                  "Employment information",
                  "Professional experience",
                  "Areas of specialization",
                  "Professional biography",
                  "Service rates and availability",
                  "Professional photographs",
                ],
              },
              {
                title: "Usage Information",
                items: [
                  "Appointment information",
                  "Service requests",
                  "Ratings and reviews",
                  "User communications",
                  "Subscription information",
                  "Account activity",
                ],
              },
            ]}
          />

        </PolicySection>

        {/* SECTION 2 */}

        <PolicySection
          id="purpose"
          number="02"
          icon={UserCheck}
          title="Why We Collect Your Information"
        >

          <p>
            Karema Kare Hub collects and processes information
            for legitimate business and service purposes.
          </p>

          <BulletCards
            items={[
              [
                "Connecting Clients and Professionals",
                "We use information to facilitate connections between clients, families, businesses, institutions, and healthcare or care professionals.",
              ],
              [
                "Professional Verification",
                "Professional information and supporting documentation may be reviewed to help verify qualifications, licenses, certifications, and other submitted information.",
              ],
              [
                "Appointments and Services",
                "Information may be used to facilitate appointment requests, bookings, communications, and service delivery.",
              ],
              [
                "Payments and Subscriptions",
                "Information may be used to manage subscriptions, payments, renewals, and platform transactions.",
              ],
              [
                "Safety and Platform Integrity",
                "Information may be used to maintain the safety, reliability, security, and integrity of the platform.",
              ],
            ]}
          />

        </PolicySection>

        {/* SECTION 3 */}

        <PolicySection
          id="sharing"
          number="03"
          icon={Globe2}
          title="How We Share Information"
        >

          <Highlight>
            Karema Kare Hub does not sell users' personal
            information.
          </Highlight>

          <p>
            Information may be shared when reasonably necessary
            to provide platform services.
          </p>

          <SubHeading>
            Clients and Professionals
          </SubHeading>

          <p>
            Certain information may be made available to verified
            professionals or clients when necessary to facilitate
            service delivery, appointments, or communication.
            Only information reasonably necessary for the relevant
            service should be disclosed.
          </p>

          <SubHeading>
            Regulatory Authorities
          </SubHeading>

          <p>
            Information may be disclosed to appropriate regulatory
            or government authorities where required or permitted
            by law.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3 mt-5">
            {[
              "Medical Council of Jamaica",
              "Nursing Council of Jamaica",
              "Council for Professions Supplementary to Medicine",
              "Other competent regulatory authorities",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 bg-slate-50 border rounded-xl p-4"
              >
                <CheckCircle2
                  className="text-emerald-600 shrink-0"
                  size={19}
                />
                <span className="text-sm">
                  {item}
                </span>
              </li>
            ))}
          </ul>

        </PolicySection>

        {/* SECTION 4 */}

        <PolicySection
          id="retention"
          number="04"
          icon={Database}
          title="Data Retention"
        >

          <p>
            Karema Kare Hub takes reasonable measures to store
            user information securely.
          </p>

          <p>
            Information is retained only for as long as reasonably
            necessary to provide platform services, maintain user
            accounts, verify professional credentials, manage
            appointments and subscriptions, resolve disputes,
            maintain business records, and meet legal or regulatory
            obligations.
          </p>

          <Highlight>
            When information is no longer required, reasonable
            steps will be taken to securely delete, anonymize, or
            otherwise dispose of the information where appropriate.
          </Highlight>

        </PolicySection>

        {/* SECTION 5 */}

        <PolicySection
          id="rights"
          number="05"
          icon={Scale}
          title="Your Privacy Rights"
        >

          <p>
            Under applicable Jamaican data protection laws,
            including the Data Protection Act, 2020, users may
            have rights concerning their personal information.
          </p>

          <RightsGrid />

        </PolicySection>

        {/* SECTION 6 */}

        <PolicySection
          id="security"
          number="06"
          icon={LockKeyhole}
          title="Security of Your Information"
        >

          <p>
            Karema Kare Hub takes reasonable technical and
            organizational measures to protect personal and
            professional information against unauthorized access,
            misuse, alteration, disclosure, or destruction.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">

            {[
              "Point-to-point security encryption where appropriate",
              "Encryption and secure storage",
              "Role-based access controls",
              "Authentication and authorization controls",
              "Access restrictions for sensitive information",
              "Regular security and compliance reviews",
            ].map((item) => (
              <SecurityItem
                key={item}
                text={item}
              />
            ))}

          </div>

          <p className="text-sm text-slate-500 mt-6">
            While we take reasonable steps to protect information,
            no digital platform or method of electronic
            transmission can be guaranteed to be completely
            secure.
          </p>

        </PolicySection>

        {/* SECTION 7 */}

        <PolicySection
          id="jamaica"
          number="07"
          icon={ShieldCheck}
          title="Data Protection Compliance in Jamaica"
        >

          <p>
            Karema Kare Hub is committed to operating in accordance
            with applicable Jamaican data protection requirements,
            including the Data Protection Act, 2020.
          </p>

          <ComplianceItem
            title="Data Protection Officer"
            text="Where required, Karema Kare Hub will appoint a Data Protection Officer (DPO) or other responsible person to oversee data protection and privacy compliance."
          />

          <ComplianceItem
            title="Registration and Regulatory Compliance"
            text="Where required by applicable law, Karema Kare Hub will register with or maintain the appropriate relationship with the Office of the Information Commissioner (OIC) of Jamaica."
          />

          <ComplianceItem
            title="Lawful Processing"
            text="Personal information should be collected and processed in accordance with applicable data protection principles, including fairness and transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, and confidentiality."
          />

          <ComplianceItem
            title="Consent Management"
            text="Where consent is required as the lawful basis for processing, users will be provided with appropriate information about how their data is being used and may withdraw consent where applicable."
          />

          <ComplianceItem
            title="Cross-Border Data Transfers"
            text="Where personal information is transferred outside Jamaica, Karema Kare Hub will take appropriate steps to ensure that such transfers comply with applicable data protection requirements and any applicable adequacy or security standards."
          />

          <ComplianceItem
            title="Data Breach Notification"
            text="Where a personal data breach occurs, Karema Kare Hub will take appropriate steps to investigate, contain, and address the breach. Where notification is legally required, appropriate authorities and affected individuals will be notified within the applicable statutory timelines."
          />

        </PolicySection>

        {/* SECTION 8 */}

        <PolicySection
          id="verification"
          number="08"
          icon={UserCheck}
          title="Professional Information and Verification"
        >

          <p>
            Healthcare and care professionals understand that
            certain information submitted during registration may
            be used for professional verification.
          </p>

          <p>
            This may include professional licenses, registration
            information, qualifications, certifications,
            employment information, and other documents necessary
            to establish the authenticity of a professional profile.
          </p>

          <Highlight>
            Professionals are responsible for ensuring that
            information submitted to Karema Kare Hub is accurate,
            complete, and up to date.
          </Highlight>

          <p>
            Karema Kare Hub may restrict, suspend, or remove a
            professional profile where information is found to be
            false, misleading, fraudulent, or unable to be
            adequately verified.
          </p>

        </PolicySection>

        {/* SECTION 9 */}

        <PolicySection
          id="communications"
          number="09"
          icon={Mail}
          title="Communications"
        >

          <p>
            Karema Kare Hub may communicate with users regarding:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-5">

            {[
              "Account activity",
              "Verification",
              "Appointments",
              "Service requests",
              "Subscription status",
              "Payments",
              "Security matters",
              "Customer support requests",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border"
              >
                <CheckCircle2
                  className="text-emerald-600"
                  size={18}
                />
                <span>{item}</span>
              </div>
            ))}

          </div>

        </PolicySection>

        {/* SECTION 10 */}

        <PolicySection
          id="changes"
          number="10"
          icon={FileText}
          title="Changes to This Privacy Policy"
        >

          <p>
            Karema Kare Hub may update this Privacy Policy from
            time to time to reflect changes in our services,
            technology, legal requirements, or data protection
            practices.
          </p>

          <p>
            When significant changes are made, we may provide
            appropriate notice through the platform or other
            communication channels.
          </p>

          <Highlight>
            Users are encouraged to periodically review this
            Privacy Policy to remain informed about how their
            information is handled.
          </Highlight>

        </PolicySection>

        {/* CONTACT */}

        <section className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-3xl p-8 md:p-10 shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div>

              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Mail size={23} />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">
                Have a Privacy Question?
              </h2>

              <p className="text-emerald-50 mt-3 max-w-xl">
                If you have questions about this Privacy Policy,
                your personal information, or your data protection
                rights, our support team is available to help.
              </p>

            </div>

            <a
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-white
                text-emerald-700
                font-semibold
                px-6
                py-3
                rounded-xl
                hover:bg-emerald-50
                transition
                shrink-0
              "
            >
              Contact Us
              <ChevronRight size={18} />
            </a>

          </div>

        </section>

        {/* FINAL */}

        <section className="text-center py-8">

          <ShieldCheck
            className="mx-auto text-emerald-600"
            size={36}
          />

          <h2 className="text-2xl font-bold mt-4">
            Trust. Opportunity. Convenience. Belonging.
          </h2>

          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Karema Kare Hub is committed to building a trusted
            digital care community where privacy, security,
            compassion, and accountability remain at the heart
            of every interaction.
          </p>

        </section>

      </div>

    </div>

  </section>

  {/* FOOTER */}

  <footer className="border-t bg-white">

    <div className="max-w-6xl mx-auto px-6 py-8">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Karema Kare Hub Limited.
          All rights reserved.
        </div>

        <div className="flex items-center gap-5 text-sm">

          <a
            href="/terms"
            className="text-slate-500 hover:text-emerald-600 transition"
          >
            Terms & Conditions
          </a>

          <span className="text-slate-300">
            |
          </span>

          <a
            href="/privacy"
            className="text-emerald-600 font-medium"
          >
            Privacy Policy
          </a>

        </div>

      </div>

    </div>

  </footer>

</main>


);
}

/* ============================================================
COMPONENTS
============================================================ */

function PolicySection({
id,
number,
icon: Icon,
title,
children,
}) {
return ( <section
   id={id}
   className="
     bg-white
     border
     border-slate-100
     rounded-3xl
     p-7
     md:p-9
     shadow-sm
     scroll-mt-24
   "
 >


  <div className="flex items-start gap-4 mb-6">

    <div className="
      w-12
      h-12
      rounded-2xl
      bg-emerald-100
      text-emerald-600
      flex
      items-center
      justify-center
      shrink-0
    ">
      <Icon size={22} />
    </div>

    <div>

      <p className="text-xs font-bold tracking-widest text-emerald-600">
        SECTION {number}
      </p>

      <h2 className="text-2xl md:text-3xl font-bold mt-1">
        {title}
      </h2>

    </div>

  </div>

  <div className="space-y-5 text-slate-600 leading-relaxed">
    {children}
  </div>

</section>


);
}

function InfoGrid({ items }) {
return ( <div className="grid md:grid-cols-2 gap-5 mt-6">


  {items.map((group) => (

    <div
      key={group.title}
      className="bg-slate-50 border rounded-2xl p-5"
    >

      <h3 className="font-bold text-slate-800">
        {group.title}
      </h3>

      <ul className="mt-4 space-y-2">

        {group.items.map((item) => (

          <li
            key={item}
            className="flex gap-2 text-sm"
          >
            <CheckCircle2
              className="text-emerald-500 shrink-0 mt-0.5"
              size={16}
            />

            <span>{item}</span>

          </li>

        ))}

      </ul>

    </div>

  ))}

</div>


);
}

function BulletCards({ items }) {
return ( <div className="space-y-4 mt-6">


  {items.map(([title, text]) => (

    <div
      key={title}
      className="border rounded-2xl p-5 hover:border-emerald-200 transition"
    >

      <h3 className="font-bold text-slate-800">
        {title}
      </h3>

      <p className="text-sm mt-2">
        {text}
      </p>

    </div>

  ))}

</div>


);
}

function RightsGrid() {

const rights = [
[
"Right to Access",
"You may request access to personal information held about you.",
],
[
"Right to Correction",
"You may request that inaccurate, incomplete, or outdated information be corrected.",
],
[
"Right to Deletion",
"Where applicable, you may request deletion of your personal information.",
],
[
"Right to Object",
"Where applicable, you may object to certain types of processing.",
],
[
"Withdrawal of Consent",
"Where processing is based on consent, you may withdraw your consent.",
],
];

return ( <div className="grid md:grid-cols-2 gap-4 mt-6">


  {rights.map(([title, text]) => (

    <div
      key={title}
      className="
        rounded-2xl
        border
        p-5
        hover:shadow-md
        transition
      "
    >

      <div className="flex gap-3">

        <CheckCircle2
          className="text-emerald-600 shrink-0"
          size={20}
        />

        <div>

          <h3 className="font-bold text-slate-800">
            {title}
          </h3>

          <p className="text-sm mt-2">
            {text}
          </p>

        </div>

      </div>

    </div>

  ))}

</div>


);
}

function SecurityItem({ text }) {

return ( <div className="flex items-start gap-3 bg-slate-50 border rounded-xl p-4">


  <LockKeyhole
    className="text-emerald-600 shrink-0"
    size={18}
  />

  <span className="text-sm">
    {text}
  </span>

</div>


);
}

function ComplianceItem({ title, text }) {

return ( <div className="border-l-4 border-emerald-500 bg-emerald-50/50 rounded-r-2xl p-5 mt-5">

  <h3 className="font-bold text-slate-800">
    {title}
  </h3>

  <p className="text-sm mt-2">
    {text}
  </p>

</div>


);
}

function Highlight({ children }) {

return ( <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl p-5 font-medium">
{children} </div>
);
}

function SubHeading({ children }) {

return ( <h3 className="text-lg font-bold text-slate-800 pt-2">
{children} </h3>
);
}
