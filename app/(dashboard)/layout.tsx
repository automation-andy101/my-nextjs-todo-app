import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}