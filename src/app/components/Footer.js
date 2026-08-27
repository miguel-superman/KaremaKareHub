import {React } from "react";

export default function Footer(){


    return(
        <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 mt-20">
    <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

            {/* Brand */}
            <div>

                <h2 className="text-2xl font-bold text-white">

                    Karema Kare Hub

                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-400">

                    Connecting verified healthcare professionals with
                    clients seeking trusted, compassionate care across Jamaica.

                </p>

            </div>

            {/* Platform */}
            <div>

                <h3 className="font-semibold text-white mb-4">

                    Platform

                </h3>

                <ul className="space-y-3 text-sm">

                    <li>
                        <a
                            href="/apply"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Apply as a Worker
                        </a>
                    </li>

                    <li>
                        <a
                            href="/login"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Worker Login
                        </a>
                    </li>

                    {/* <li>
                        <a
                            href="/news"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            News
                        </a>
                    </li>

                    <li>
                        <a
                            href="/vlogs"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Care Vlogs
                        </a>
                    </li> */}

                </ul>

            </div>

            {/* Support */}
            <div>

                <h3 className="font-semibold text-white mb-4">

                    Support

                </h3>

                <ul className="space-y-3 text-sm">

                    <li>
                        <a
                            href="/faq"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Frequently Asked Questions
                        </a>
                    </li>

                    <li>
                        <a
                            href="/privacy"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Privacy Policy
                        </a>
                    </li>

                    <li>
                        <a
                            href="/terms"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Terms & Conditions
                        </a>
                    </li>

                    <li>
                        <a
                            href="/contact"
                            className="hover:text-emerald-400 transition-colors"
                        >
                            Contact Us
                        </a>
                    </li>

                </ul>

            </div>

            {/* Contact */}
            <div>

                <h3 className="font-semibold text-white mb-4">

                    Contact

                </h3>

                <div className="space-y-3 text-sm">

                    <p>
                        📧 karemababysitters@gmail.com
                    </p>

                    {/* <p>
                        📞 +1 (876) 
                    </p> */}

                    <p>
                        Kingston, Jamaica
                    </p>

                    <div className="flex gap-3 pt-3">

                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center"
                        >
                            in
                        </a>

                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 transition flex items-center justify-center"
                        >
                            ▶
                        </a>

                    </div>

                </div>

            </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">

            <p>

                © {new Date().getFullYear()} Karema Baby Sitters. All rights reserved.

            </p>

            <p className="mt-3 md:mt-0">

                Empowering verified healthcare professionals through trusted digital care.

            </p>

        </div>

    </div>

</footer>
    )
}