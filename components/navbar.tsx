"use client"

import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {
    const {data: session } = useSession();

    if (session?.user) return null;
    
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container items-center mx-auto flex h-18 px-4 justify-between">
                <Link href="/" className="flex items-center space-x-2 gap-2 text-xl font-semibold text-primary">
                    <CheckSquare />
                    Todo App
                </Link>
                <div className="flex items-center gap-8">
                    {session?.user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="ghost"
                                        className="rounded-full cursor-pointer"
                                        size="icon"  
                                    >
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback className="bg-primary text-white">
                                                {session.user.name[0].toLocaleUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p
                                                className="text-sm font-medium leading-none"
                                            >
                                                {session.user.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <SignOutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
