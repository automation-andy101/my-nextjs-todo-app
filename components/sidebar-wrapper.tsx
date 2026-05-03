"use client";

import { useState } from 'react';
import Sidebar from "./sidebar";
import { Button } from './ui/button';
import { Menu, PanelLeft } from 'lucide-react';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
    const [sideNavOpen, setSideNavOpen] = useState(true);

    return (
        <div className="flex min-h-screen">

            {/* Hamburger (mobile only) */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setSideNavOpen(true)}
                className={`fixed top-4 left-4 z-50 md:hidden ${sideNavOpen ? "hidden" : ""}`}
            >
                <Menu className="w-6 h-6" />
                
            </Button>
            
            {/* Sidebar */}
            <Sidebar
                sideNavOpen={sideNavOpen}
                setSideNavOpen={setSideNavOpen}
            />
            
            {/* Main Content */}
            <main className='w-full'>
                {children}
            </main>
        </div>
    );
}
