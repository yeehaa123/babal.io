import Logo from "./Logo";
import MenuButton from "./MenuButton"

export type NavItem = {
  name: string;
  href: string;
}

interface Props {
  navigation: NavItem[];
  setMobileMenuOpen: (b: boolean) => void;
  mobileMenuOpen: boolean;
}

export default function NavBar({ navigation, setMobileMenuOpen, mobileMenuOpen }: Props) {
  return (
    <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <Logo />
      </div>
      <div className="flex lg:hidden">
        <MenuButton setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
            {item.name}
          </a>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  )
}
