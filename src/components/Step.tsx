import { LockClosedIcon } from '@heroicons/react/20/solid'

export type Step = {
  name: string;
  description: string;
}

export default function PlanOutline({ name, description }: Step) {
  const href = '#';
  const Icon = LockClosedIcon;
  return (
    <div key={name} className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
        <Icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
        {name}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <p className="flex-auto">{description}</p>
        <p className="mt-6">
          <a href={href} className="text-sm font-semibold leading-6 text-indigo-600">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </p>
      </dd>
    </div>
  )
}

