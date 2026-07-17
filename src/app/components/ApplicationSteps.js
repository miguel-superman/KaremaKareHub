const steps = [
  "Account",
  "Personal",
  "Professional",
  "Rate",
  "Documents",
];

export default function ApplicationSteps() {
  return (
    <div className="mt-12">

      <div className="h-2 bg-gray-200 rounded-full">

        <div className="bg-emerald-500 h-2 rounded-full w-1/5" />

      </div>

      <div className="flex justify-between mt-6">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex flex-col items-center"
          >

            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                index === 0
                  ? "border-emerald-500 text-emerald-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`text-sm mt-2 ${
                index === 0
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>

          </div>

        ))}
      </div>

    </div>
  );
}