"use client"

import { useState } from "react";
import { Button } from '@/components/ui/button';
import AddTaskDialog from '@/components/add-task-dialog';
import { CircleCheck, Circle, CirclePlus } from 'lucide-react';
import { updateTodo } from "@/lib/actions/todo";
import { useTransition } from "react";
import TaskDetailDialog from "./task-detail-dialog";


export default function UpcomingClient({ groupedTodos }: { groupedTodos: Record<string, any[]> }) {
    const [localTodos, setLocalTodos] = useState(groupedTodos);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const totalTasks = Object.values(localTodos).flat().length;

    function handleToggleComplete(todo: any) {
        setLocalTodos(prev => {
            const updated = { ...prev };

            for (const date in updated) {
                updated[date] = updated[date].map(t => 
                    t._id === todo._id
                        ? { ...t, completed: !t.completed }
                        : t
                )
            }

            return updated;
        })

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

    function formatDate(d: string) {
        return new Date(d).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    } 
     

    return (
        <div className="min-h-screen bg-white mt-6">
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-black">Upcoming</h1>

                    <div className="flex flex-row items-center gap-2 mt-4">
                        <CircleCheck className="w-4 h-4 text-gray-600" />
                        <p className="text-gray-600">{totalTasks} Tasks</p>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-6 mt-10">

                    {/* Tasks list */}
                    <div className="space-y-3">
                        {Object.entries(localTodos).map(([date, todos]) => (
                            <div key={date} className="mb-12">
                                {/* Date heading */}
                                <h2 className="text-xl font-semibold text-black mb-2">
                                    {formatDate(date)}
                                </h2>
                                
                                {/* Divider line */}
                                <div className="border-b-2 border-black mt-2 mb-6 w-[280%]"></div> 

                                <div className="space-y-3">
                                    {todos.map((todo: any) => (
                                        <div
                                            key={todo._id}
                                            onClick={() => handleDetailsOpen(todo)}
                                            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 rounded px-2 py-1"
                                        >
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
                                                    <CircleCheck className="w-6 h-6 text-green-500" />
                                                    ) : (
                                                    <Circle className="w-6 h-6 text-gray-400 group-hover:scale-110" />
                                                    )
                                                }
                                            </div>

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
                            const key = new Date(newTodo.dueDate).toDateString();

                            setLocalTodos(prev => ({
                                ...prev,
                                [key]: [newTodo, ...(prev[key] || [])]
                            }));
                        }}
                    />

                    <TaskDetailDialog
                        todo={selectedTodo}
                        open={isDetailsOpen}
                        onOpenChange={setIsDetailsOpen}
                        onUpdate={(updatedTodo) => {
                            setLocalTodos(prev => 
                                Object.fromEntries(
                                    Object.entries(prev).map(([date, todos]) => [
                                        date,
                                        todos.map(t =>
                                            t._id === updatedTodo._id ? updatedTodo : t
                                        )
                                    ])
                                )
                            )}
                        }
                    />
                </div>
            </div>
        </div>
    )
}