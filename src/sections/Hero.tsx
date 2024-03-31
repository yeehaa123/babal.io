import Banner from "../components/Banner"
import Actions from "../components/Actions"
import type { CTA } from "../sections/CTA"


interface Props {
  tagline: string;
  byline: string;
  message?: string;
  cta: CTA;
}

export default function HeroSection({ tagline, byline, message, cta }: Props) {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <Banner message={message} />
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {tagline}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {byline}
            </p>
            <Actions action={cta.action} />
          </div>
        </div>
      </div>
    </div>
  )
}
