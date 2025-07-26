"use client"

import * as React from "react"
import { PieChart, Pie, Label } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartPie } from "lucide-react"
import EmptyCard from "./EmptyCard"

type Props = {
    data: {
        data: {
            devices: Array<{
                name: string,
                count: number,
            }>,
        },
    },
}

const chartConfig = {
    value: {
        label: "Devices",
    },
    desktop: {
        label: "Desktop",
        color: "#ffffff",
    },
    mobile: {
        label: "Mobile",
        color: "#3b47e0",
    },
} satisfies ChartConfig

export function ChartPieDonutText({ data }: Props) {
    const chartData = React.useMemo(() => {
        return data?.data.devices.map((device: { name: string; count: number }) => ({
            name: device.name.charAt(0).toUpperCase() + device.name.slice(1), // Capitalize
            value: device.count,
            fill: device.name === "desktop" ? "#ffffff" : "#3b47e0",
        }))
    }, [data])


    const total = chartData?.reduce((acc: number, item: { value: number }) => acc + item.value, 0)

    return (
        <Card className="flex flex-col backdrop-blur-md bg-white/5 border border-white/20 shadow-lg text-white">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-xl inline-flex items-center gap-2">
                    <ChartPie size={18} className="text-red-500" />
                    Device Usage</CardTitle>
                <CardDescription>Mobile vs Desktop</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">

                {
                    chartData?.length > 0 ? <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >

                        <PieChart>
                            <ChartTooltip
                                cursor={false}

                                content={<ChartTooltipContent labelFormatter={(value, data) => (` ${data[0].value} ${value}`)} indicator="line" />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-white text-3xl font-bold"
                                                    >
                                                        {total.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-white"
                                                    >
                                                        Devices
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                        :
                        <EmptyCard />
                }
            </CardContent>
        </Card>
    )
}
