import StatusBadge from "./StatusBadge";

export default function WorkerHeader({ worker }) {

    return (

        <div className="bg-white rounded-2xl shadow border p-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">
                        {worker.personal?.firstName} {worker.personal?.lastName}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {worker.professional?.profession}
                    </p>

                </div>

                <StatusBadge
                    status={worker.verification?.status}
                />

            </div>

        </div>

    );

}