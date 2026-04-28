import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { searchTodos } from "@/lib/actions/todo";
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from "react-toastify";
import { Search } from 'lucide-react';

export function SearchDialog({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl p-4">
                <form
                    action={async (formData) => {
                        try {
                            const searchTerm = formData.get("search") as string;

                            const todos = await searchTodos(searchTerm);

                            onOpenChange(false);
                        } catch (err) {
                            toast.error("Search failure ❌");
                        }
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


