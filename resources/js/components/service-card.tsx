import { Star, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Service } from "@/types";
import { Link, usePage } from "@inertiajs/react";
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
} from "@/components/ui/alert-dialog";

export default function ServiceCard({
    images,
    user,
    description,
    price,
    category,
    rating,
    review_count,
    name,
    id,
}: Service) {
    const currentUser = usePage().props.auth.user;

    const truncatedDescription =
        description.length > 100
            ? `${description.substring(0, 97)}...`
            : description;

    return (
        <Card className="w-full max-w-sm overflow-hidden">
            <Link href={route("services.show", { service: id })}>
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                        <img
                            src={images?.length > 0 ? images[0] : ""}
                            alt={name}
                            className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover w-full h-full"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                            {user.first_name} {user.middle_name}{" "}
                            {user.last_name}
                        </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        {truncatedDescription}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg">₱{price}</span>
                        <Badge variant="secondary">{category.name}</Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${
                                    i < Math.floor(rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                            {rating}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                            ({review_count} reviews)
                        </span>
                    </div>
                </CardContent>
            </Link>
            {currentUser.id === user.id ||
                (currentUser.role === "admin" && (
                    <CardFooter className="p-4 space-x-4">
                        <Button asChild>
                            <Link
                                href={route("services.edit", { service: id })}
                            >
                                Edit
                            </Link>
                        </Button>

                        <AlertDialog>
                            <Button variant="destructive" asChild>
                                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                            </Button>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this service from the
                                        database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button asChild variant="destructive">
                                        <AlertDialogAction asChild>
                                            <Link
                                                href={route(
                                                    "services.destroy",
                                                    {
                                                        service: id,
                                                    }
                                                )}
                                                method="delete"
                                            >
                                                Delete
                                            </Link>
                                        </AlertDialogAction>
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                ))}
        </Card>
    );
}
