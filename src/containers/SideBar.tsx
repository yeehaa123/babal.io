import { cn } from "@/lib/utils"
import { $appState } from "@/stores/appState";
import { useStore } from "@nanostores/react";

export default function SideBar({ children }: { children: React.ReactNode }) {
  const { isSideBarOpen } = useStore($appState);
  return (
    <div className={cn("lg:hidden", { "visible": isSideBarOpen, "hidden": !isSideBarOpen })} role="dialog" aria-modal="true">
      {children}
    </div>)
}
