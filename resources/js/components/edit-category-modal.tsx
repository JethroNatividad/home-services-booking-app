import { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { Textarea } from "./ui/textarea";
import { Category } from "@/types";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
};

const EditCategoryModal = ({ isOpen, onClose, category }: Props) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: category.name,
        description: category.description,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id), {
            onFinish: () => {
                toast("Category Updated");
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="w-full space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <label
                                htmlFor="description"
                                className="block text-sm"
                            >
                                Description
                            </label>

                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder=""
                                className="w-full"
                                rows={4}
                            />
                            {errors.description && (
                                <div className="text-red-500 text-sm">
                                    {errors.description}
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Edit</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategoryModal;
