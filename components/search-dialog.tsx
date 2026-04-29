"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { searchTodos } from "@/lib/actions/todo";
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from "react-toastify";
import { Search } from 'lucide-react';
import { useRouter } from "next/navigation";

export function SearchDialog({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {

    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl p-4">

                {/* Hidden but accessible title */}
                <VisuallyHidden>
                    <DialogTitle>Search</DialogTitle>
                </VisuallyHidden>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);
                        const searchTerm = (formData.get("search") as string)?.trim();

                        if (!searchTerm) return;

                        // Close dialog
                        onOpenChange(false);

                        // navigate to search page
                        router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Search className="text-gray-400" />
                        <Input 
                            id="search" 
                            name="search" 
                            placeholder="Search for a task"
                            autoFocus 
                            className="border-0 focus-visible:ring-0 text-base"    
                        />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    ) 
}


