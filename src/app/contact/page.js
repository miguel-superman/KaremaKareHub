"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
            <MessageCircle size={16} />
            We're here to help
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-6">
            Let's start a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              conversation.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-600 mt-5 leading-relaxed">
            Have a question about Karema Kare Hub, your account, finding care,
            becoming a professional, or working with us? Our team is ready to
            assist.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="grid md:grid-cols-2 gap-6">

          <ContactCard
            icon={Mail}
            title="Email Us"
            description="Send us a message and our support team will get back to you."
            value="karemababysitters@gmail.com"
            href="mailto:karemababysitters@gmail.com"
          />

          {/* <ContactCard
            icon={Phone}
            title="Call Us"
            description="Speak directly with a member of the Karema Kare Hub team."
            value="+1 (876) 000-0000"
            href="tel:+18760000000"
          /> */}

          {/* <ContactCard
            icon={MessageCircle}
            title="Live Chat"
            description="Need a quick answer? Chat with our support team online."
            value="Chat with us"
            href="#"
          /> */}

        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Information */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-10 text-white h-full shadow-xl shadow-emerald-600/20">

              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                <HelpCircle size={28} />
              </div>

              <h2 className="text-3xl font-bold">
                How can we help?
              </h2>

              <p className="text-emerald-100 mt-4 leading-relaxed">
                Whether you're a healthcare professional looking for new
                opportunities, a family looking for trusted care, or a
                business looking for qualified talent, we're here to help.
              </p>

              <div className="space-y-5 mt-10">

                <InfoRow
                  icon={Clock}
                  title="Support Hours"
                  text="Monday – Friday, 8:00 AM – 5:00 PM"
                />

                <InfoRow
                  icon={MapPin}
                  title="Location"
                  text="Jamaica"
                />

                <InfoRow
                  icon={Mail}
                  title="Email"
                  text="karemababysitters@gmail.com"
                />

              </div>

              <div className="mt-10 pt-6 border-t border-white/20">
                <p className="text-sm text-emerald-100">
                  For urgent matters, please contact us directly by phone.
                </p>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">

              <div className="mb-8">
                <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                  Contact Support
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  Send us a message
                </h2>

                <p className="text-slate-500 mt-2">
                  Fill out the form below and we'll get back to you as soon
                  as possible.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">

                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2
                      className="text-emerald-600"
                      size={32}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-emerald-800 mt-5">
                    Message Sent!
                  </h3>

                  <p className="text-emerald-700 mt-2">
                    Thank you for contacting Karema Kare Hub. A member of our
                    team will respond shortly.
                  </p>

                </div>
              ) : (

                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        First Name
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="Your first name"
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700">
                        Last Name
                      </label>

                      <input
                        type="text"
                        required
                        placeholder="Your last name"
                        className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      I am a...
                    </label>

                    <select
                      required
                      className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select an option</option>
                      <option>Healthcare Professional</option>
                      <option>Family / Individual</option>
                      <option>Business / Organization</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Subject
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="How can we help?"
                      className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700">
                      Message
                    </label>

                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition"
                  >
                    Send Message
                    <Send size={18} />
                  </button>

                </form>

              )}

            </div>
          </div>

        </div>
      </section>

      {/* Help Section */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
              Need Help?
            </span>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              You may find your answer here
            </h2>

            <p className="text-slate-500 mt-3">
              Check out our frequently asked questions or speak with our
              support team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10">

            <HelpCard
              title="Healthcare Professionals"
              text="Learn about registration, verification, subscriptions and finding opportunities."
            />

            <HelpCard
              title="Families"
              text="Learn how to discover and connect with trusted care professionals."
            />

            <HelpCard
              title="Businesses"
              text="Find out how organizations can connect with qualified professionals."
            />

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <p className="font-bold text-slate-900">
              Karema Kare Hub
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Connecting people with trusted care and opportunity.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Karema Kare Hub Limited. All rights reserved.
          </p>

        </div>
      </footer>

    </main>
  );
}


/* -------------------------------- */
/* Contact Card */
/* -------------------------------- */

function ContactCard({
  icon: Icon,
  title,
  description,
  value,
  href,
}) {
  return (
    <a
      href={href}
      className="group bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-200"
    >

      <div className="flex items-start justify-between">

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
          <Icon className="text-emerald-600" size={22} />
        </div>

        <ArrowRight
          className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition"
          size={20}
        />

      </div>

      <h3 className="font-bold text-xl text-slate-900 mt-6">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
        {description}
      </p>

      <p className="text-emerald-600 font-semibold mt-5">
        {value}
      </p>

    </a>
  );
}


/* -------------------------------- */
/* Info Row */
/* -------------------------------- */

function InfoRow({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
        <Icon size={19} />
      </div>

      <div>
        <p className="font-semibold">
          {title}
        </p>

        <p className="text-sm text-emerald-100 mt-1">
          {text}
        </p>
      </div>

    </div>
  );
}


/* -------------------------------- */
/* Help Card */
/* -------------------------------- */

function HelpCard({
  title,
  text,
}) {
  return (
    <div className="border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition">

      <h3 className="font-bold text-lg text-slate-900">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
        {text}
      </p>

      <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
        Learn more
        <ArrowRight size={16} />
      </button>

    </div>
  );
}

