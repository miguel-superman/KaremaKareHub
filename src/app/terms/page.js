"use client";

import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
    FileText,
    Users,
    ShieldCheck,
    Stethoscope,
    Lock,
    Scale,
    HeartHandshake
} from "lucide-react";

export default function TermsPage() {

    return (

        <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">

            <Navbar />

            {/* Hero */}

            <section className="border-b border-emerald-100 bg-gradient-to-r from-emerald-700 to-teal-700 text-white">

                <div className="max-w-6xl mx-auto px-6 py-20">

                    <div className="flex items-center gap-4">

                        <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">

                            <FileText size={34} />

                        </div>

                        <div>

                            <h1 className="text-5xl font-bold">

                                Terms & Conditions

                            </h1>

                            <p className="text-emerald-100 mt-3 text-lg">

                                Karema Kare Hub Limited User & Professional Agreement

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <section className="max-w-6xl mx-auto px-6 py-14 space-y-8">

                <Card className="border-emerald-100 shadow-sm">

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <HeartHandshake className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Welcome

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            Karema Kare Hub Limited, formerly known as Karema Babysitters,
                            operates as a digital healthcare marketplace designed to connect
                            families, healthcare institutions, businesses, and individuals
                            with qualified healthcare professionals including registered
                            nurses, licensed practical nurses, caregivers, patient care
                            assistants, physiotherapists, dietitians, nannies, and domestic
                            helpers.

                        </p>

                        <p className="mt-6 text-gray-700 leading-8">

                            By accessing or using the Karema Kare Hub platform, every user
                            agrees to these Terms & Conditions and acknowledges that the
                            platform operates according to the principles of integrity,
                            transparency, professionalism, ethical healthcare practice,
                            and compliance with the laws of Jamaica.

                        </p>

                    </CardContent>

                </Card>



                {/* Clients */}

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <Users className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Terms for Clients

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            Karema Kare Hub provides clients with access to a network of
                            healthcare professionals who have submitted documentation for
                            credential verification. While reasonable efforts are made to
                            verify licenses and supporting documentation, Karema Kare Hub
                            Limited does not employ these professionals directly and cannot
                            guarantee the completeness or accuracy of information supplied
                            by individual users.

                        </p>

                        <p className="mt-6 text-gray-700 leading-8">

                            Clients are strongly encouraged to perform their own independent
                            background checks, interviews, and reference verification before
                            engaging any professional through the platform.

                        </p>

                        <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-100 p-6">

                            <h3 className="font-semibold text-emerald-700">

                                Subscription Fees

                            </h3>

                            <ul className="mt-4 space-y-2 text-gray-700">

                                <li>• Individual Monthly: <strong>J$1,000</strong></li>

                                <li>• Individual Quarterly: <strong>J$2,500</strong></li>

                                <li>• Business Monthly: <strong>J$5,000</strong></li>

                                <li>• Business Quarterly: <strong>J$5,750</strong></li>

                            </ul>

                            <p className="mt-4 text-sm text-gray-600">

                                Subscription fees provide access to the Karema Kare Hub
                                network and platform services only. They do not guarantee
                                employment, service quality, or healthcare outcomes.

                            </p>

                        </div>

                    </CardContent>

                </Card>



                {/* Professionals */}

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <Stethoscope className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Terms for Healthcare Professionals

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            Healthcare professionals are responsible for maintaining valid
                            registration and licensing with the appropriate regulatory bodies
                            including the Medical Council of Jamaica, the Nursing Council of
                            Jamaica, and the Council for Professions Supplementary to Medicine,
                            where applicable.

                        </p>

                        <p className="mt-6 text-gray-700 leading-8">

                            Professionals agree that all information submitted through the
                            platform is truthful, accurate, and current. Any false
                            representation, expired credentials, or unethical conduct may
                            result in suspension or permanent removal from the platform.

                        </p>

                        <p className="mt-6 text-gray-700 leading-8">

                            Professionals are expected to uphold the ethical principles of
                            confidentiality, professionalism, accountability, compassion,
                            and respect for every client they serve.

                        </p>

                    </CardContent>

                </Card>



                {/* Privacy */}

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <Lock className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Privacy & Data Protection

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            Karema Kare Hub Limited processes personal and professional
                            information in accordance with Jamaica's Data Protection Act,
                            2020.

                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">

                            <div className="rounded-xl bg-slate-50 p-6">

                                <h3 className="font-semibold">

                                    We Collect Information To

                                </h3>

                                <ul className="mt-4 space-y-2 text-gray-600">

                                    <li>• Verify professional credentials</li>

                                    <li>• Match clients with professionals</li>

                                    <li>• Manage appointments</li>

                                    <li>• Process subscriptions</li>

                                    <li>• Improve platform services</li>

                                </ul>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-6">

                                <h3 className="font-semibold">

                                    Your Rights

                                </h3>

                                <ul className="mt-4 space-y-2 text-gray-600">

                                    <li>• Access your information</li>

                                    <li>• Correct inaccurate records</li>

                                    <li>• Request deletion ("Right to be Forgotten")</li>

                                    <li>• Object to certain processing</li>

                                    <li>• Receive breach notifications where required by law</li>

                                </ul>

                            </div>

                        </div>

                        <p className="mt-8 text-gray-700 leading-8">

                            Personal information is protected through secure storage,
                            encryption, and role-based access controls. Information will
                            only be disclosed where required by Jamaican law or with the
                            user's consent.

                        </p>

                    </CardContent>

                </Card>



                {/* Liability */}

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <ShieldCheck className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Limitation of Liability

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            Karema Kare Hub Limited serves solely as a technology platform
                            facilitating connections between healthcare professionals and
                            clients. The company is not the employer of healthcare workers
                            listed on the platform and is not responsible for the conduct,
                            performance, statements, negligence, omissions, or actions of
                            users.

                        </p>

                        <p className="mt-6 text-gray-700 leading-8">

                            Users remain individually responsible for exercising reasonable
                            judgment before entering into professional relationships through
                            the platform.

                        </p>

                    </CardContent>

                </Card>



                {/* Governing Law */}

                <Card>

                    <CardContent className="p-8">

                        <div className="flex items-center gap-3 mb-6">

                            <Scale className="text-emerald-600" />

                            <h2 className="text-2xl font-bold">

                                Governing Law

                            </h2>

                        </div>

                        <p className="text-gray-700 leading-8">

                            These Terms & Conditions shall be governed by the laws of
                            Jamaica. By continuing to use Karema Kare Hub, users agree to
                            comply with all applicable legal and ethical obligations relating
                            to healthcare practice and digital service delivery.

                        </p>

                    </CardContent>

                </Card>



                {/* Closing */}

                <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-10 text-center">

                    <h2 className="text-3xl font-bold">

                        Our Commitment

                    </h2>

                    <p className="mt-5 text-lg leading-8 max-w-4xl mx-auto text-emerald-100">

                        Karema Kare Hub Limited is committed to building a Christ-centered,
                        ethical, and trusted healthcare marketplace where compassion,
                        professionalism, integrity, and accountability remain the
                        foundation of every interaction between clients and healthcare
                        professionals.

                    </p>

                    <p className="mt-8 font-semibold">

                        Last Updated: August 2026

                    </p>

                </div>

            </section>

        </main>

    );

}