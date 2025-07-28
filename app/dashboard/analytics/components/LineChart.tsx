"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { ChartColumn } from "lucide-react"
import EmptyCard from "./EmptyCard"

export const description = "An interactive line chart"

type PropsType = {
    data: {
        data: {
            locations: Array<{
                info: {
                    city: string,
                    country: string,
                },
                count: number,
            }>,
        },
    }
}

const chartConfig = {
    clicks: {
        label: "Total Clicks",
        color: "#3b47e0",
    },
} satisfies ChartConfig

export function ChartLineInteractive({ data }: PropsType) {

    const chartData = React.useMemo(() => {
        const forMattedData = data?.data.locations.map((loc: { info: { city: string; country: string }; count: number }) => {
            return {
                location: `${loc.info.city} (${loc.info.country})`,
                clicks: loc.count,
            }
        })
        return forMattedData
    }, [data])

    return (
        <Card className="py-4 sm:py-0 h-full backdrop-blur-md bg-white/5 border border-white/20 shadow-lg text-white">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 p-6 pb-6 sm:pb-4">
                    <CardTitle className="text-xl inline-flex items-center gap-2">
                        <ChartColumn className="text-sky-400" />
                        Line Chart</CardTitle>
                    <CardDescription>
                        Showing locations with the most clicks of all time.
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="px-2 sm:p-8">
                {
                    chartData.length > 0 ? <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[450px] w-full "
                    >
                        <LineChart data={chartData} >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="location"
                                tickLine={true}
                                axisLine={true}
                                tickMargin={8}
                                minTickGap={32}

                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px] bg-slate-50 text-gray-700"
                                        nameKey="clicks"
                                        labelFormatter={(value) => value}

                                    />
                                }
                            />
                            <Line
                                dataKey="clicks"
                                type="monotone"
                                stroke={`#3b47e0`}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                            />
                        </LineChart>

                    </ChartContainer>
                        :

                        <EmptyCard />
                }

            </CardContent>
        </Card>
    )
}
