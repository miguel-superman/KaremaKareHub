import StepIndicator from "./StepIndicator";
import { HeartPulse } from "lucide-react";

export default function ProgressHeader({ step }) {
  return (
    <>

      <div className="flex justify-center">

        <div className="bg-emerald-500 rounded-2xl p-4 text-white shadow">

          <HeartPulse size={30} />

        </div>

      </div>

      <h1 className="text-4xl font-bold text-center mt-6">
        Healthcare Worker Application
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Step {step} of 5
      </p>

      <StepIndicator current={step} />

    </>
  );
}