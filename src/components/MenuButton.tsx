import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'

interface Props {
  setMobileMenuOpen: (b: boolean) => void;
  mobileMenuOpen: boolean;
}
export default function MenuButton({ setMobileMenuOpen, mobileMenuOpen }: Props) {
  return (
    <button
      type="button"
      className="-m-2.5 rounded-md p-2.5 text-gray-700"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      <span className="sr-only">{mobileMenuOpen ? "Close Menu" : "Open Menu"}</span>
      {mobileMenuOpen ?
        <XMarkIcon className="h-6 w-6" aria-hidden="true" /> :
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      }
    </button>
  )
}
