import { FormEventHandler, useState } from "react";
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
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { format } from "date-fns";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    service_id: number;
}

export function BookingModal({
    isOpen,
    onClose,
    serviceName,
    service_id,
}: BookingModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(),
        time: "",
        service_id,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const bookingDate = new Date(data.date);
        const [hours, minutes] = data.time.split(":");
        bookingDate.setHours(parseInt(hours), parseInt(minutes));
        post(route("bookings.store"), {
            onFinish: () => {
                toast("Booking has been created", {
                    description: format(
                        bookingDate,
                        "EEEE, MMMM d, yyyy 'at' h:mm a"
                    ),
                });
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Service</DialogTitle>
                    <DialogDescription>
                        Select a date and time to book {serviceName}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Calendar
                                mode="single"
                                selected={data.date}
                                onSelect={(date) =>
                                    setData("date", date as Date)
                                }
                                className="rounded-md border w-fit"
                            />

                            {errors.date && (
                                <div className="text-red-500 text-sm">
                                    {errors.date}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="time">Time</Label>
                            <Input
                                id="time"
                                type="time"
                                value={data.time}
                                onChange={(e) =>
                                    setData("time", e.target.value)
                                }
                            />
                            {errors.time && (
                                <div className="text-red-500 text-sm">
                                    {errors.time}
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm Booking</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
