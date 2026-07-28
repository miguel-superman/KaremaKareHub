export default function StatusBadge({ status }) {

    const colors = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
        approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
        rejected: "bg-red-100 text-red-700 border-red-200"
    };

    return (
        <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                colors[status] || "bg-gray-100 text-gray-700 border-gray-200"
            }`}
        >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
    );
}