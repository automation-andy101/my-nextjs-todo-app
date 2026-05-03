"use client"

import { Fragment, useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import AddTaskDialog from '@/components/add-task-dialog';
import { CircleCheck, Circle, CirclePlus } from 'lucide-react';
import { updateTodo } from "@/lib/actions/todo";
import { useTransition } from "react";
import TaskDetailDialog from "./task-detail-dialog";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { formatDate, formatDateLocal, getStartOfWeek } from "@/lib/utils/date";

export default function SearchClient({ groupedTodos, searchTerm }: { 
    groupedTodos: Record<string, any[]>;
    searchTerm: string;
}) {
    const [localTodos, setLocalTodos] = useState(groupedTodos);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedAddDate, setSelectedAddDate] = useState<Date | null>(null);

    const searchParams = useSearchParams();
    const startParam = searchParams.get("start");

    const currentDate = useMemo(() => {
        return startParam
            ? new Date(startParam + "T00:00:00")
            : new Date();
    }, [startParam]);

    const startDate = useMemo(() => {
        return getStartOfWeek(currentDate);
    }, [currentDate]);

    const days = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i);
            
            return d;
        });
    }, [startDate]);
    
    const router = useRouter();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        function scheduleRefresh() {
            const now = new Date();

            const msUntilMidnight =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() + 1
                ).getTime() - now.getTime();

            timer = setTimeout(() => {
                router.refresh();
                scheduleRefresh(); 
            }, msUntilMidnight);
        }

        scheduleRefresh();

        return () => clearTimeout(timer);
    }, [router]);
    
    useEffect(() => {
        setLocalTodos(groupedTodos);
    }, [groupedTodos]);

    function isToday(dateStr: string) {
        const today = new Date();
        const d = new Date(dateStr);

        return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        );
    }

    function handleToggleComplete(todo: any) {
        const newCompleted = !todo.completed;

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
            updateTodo(todo._id, { completed: newCompleted });
        });
    }

    const handleDetailsOpen = (todo: any) => {
        setSelectedTodo(todo);
        requestAnimationFrame(() => {
            setIsDetailsOpen(true);
        });
    };

    const isCurrentWeek = useMemo(() => {
        const today = new Date();
        const startOfCurrentWeek = getStartOfWeek(today);

        return startOfCurrentWeek.toDateString() === startDate.toDateString();
    }, [startDate])
     
    return (
        <div className="min-h-screen bg-white pt-14 md:pt-6 mt-4 sm:mt-2">
            <div className="w-full px-4 sm:px-6">
                <div className="w-full max-w-3xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-black mb-6">Results for "{searchTerm}"</h1>

                        <div className="flex flex-col gap-3 mb-6">
                        </div>
                    </div>

                    {/* Date */}
                    <div className="mb-6 mt-6">

                        {/* Tasks list */}
                        <div className="space-y-3">
                            {Object.entries(localTodos)
                                .filter(([date]) => !isToday(date))
                                .map(([date, todos]) => (
                                    <Fragment key={date}>
                                        <div className="mb-4">
                                            {/* Date heading */}
                                            <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                                {formatDate(date)}
                                            </h2>
                                            
                                            {/* Divider line */}
                                            <div className="border-b-2 border-black mt-2 mb-6 w-full"></div> 

                                            <div className="space-y-3">
                                                {todos.map((todo: any) => (
                                                    <Fragment key={todo._id}>
                                                        <div
                                                            onClick={() => handleDetailsOpen(todo)}
                                                            className="flex items-center gap-4 py-3 px-2 cursor-pointer group hover:bg-gray-50 rounded"
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
                                                    </Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost"
                                            onClick={() => {
                                                setSelectedAddDate(new Date(date));
                                                setIsAddTaskOpen(true);
                                            }}
                                            className="text-red-500 font-semibold justify-start w-full cursor-pointer mb-8"    
                                        >
                                            <CirclePlus size={18} />
                                            <span>Add task</span>
                                        </Button>
                                    </Fragment>
                            ))} 
                        </div>
                    </div>

                    <div className="mb-6">
                        <AddTaskDialog 
                            open={isAddTaskOpen} 
                            onOpenChange={setIsAddTaskOpen}
                            defaultDate={selectedAddDate}
                            onUpdate={(newTodo) => {
                                const key = new Date(newTodo.dueDate).toISOString().split("T")[0];

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
        </div>
    )
}

