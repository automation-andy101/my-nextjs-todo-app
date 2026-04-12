import SidebarWrapper from "@/components/sidebar-wrapper";
import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/sign-in");
    }

    return <SidebarWrapper>{children}</SidebarWrapper>;
}
