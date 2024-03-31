interface Props {
  cta: string
}
export default function Actions({ cta }: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <a
        href="#"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {cta}
      </a>
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
        Learn more <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}

