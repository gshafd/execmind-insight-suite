import { ReactNode } from "react";
import { TopNavigation } from "./TopNavigation";
import { SidePanel } from "./SidePanel";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero font-executive">
      <TopNavigation />
      <div className="flex">
        <SidePanel />
        <main className="flex-1 p-6 ml-80">
          {children}
        </main>
      </div>
    </div>
  );
};