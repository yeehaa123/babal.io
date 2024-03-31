import type { Step } from "../components/Step";
import StepComponent from "../components/Step";

interface Props {
  problem: string;
  steps: Step[]
}

export default function PlanOutline({ steps, problem }: Props) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Ecosystem Architecture</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Grow your business, not your time size
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {problem}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <StepComponent key={step.name} {...step} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

