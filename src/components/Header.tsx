import { useState } from 'react'
import NavBar from "../components/NavBar"
import type { NavItem } from "../components/NavBar"
import SideBar from "../components/SideBar"

interface Props {
  navigation: NavItem[];
}

export default function Header({ navigation }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <NavBar navigation={navigation} setMobileMenuOpen={setMobileMenuOpen} />
      <SideBar navigation={navigation} mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen} />
    </header>
  )
}
