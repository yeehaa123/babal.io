import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Example({ children }) {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        {children}
      </div>
    </div>
  )
}
