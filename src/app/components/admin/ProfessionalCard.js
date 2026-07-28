export default function ProfessionalCard({ worker }) {

    const professional = worker.professional || {};

    return (

        <div className="bg-white rounded-2xl border shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Professional Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <Info
                    label="Profession"
                    value={professional.profession}
                />

                <Info
                    label="License Number"
                    value={professional.licenseNumber}
                />

                <Info
                    label="Current Employer"
                    value={professional.currentEmployer}
                />

                <Info
                    label="Experience"
                    value={
                        professional.experience
                            ? `${professional.experience} Years`
                            : "-"
                    }
                />

                <Info
                    label="Qualifications"
                    value={professional.qualifications}
                />

                <Info
                    label="Specialization"
                    value={professional.specialization}
                />

                <Info
                    label="Languages"
                    value={professional.languages}
                />

            </div>

            {professional.bio && (

                <div className="mt-8">

                    <p className="text-sm text-gray-500 mb-2">
                        Professional Bio
                    </p>

                    <p className="leading-7 text-gray-700">
                        {professional.bio}
                    </p>

                </div>

            )}

        </div>

    );

}

function Info({ label, value }) {

    return (

        <div>

            <p className="text-sm text-gray-500">
                {label}
            </p>

            <p className="font-medium mt-1">
                {value || "-"}
            </p>

        </div>

    );

}