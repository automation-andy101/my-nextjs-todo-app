"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ListTodo, Calendar as CalendarIcon, Search, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function Sidebar() {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const pathname = usePathname();

    const baseItemClass = "flex items-center gap-2 px-2 py-2 rounded-md text-sm";

    const linkClass = (path: string) =>
        `${baseItemClass} ${
            pathname === path
                ? "font-semibold bg-gray-100"
                : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <aside className="w-64 h-screen border-r p-4">
            <nav className="flex flex-col gap-4">
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
                                    onSelect={setDueDate}
                                    initialFocus
                                />
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
    );
}