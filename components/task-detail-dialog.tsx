"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { updateTodo } from "@/lib/actions/todo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from './ui/calendar';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Circle, CircleCheck } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function TaskDetailDialog({
  todo,
  open,
  onOpenChange,
  onUpdate
}: {
  todo: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedTodo: any) => void
}) {

    // if (!open || !todo) return null;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(todo?.completed);
    const [dueDate, setDueDate] = useState<Date | undefined>(
        todo?.dueDate ? new Date(todo.dueDate) : undefined
    );
    const [priority, setPriority] = useState(todo?.priority);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const priorities = [
        { value: 1, label: "Priority 1", color: "text-red-500" },
        { value: 2, label: "Priority 2", color: "text-orange-500" },
        { value: 3, label: "Priority 3", color: "text-blue-500" },
        { value: 4, label: "Priority 4", color: "text-gray-500" },
    ];

    const selectedPriority =
        priorities.find((p) => p.value === priority) ??
        priorities[3];

    useEffect(() => {
        if (open && todo) {
            setTitle(todo.title || "");
            setDescription(todo.description || "");
            setPriority(todo.priority);
            setDueDate(todo.dueDate ? new Date(todo.dueDate) : undefined);
            setCompleted(todo.completed);
        }
    }, [open, todo]);

    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                {!todo ? null : (
                    <form
                        action={async (formData) => {
                            try {
                                const updated = await updateTodo(todo._id, {
                                    // title: (formData.get("title") as string) || "",
                                    title,
                                    // description: (formData.get("description") as string) || "",
                                    description,
                                    priority,
                                    dueDate: dueDate ? dueDate.toISOString() : undefined,
                                    completed
                                });
                                
                                onUpdate(updated);

                                toast.success("Task updated");
                                onOpenChange(false);
                                router.refresh();

                            } catch (err) {
                                toast.success("Failed to update task");
                            }
                            
                        }}
                    >
                        <DialogHeader>
                            <VisuallyHidden>
                                <DialogTitle>Task Details</DialogTitle>
                            </VisuallyHidden>
                        </DialogHeader>

                        <div className="flex items-center gap-3 mb-4">
                            <button
                                type="button"
                                onClick={() => setCompleted(!completed)}
                                className="flex items-center gap-2  cursor-pointer"
                            >
                                {completed ? (
                                    <CircleCheck className="w-6 h-6 text-green-500" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-600">
                                    {completed ? "Completed" : "Incomplete"}
                                </span>
                            </button>
                        </div>

                        <div className="space-y-4 mb-4">
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 mb-4">
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2 mb-4">
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
                                                type="button"
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

                        <div className="space-y-2 mb-4">
                            <Label>Due date</Label>

                            <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
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
                                            if (date) {
                                                setDueDate(date);
                                                setIsDateOpen(false);
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                                
                            </Popover>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => onOpenChange(false)}
                                className="cursor-pointer"
                            >
                                Close
                            </Button>

                            <Button
                                type="submit"
                                className="cursor-pointer"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}