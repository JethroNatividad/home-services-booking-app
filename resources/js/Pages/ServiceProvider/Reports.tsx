import { Card, CardContent } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import Layout from "@/layouts/Layout";
import { Booking } from "@/types";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

type Period = "week" | "month" | "year" | "all";

const getDateRangeForPeriod = (period: Period): DateRange => {
    const now = new Date();
    switch (period) {
        case "week":
            return {
                from: addDays(now, -7),
                to: now,
            };
        case "month":
            return {
                from: addDays(now, -30),
                to: now,
            };
        case "year":
            return {
                from: addDays(now, -365),
                to: now,
            };
        case "all":
            return {
                from: new Date(0), // Beginning of time
                to: now,
            };
    }
};

type Props = {
    bookings: Booking[];
};

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    total_bookings: {
        label: "Bookings",
        color: "hsl(var(--chart-1))",
    },
    completed_bookings: {
        label: "Completed",
        color: "hsl(var(--chart-2))",
    },
    canceled_bookings: {
        label: "Canceled",
        color: "hsl(var(--chart-3))",
    },
    completed_earnings: {
        label: "Earnings",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

const Reports = ({ bookings }: Props) => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    });
    const [activePeriod, setActivePeriod] = useState<Period>("month");

    const handlePeriodChange = (period: Period) => {
        setActivePeriod(period);
        setDate(getDateRangeForPeriod(period));
    };
    // Group by updated_at date.
    // Calculate total, completed, and canceled bookings for each date.
    const filteredData = bookings
        .filter((booking) => {
            const bookingDate = new Date(booking.updated_at);
            return (
                date?.from &&
                date?.to &&
                bookingDate >= date.from &&
                bookingDate <= date.to
            );
        })
        .reduce(
            (acc, booking) => {
                const date = new Date(booking.updated_at).toDateString();
                const existing = acc.find((item) => item.date === date);
                // Convert price to number to ensure proper addition
                const price = Number(booking.service.price) || 0;

                if (existing) {
                    existing.total_bookings += 1;
                    if (booking.status === "completed") {
                        existing.completed_bookings += 1;
                        existing.completed_earnings =
                            Number(existing.completed_earnings) + price;
                    } else if (booking.status === "canceled") {
                        existing.canceled_bookings += 1;
                    }
                } else {
                    acc.push({
                        date,
                        total_bookings: 1,
                        completed_bookings:
                            booking.status === "completed" ? 1 : 0,
                        canceled_bookings:
                            booking.status === "canceled" ? 1 : 0,
                        completed_earnings:
                            booking.status === "completed" ? price : 0,
                    });
                }

                return acc;
            },
            [] as {
                date: string;
                total_bookings: number;
                completed_bookings: number;
                canceled_bookings: number;
                completed_earnings: number;
            }[]
        )
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

    const totals = filteredData.reduce(
        (acc, item) => ({
            total_bookings: acc.total_bookings + item.total_bookings,
            completed_bookings:
                acc.completed_bookings + item.completed_bookings,
            canceled_bookings: acc.canceled_bookings + item.canceled_bookings,
            completed_earnings:
                Number(acc.completed_earnings) +
                Number(item.completed_earnings),
        }),
        {
            total_bookings: 0,
            completed_bookings: 0,
            canceled_bookings: 0,
            completed_earnings: 0,
        }
    );
    return (
        <Layout>
            <Card>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <h1 className="text-2xl font-semibold mb-4">Reports</h1>
                    <div className="mb-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[300px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")}{" "}
                                                - {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <Button
                            variant={
                                activePeriod === "week" ? "default" : "outline"
                            }
                            onClick={() => handlePeriodChange("week")}
                        >
                            Week
                        </Button>
                        <Button
                            variant={
                                activePeriod === "month" ? "default" : "outline"
                            }
                            onClick={() => handlePeriodChange("month")}
                        >
                            Month
                        </Button>
                        <Button
                            variant={
                                activePeriod === "year" ? "default" : "outline"
                            }
                            onClick={() => handlePeriodChange("year")}
                        >
                            Year
                        </Button>
                        <Button
                            variant={
                                activePeriod === "all" ? "default" : "outline"
                            }
                            onClick={() => handlePeriodChange("all")}
                        >
                            All Time
                        </Button>
                    </div>
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient
                                    id="fillTotalBookings"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-total_bookings)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-total_bookings)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillCompletedBookings"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-completed_bookings)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-completed_bookings)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillCanceledBookings"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-cancelled_bookings)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-cancelled_bookings)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="fillCompletedEarnings"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-completed_earnings)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-completed_earnings)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(
                                                value
                                            ).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            });
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="total_bookings"
                                type="natural"
                                fill="url(#fillTotalBookings)"
                                stroke="var(--color-total_bookings)"
                                stackId="a"
                            />
                            <Area
                                dataKey="completed_bookings"
                                type="natural"
                                fill="url(#fillCompletedBookings)"
                                stroke="var(--color-completed_bookings)"
                                stackId="a"
                            />
                            <Area
                                dataKey="canceled_bookings"
                                type="natural"
                                fill="url(#fillCanceledBookings)"
                                stroke="var(--color-cancelled_bookings)"
                                stackId="a"
                            />
                            <Area
                                dataKey="completed_earnings"
                                type="natural"
                                fill="url(#fillCompletedEarnings)"
                                stroke="var(--color-completed_earnings)"
                                stackId="a"
                            />

                            <ChartLegend
                                accumulate="sum"
                                additive="sum"
                                content={<ChartLegendContent />}
                            />
                        </AreaChart>
                    </ChartContainer>

                    <Card className="mt-4">
                        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Total Bookings
                                    </h2>
                                    <p className="text-4xl font-semibold">
                                        {totals.total_bookings}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Completed Bookings
                                    </h2>
                                    <p className="text-4xl font-semibold">
                                        {totals.completed_bookings}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Canceled Bookings
                                    </h2>
                                    <p className="text-4xl font-semibold">
                                        {totals.canceled_bookings}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default Reports;
