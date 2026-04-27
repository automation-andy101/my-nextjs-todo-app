import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function SearchDialog({
    open,
    onOpenChange
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                
            </DialogContent>
        </Dialog>
    ) 
}


