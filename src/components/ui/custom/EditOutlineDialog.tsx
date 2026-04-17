import { Input } from "../input";
import { Textarea } from "../textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";


function EditOutlineDialog({ children, outlineData, onUpdate }: any) {
    const [localData, setLocalData] = useState(outlineData);
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (field: string, value: string) => {
        setLocalData((prevData: any) => ({
            ...prevData,
            [field]: value,
        }));

    }

    const handleUpdate = () => {
        onUpdate(outlineData?.slideNo, localData);
        setOpenDialog(false);
    }
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Slider Outline</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2">Slider Title</label>
                                <Input
                                    className="h-11 px-4 text-base"
                                    placeholder='Slider title'
                                    value={localData.slidePoint}
                                    onChange={(event) => handleChange('slidePoint', event.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Outline</label>
                                <Textarea
                                    className="min-h-32 px-4 py-3 text-base"
                                    placeholder='Outline'
                                    value={localData.outline}
                                    onChange={(event) => handleChange('outline', event.target.value)}
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'} size={'lg'}>Close</Button>
                    </DialogClose>
                    <Button size={'lg'} onClick={handleUpdate}>Update</Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditOutlineDialog