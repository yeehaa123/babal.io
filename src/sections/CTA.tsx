import Actions from "../components/Actions"

interface Props {
  cta: string;
}
export default function CTA({ cta }: Props) {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Don't ride the waves
            <br />
            Dive into the right one
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
            commodo do ea.
          </p>
          <Actions cta={cta} />
        </div>
      </div>
    </div>
  )
}

