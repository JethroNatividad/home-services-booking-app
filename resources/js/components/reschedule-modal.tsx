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
import { Booking } from "@/types";

interface RescheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking;
}

export function RescheduleModal({
    isOpen,
    onClose,
    booking,
}: RescheduleModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(booking.datetime),
        time: format(new Date(booking.datetime), "HH:mm"),
        service_id: booking.service.id,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const bookingDate = new Date(data.date);
        const [hours, minutes] = data.time.split(":");
        bookingDate.setHours(parseInt(hours), parseInt(minutes));

        post(route("bookings.reschedule", booking.id), {
            onFinish: () => {
                toast("Booking Rescheduled", {
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
                        Select a date and time to reschedule
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
                                disabled={(date) => date < new Date()}
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
                        <Button type="submit">Confirm Reschedule</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
