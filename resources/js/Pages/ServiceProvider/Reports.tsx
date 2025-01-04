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
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = {
    bookings: Booking[];
};

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    total_bookings: {
        label: "Total Bookings",
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
} satisfies ChartConfig;

const Reports = ({ bookings }: Props) => {
    // Group by updated_at date.
    // Calculate total, completed, and canceled bookings for each date.
    const data = bookings
        .reduce((acc, booking) => {
            const date = new Date(booking.updated_at).toDateString();
            const existing = acc.find((item) => item.date === date);

            if (existing) {
                existing.total_bookings += 1;

                if (booking.status === "completed") {
                    existing.completed_bookings += 1;
                } else if (booking.status === "canceled") {
                    existing.canceled_bookings += 1;
                }
            } else {
                acc.push({
                    date,
                    total_bookings: 1,
                    completed_bookings: booking.status === "completed" ? 1 : 0,
                    canceled_bookings: booking.status === "canceled" ? 1 : 0,
                });
            }

            return acc;
        }, [] as { date: string; total_bookings: number; completed_bookings: number; canceled_bookings: number }[])
        .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    return (
        <Layout>
            <Card>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <AreaChart data={data}>
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

                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default Reports;
