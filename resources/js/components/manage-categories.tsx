import { Category } from "@/types";
import React from "react";
import { Button } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Link } from "@inertiajs/react";

type Props = {
    categories: Category[];
};

const ManageCategories = ({ categories }: Props) => {
    return (
        <div className="my-4 space-y-4">
            <Button>Create Category</Button>
            <div>
                <ul className="flex">
                    {categories.map((category) => (
                        <li
                            className="border rounded-md px-3 py-4 space-y-2"
                            key={category.id}
                        >
                            <div>
                                <p className="text-xl">{category.name}</p>
                                <p>{category.description}</p>
                            </div>
                            <div className="space-x-2">
                                <Button>Edit</Button>
                                <AlertDialog>
                                    <Button variant="destructive" asChild>
                                        <AlertDialogTrigger>
                                            Delete
                                        </AlertDialogTrigger>
                                    </Button>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                this category from the database.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <Button
                                                asChild
                                                variant="destructive"
                                            >
                                                <AlertDialogAction asChild>
                                                    <Link
                                                        // href={route(
                                                        //     "services.destroy",
                                                        //     {
                                                        //         service: id,
                                                        //     }
                                                        // )}
                                                        href="#"
                                                        // method="delete"
                                                    >
                                                        Delete
                                                    </Link>
                                                </AlertDialogAction>
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageCategories;
