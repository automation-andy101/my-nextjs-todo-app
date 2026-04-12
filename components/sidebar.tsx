"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ListTodo, Calendar as CalendarIcon, Search, CirclePlus, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function Sidebar({ 
    sideNavOpen, 
    setSideNavOpen }: { 
        sideNavOpen: boolean;  
        setSideNavOpen: (value: boolean) => void;
}) {

    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [dueDate, setDueDate] = useState<Date | undefined>();
    const [priority, setPriority] = useState(4);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);

    const priorities = [
        { value: 1, label: "Priority 1", color: "text-red-500" },
        { value: 2, label: "Priority 2", color: "text-orange-500" },
        { value: 3, label: "Priority 3", color: "text-blue-500" },
        { value: 4, label: "Priority 4", color: "text-gray-500" },
    ];

    const selectedPriority = priorities.find((p) => p.value === priority);

    const pathname = usePathname();

    const baseItemClass = "flex items-center gap-2 px-2 py-2 rounded-md text-sm";

    const linkClass = (path: string) =>
        `${baseItemClass} ${
            pathname === path
                ? "font-semibold bg-gray-100"
                : "text-gray-600 hover:bg-gray-100"
        }`;

    const { data: session } = useSession();

    const firstName = session?.user?.name?.split(" ")[0];

    return (
        <>
            <aside
                className={`fixed top-0 left-0 h-screen w-64 border-r bg-white p-4 transition-transform duration-300 ${
                    sideNavOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            > 
                <nav className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between pt-3 mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center gap-3 justify-start px-2 py-2 cursor-pointer"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-white">
                                            {session?.user?.name?.[0]?.toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col text-left">
                                        <span className="text-sm font-medium">
                                            {firstName}
                                        </span>
                                        {/* <span className="text-xs text-muted-foreground">
                                            {session?.user?.email}
                                        </span> */}
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <SignOutButton />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* <Button
                            variant="ghost" 
                            size="lg"
                            className="cursor-pointer"
                            onClick={() => setSideNavOpen(!sideNavOpen)}
                        >
                            <PanelLeft />                    
                        </Button> */}
                    </div>
                    
                    <Button 
                        variant="ghost"
                        onClick={() => setIsAddTaskOpen(true)}
                        className={`${baseItemClass} text-red-500 font-semibold justify-start w-full`}    
                    >
                        <CirclePlus size={18} />
                        <span>Add task</span>
                    </Button>
                    <Link href="/today" className={`${baseItemClass} ${linkClass("/today")}`}>
                        <ListTodo size={18} />
                        <span>Today</span>
                    </Link>
                    <Link href="/upcoming" className={`${baseItemClass} ${linkClass("/upcoming")}`}>
                        <CalendarIcon size={18} />
                        <span>Upcoming</span>
                    </Link>
                    <Link href="/search" className={`${baseItemClass} ${linkClass("/search")}`}>
                        <Search size={18} />
                        <span>Search</span>
                    </Link>
                </nav>

                { /* Add Todo dialog popup */ }
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Task</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Task title" autoFocus />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Add details..." className="resize-none" />
                        </div>
                        <div className="space-y-2">
                            <Label>Due date</Label>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        {dueDate
                                            ? dueDate.toDateString()
                                            : "Select a due date"
                                        }
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={(date) => {
                                            if (date) setDueDate(date);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Priority</Label>

                            <Popover open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 ${selectedPriority?.color}`}
                                    >
                                        {selectedPriority?.label}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-48 p-1">
                                    <div className="flex flex-col">
                                        {priorities.map((p) => (
                                            <button
                                                key={p.value}
                                                onClick={() => {
                                                    setPriority(p.value)
                                                    setIsPriorityOpen(false)
                                                }}
                                                className={`flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 ${p.color}`}
                                            >
                                                <span>{p.label}</span>

                                                {priority === p.value && (
                                                    <span className="text-xs">✓</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <DialogFooter>
                            <Button className="cursor-pointer" variant="ghost" onClick={() => setIsAddTaskOpen(false)}>
                                Cancel
                            </Button>
                            <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                                Add Task
                            </Button>
                        </DialogFooter>
                    </DialogContent>  
                </Dialog>
            </aside>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setSideNavOpen(!sideNavOpen)}
                className={`fixed top-4 left-4 z-50 cursor-pointer transition-all duration-300 ${
                    sideNavOpen ? "left-54" : "left-0"
                }`}
            >
                <PanelLeft />
            </Button>
        </>
    );
}