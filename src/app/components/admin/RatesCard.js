export default function RatesCard({ worker }) {

    const rates = worker.rates || {};

    const formatMoney = (amount) => {

        if (!amount) return "-";

        return new Intl.NumberFormat("en-JM", {
            style: "currency",
            currency: "JMD",
            maximumFractionDigits: 0
        }).format(amount);

    };

    return (

        <div className="bg-white rounded-2xl border shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Rates

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                <Rate
                    title="Hourly"
                    value={formatMoney(rates.hourlyRate)}
                />

                <Rate
                    title="Home Visit"
                    value={formatMoney(rates.homeVisitRate)}
                />

                <Rate
                    title="Overnight Rate"
                    value={formatMoney(rates.overnightRate)}
                />

                <Rate
                    title="Travel Fee"
                    value={formatMoney(rates.travelFee)}
                />

                {/* <Rate
                    title="Emergency"
                    value={formatMoney(rates.emergency)}
                /> */}

            </div>

        </div>

    );

}

function Rate({ title, value }) {

    return (

        <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-gray-500 text-sm">
                {title}
            </p>

            <p className="text-lg font-bold mt-2">
                {value}
            </p>

        </div>

    );

}