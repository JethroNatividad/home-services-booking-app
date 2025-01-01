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
import { route } from "../../../../vendor/tightenco/ziggy/src/js";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: Service;
}

export function BookingModal({ isOpen, onClose, service }: BookingModalProps) {
    const [distance, setDistance] = useState(0);
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(),
        time: "",
        service_id: service.id,
        distance: 0.0,
        fare: 0.0,
    });

    useEffect(() => {
        setData({
            ...data,
            distance: Number(distance),
            fare:
                Number(service.initial_fare) +
                Number(service.fare_per_km) * Number(distance),
        });
    }, [distance]);

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
            <div className="hidden">
                <StaticMap
                    from={{
                        lat: Number(service.user.lat),
                        lng: Number(service.user.lng),
                    }}
                    to={{
                        lat: Number(user.lat),
                        lng: Number(user.lng),
                    }}
                    setDistance={setDistance}
                />
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Book Service</DialogTitle>
                    <DialogDescription>
                        Select a date and time to book {service.name}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Calendar
                                mode="single"
                                selected={data.date}
                                onSelect={(date) => {
                                    if (date) {
                                        const newDate = new Date(date);
                                        // set time to date.date time
                                        newDate.setHours(
                                            data.date.getHours(),
                                            data.date.getMinutes()
                                        );
                                        setData("date", date);
                                    }
                                }}
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
                        <div className="grid gap-2">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Fare</AccordionTrigger>
                                    <AccordionContent className="grid gap-2">
                                        <div>
                                            <span className="text-muted-foreground">
                                                Base Fare
                                            </span>
                                            <span className="float-right">
                                                ₱{service.initial_fare}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">
                                                Fare per km
                                            </span>
                                            <span className="float-right">
                                                ₱{service.fare_per_km}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">
                                                Distance
                                            </span>
                                            <span className="float-right">
                                                {distance} km
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-muted-foreground">
                                                Total
                                            </span>
                                            <span className="float-right">
                                                ₱
                                                {(
                                                    Number(
                                                        service.initial_fare
                                                    ) +
                                                    Number(
                                                        service.fare_per_km
                                                    ) *
                                                        Number(distance)
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="h-32">
                                            <StaticMap
                                                from={{
                                                    lat: Number(
                                                        service.user.lat
                                                    ),
                                                    lng: Number(
                                                        service.user.lng
                                                    ),
                                                }}
                                                to={{
                                                    lat: Number(user.lat),
                                                    lng: Number(user.lng),
                                                }}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
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
