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
import { Link } from "@inertiajs/react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, LucideMoreHorizontal } from "lucide-react";

const ActionsCell = ({ row }: { row: Row<Booking> }) => {
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

                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
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
        accessorKey: "service.user",
        header: "Service Provider",
        cell: ({ row }) => {
            return `${row.original.service.user.first_name} ${row.original.service.user.middle_name} ${row.original.service.user.last_name}`;
        },
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
