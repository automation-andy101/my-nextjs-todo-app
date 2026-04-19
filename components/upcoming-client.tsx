"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button';
import AddTaskDialog from '@/components/add-task-dialog';
import { CircleCheck, Circle, CirclePlus } from 'lucide-react';
import { updateTodo } from "@/lib/actions/todo";
import { useTransition } from "react";
import TaskDetailDialog from "./task-detail-dialog";

export default function UpcomingClient({ todos }: { todos: any[] }) {
    const [localTodos, setLocalTodos] = useState(todos);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleToggleComplete(todo: any) {
        // optimistic update
        setLocalTodos((prev) =>
            prev.map((t) =>
                t._id === todo._id
                    ? { ...t, completed: !t.completed }
                    : t
            )
        );

        startTransition(() => {
            updateTodo(
                todo._id, { completed: !todo.completed }
            );
        });
    }

    const handleDetailsOpen = (todo: any) => {
        setSelectedTodo(todo);
        requestAnimationFrame(() => {
            setIsDetailsOpen(true);
        });
    };

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
                        {localTodos.map((todo: any) => (
                        <div
                            key={todo._id}
                            onClick={() => (handleDetailsOpen(todo))}
                            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded px-2 py-1"
                        >

                            {/* Animated Circle */}
                            <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleComplete(todo);
                                }}
                                className={`w-6 h-6 flex items-center justify-center ${
                                    isPending ? "opacity-50 pointer-events-none" : "cursor-pointer"
                                }`}
                            >
                                {todo.completed ? (
                                    <CircleCheck className="w-6 h-6 text-green-500 transition-all duration-300 scale-100" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:scale-110" />
                                )}
                            </div>

                            {/* Task text */}
                            <p
                                className={`transition-all duration-300 cursor-pointer ${
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

                    <AddTaskDialog 
                        open={isAddTaskOpen} 
                        onOpenChange={setIsAddTaskOpen}
                        onUpdate={(newTodo) => {
                            setLocalTodos(prev => [newTodo, ...prev])
                        }}
                    />

                    <TaskDetailDialog
                        todo={selectedTodo}
                        open={isDetailsOpen}
                        onOpenChange={setIsDetailsOpen}
                        onUpdate={(updatedTodo) => {
                            setLocalTodos(prev =>
                                prev.map(t => t._id === updatedTodo._id ? updatedTodo : t)
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    )
}