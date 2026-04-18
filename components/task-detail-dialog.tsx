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

export default function TaskDetailDialog({
  todo,
  open,
  onOpenChange,
}: {
  todo: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
    const [title, setTitle] = useState(todo?.title || "");
    const [description, setDescription] = useState(todo?.description || "");

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || "");
            setDescription(todo.description || "");
        }
    }, [todo]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form
                    action={async (formData) => {
                        try {
                            await updateTodo(
                                todo._id, 
                                { 
                                    title: formData.get("title") as string,
                                    description: formData.get("description") as string,
                                    priority: formData.get("priority") as string,
                                    dueDate: formData.get("dueDate") as Date
                                }
                            );
                        } catch (err) {

                        }
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Task Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={title}
                                defaultValue={todo?.description}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea
                                name="description"
                                defaultValue={todo?.description}
                            />
                        </div>

                        <div className="space-y-2  mb-4">
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
                                <input type="hidden" name="priority" value={priority} />
                            </Popover>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>

                        <Button>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}