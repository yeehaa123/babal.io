import Actions from "../components/Actions"

export type CTA = {
  title: string,
  description: string;
  action: string;
}

export default function CTA({ title, description, action }: CTA) {
  const displayTitle = title.split(".");
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {displayTitle[0]}<br />{displayTitle[1]}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            {description}
          </p>
          <Actions action={action} />
        </div>
      </div>
    </div>
  )
}

