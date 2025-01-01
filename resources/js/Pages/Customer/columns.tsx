import { RescheduleModal } from "@/components/reschedule-modal";
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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, LucideMoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import StaticMap from "@/components/static-map";

const ActionsCell = ({ row }: { row: Row<Booking> }) => {
    const [rescheduleOpen, setRescheduleOpen] = useState(false);

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <LucideMoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    {row.original.status === "pending" && (
                        <>
                            <DropdownMenuItem
                                onClick={() => setRescheduleOpen(true)}
                            >
                                Reschedule
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </>
                    )}

                    {row.original.status === "rescheduled" && (
                        <>
                            <DropdownMenuItem>
                                <Link
                                    method="post"
                                    href={route(
                                        "bookings.approve",
                                        row.original.id
                                    )}
                                >
                                    Approve
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setRescheduleOpen(true)}
                            >
                                Reschedule
                            </DropdownMenuItem>
                        </>
                    )}

                    {row.original.status === "active" && (
                        <>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </>
                    )}

                    {row.original.status === "completed" &&
                        !row.original.rating && (
                            <DropdownMenuItem>
                                <Link
                                    href={route(
                                        "reviews.create",
                                        row.original.id
                                    )}
                                >
                                    Rate
                                </Link>
                            </DropdownMenuItem>
                        )}

                    {row.original.status === "completed" &&
                        row.original.rating && (
                            <DropdownMenuItem>
                                <Link
                                    href={route(
                                        "reviews.edit",
                                        row.original.rating?.id
                                    )}
                                >
                                    Edit Rating
                                </Link>
                            </DropdownMenuItem>
                        )}
                </DropdownMenuContent>
            </DropdownMenu>
            <RescheduleModal
                isOpen={rescheduleOpen}
                onClose={() => setRescheduleOpen(false)}
                booking={row.original}
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to
                        cancel this booking?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>No</AlertDialogCancel>
                    <Button onClick={() => false} variant="destructive" asChild>
                        <AlertDialogAction asChild>
                            <Link
                                method="post"
                                href={route("bookings.cancel", row.original.id)}
                            >
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const UserCell = ({ row }: { row: Row<Booking> }) => {
    const currentUser = usePage().props.auth.user;
    return (
        <Dialog>
            <DialogTrigger>
                <p className="underline text-blue-500">
                    {row.original.service.user.first_name}{" "}
                    {row.original.service.user.middle_name}{" "}
                    {row.original.service.user.last_name}
                </p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Service Provider {row.original.service.user.first_name}{" "}
                        {row.original.service.user.middle_name}{" "}
                        {row.original.service.user.last_name}
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <p>
                        <strong>Email:</strong>{" "}
                        {row.original.service.user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong>{" "}
                        {row.original.service.user.contact_number}
                    </p>
                    <p>
                        <strong>Address:</strong>{" "}
                        {row.original.service.user.address}
                    </p>
                    <StaticMap
                        from={{
                            lat: Number(currentUser.lat),
                            lng: Number(currentUser.lng),
                        }}
                        to={{
                            lat: Number(row.original.service.user.lat),
                            lng: Number(row.original.service.user.lng),
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "created_at",
        cell: ({ row }) => {
            return format(row.original.created_at, "MMMM d, yyyy 'at' h:mm a");
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Booked At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "service.name",
        header: "Service",
        cell: ({ row }) => {
            return (
                <Link
                    className="underline text-blue-500"
                    href={route("services.show", row.original.service.id)}
                >
                    {row.original.service.name}
                </Link>
            );
        },
    },
    {
        accessorKey: "datetime",
        cell: ({ row }) => {
            return format(row.original.datetime, "MMMM d, yyyy 'at' h:mm a");
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Date & Time <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "service.price",
        header: "Price",
        cell: ({ row }) => {
            return `₱${row.original.service.price}`;
        },
    },
    {
        accessorKey: "fare",
        header: "Fare",
        cell: ({ row }) => {
            return `₱${row.original.fare}`;
        },
    },

    {
        accessorKey: "service.user",
        header: "Service Provider",
        cell: UserCell,
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ActionsCell,
    },
];
