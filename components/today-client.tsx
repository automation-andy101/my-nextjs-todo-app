"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button';
import AddTaskDialog from '@/components/add-task-dialog';
import { CircleCheck, Circle, CirclePlus } from 'lucide-react';

export default function TodayClient({ todos }: { todos: any[] }) {
    
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="min-h-screen bg-white mt-6">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Today</h1>

                    <div className="flex flex-row items-center gap-2 mt-4">
                        <CircleCheck className="w-4 h-4 text-gray-600" />
                        <p className="text-gray-600">{todos.length} Tasks</p>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-6 mt-10">
                    <h2 className="text-xl font-semibold text-black">
                        {today}
                    </h2>

                    {/* Divider line */}
                    <div className="border-b-2 border-black mt-2 mb-6 w-[280%]"></div>

                    {/* Tasks list */}
                    <div className="space-y-3">
                        {todos.map((todo: any) => (
                        <div
                            key={todo._id}
                            className="flex items-center gap-3 cursor-pointer group"
                        >

                            {/* Animated Circle */}
                            <div className="w-6 h-6 flex items-center justify-center">
                                {todo.completed ? (
                                    <CircleCheck className="w-6 h-6 text-green-500 transition-all duration-300 scale-100" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:scale-110" />
                                )}
                            </div>

                            {/* Task text */}
                            <p
                                className={`transition-all duration-300 ${
                                    todo.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-700"
                                }`}
                                >
                                {todo.title}
                            </p>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <Button 
                        variant="ghost"
                        onClick={() => setIsAddTaskOpen(true)}
                        className="text-red-500 font-semibold justify-start w-full cursor-pointer"    
                    >
                        <CirclePlus size={18} />
                        <span>Add task</span>
                    </Button>

                    <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
                </div>
            </div>
        </div>
    )
}