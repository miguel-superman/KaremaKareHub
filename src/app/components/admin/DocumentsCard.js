"use client";

import {
    Eye,
    Download,
    ShieldCheck,
    ShieldX
} from "lucide-react";

export default function DocumentsCard({ worker }) {

    const documents = worker.documents || {};

    return (

        <div className="bg-white rounded-2xl border shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Uploaded Documents

            </h2>

            <div className="space-y-4">

                <DocumentRow
                    title="Government ID"
                    file={documents.governmentId}
                />

                <DocumentRow
                    title="Professional License"
                    file={documents.professionalLicense}
                />

                <DocumentRow
                    title="Qualifications"
                    file={documents.qualifications}
                />

                <DocumentRow
                    title="Police Record"
                    file={documents.policeRecord}
                />

                <DocumentRow
                    title="CPR / First Aid"
                    file={documents.firstAid}
                />

            </div>

        </div>

    );

}

function DocumentRow({ title, file }) {

    const exists = !!file;

    return (

        <div className="border rounded-xl p-5 flex justify-between items-center">

            <div>

                <h3 className="font-semibold">
                    {title}
                </h3>

                <p className="text-sm text-gray-500">

                    {exists ? "Uploaded" : "Not Uploaded"}

                </p>

            </div>

            {exists ? (

                <div className="flex gap-2">

                    <a
                        href={file}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                    >
                        <Eye size={18}/>
                    </a>

                    <a
                        href={file}
                        download
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                    >
                        <Download size={18}/>
                    </a>

                    <button
                        className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
                    >
                        <ShieldCheck size={18}/>
                    </button>

                    <button
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                    >
                        <ShieldX size={18}/>
                    </button>

                </div>

            ) : (

                <span className="text-red-500 text-sm">

                    Missing

                </span>

            )}

        </div>

    );

}