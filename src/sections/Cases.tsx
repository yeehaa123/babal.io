import CaseComponent from "../components/Case";
import type { Case } from "../components/Case"

interface Props {
  cases: Case[]
}

export default function Cases({ cases }: Props) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Work</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {cases.map((c, index) => (
            <CaseComponent key={index} {...c} />
          ))}
        </div>
      </div>
    </div>
  )
}

