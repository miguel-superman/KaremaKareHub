export default function ProfileCard({ worker }) {

    return (

        <div className="bg-white rounded-2xl shadow border p-6">

            <h2 className="text-xl font-semibold mb-6">
                Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Info label="Email" value={worker.account?.email} />
                <Info label="Phone" value={worker.personal?.phone} />
                <Info label="Gender" value={worker.personal?.gender} />
                <Info label="Date of Birth" value={worker.personal?.dob} />
                <Info label="City" value={worker.personal?.city} />
                <Info label="Parish" value={worker.personal?.parish} />

            </div>

        </div>

    );

}

function Info({ label, value }) {

    return (

        <div>

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="font-medium">
                {value || "-"}
            </p>

        </div>

    );

}