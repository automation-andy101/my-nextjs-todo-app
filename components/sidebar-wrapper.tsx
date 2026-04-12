"use client";

import { useState } from 'react';
import Sidebar from "./sidebar";

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const [sideNavOpen, setSideNavOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar
                sideNavOpen={sideNavOpen}
                setSideNavOpen={setSideNavOpen}
            />
            
            {/* Main Content */}
            <main className={`transition-all duration-300 ${sideNavOpen ? "ml-64" : "ml-0"}`}>
                {children}
            </main>
        </div>
    );
}
