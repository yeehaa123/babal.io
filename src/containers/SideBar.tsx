import { cn } from "@/lib/utils"
import { useAppState } from "@/stores/appState.ts";


export default function SideBar({ children }: { children: React.ReactNode }) {
  const { isSideBarOpen, userName } = useAppState();
  return (
    <div className={cn("lg:hidden", { "visible": isSideBarOpen, "hidden": !isSideBarOpen })} role="dialog" aria-modal="true">
      <h1>{userName}</h1>
      {children}
    </div>)
}
