"use client"

import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container items-center mx-auto flex h-18 px-4 justify-between">
                <Link href="/" className="flex items-center space-x-2 gap-2 text-xl font-semibold text-primary">
                    <CheckSquare />
                    Todoable
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/sign-in">
                        <Button
                            className="cursor-pointer"
                            variant="ghost" 
                            size="lg"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button 
                            className="bg-primary hover:bg-primary/90 cursor-pointer"
                            size="lg"
                        >
                            Start for free
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
