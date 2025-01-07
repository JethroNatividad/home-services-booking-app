import { FormEventHandler, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { format } from "date-fns";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import StaticMap from "@/components/static-map";
import { Service } from "@/types";
import { Textarea } from "./ui/textarea";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateCategoryModal = ({ isOpen, onClose }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        // post(route("categories.store"), {
        //     onFinish: () => {
        //         toast("Category Created");
        //         reset();
        //         onClose();
        //     },
        // });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
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
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateCategoryModal;
