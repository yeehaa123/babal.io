import { cn } from "@/lib/utils"
import { create } from 'zustand';

interface SideBarState {
  isSideBarOpen: boolean,
  toggleSideBar: () => void
}

export const useSideBar = create<SideBarState>()(set => ({
  isSideBarOpen: false,
  toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen }))
}));

export default function MenuButton({ children }: { children: React.ReactNode }) {
  const { isSideBarOpen } = useSideBar();
  return (
    <div className={cn("lg:hidden", { "visible": isSideBarOpen, "hidden": !isSideBarOpen })} role="dialog" aria-modal="true">
      {children}
    </div>)
}
