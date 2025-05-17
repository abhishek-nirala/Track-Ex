"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, LabelList, CartesianGrid, XAxis } from "recharts";
import { IExpenseSummary, useExpenseSummary } from "@/lib/useExpenseStore";
import axios from "axios";
// import { useToast } from "@/hooks/use-toast";
// import printMessage from "@/errorMsg";
// import { useExpenseSummary } from "@/lib/useExpenseStore";
// import { TrendingUp } from "lucide-react";

export function ChartAreaInteractive() {

    // const chartData = useExpenseSummary((state) => state.summaries);
    const [chartData, setChartData] = React.useState<IExpenseSummary[]>([])
    // const [loading, setLoading] = React.useState(false)
    // const {toast} = useToast()
    const summary = useExpenseSummary((state) => state.setSummary)

    React.useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get("/api/expense?filter=summary")
                if (!response.data.success) {
                    console.log("failed to fetch expense summary")
                    // return printMessage(false,"failed to fetch data!",401)
                } else {
                    setChartData(response.data.message)
                    summary(response.data.message)
                }
            } catch (error) {
                console.log("error while fetching expense summary@chart-are-inter!: ", error)

            }
            console.log("fetching data inside cahrt-are-interactid")
        }
        fetchChartData();
    }, [summary])
    // Handle empty or undefined data
    if (!chartData || chartData.length === 0) {
        return <div>No data available to display.</div>;
    }

    const chartConfig = {
        amount: {
            label: "Total Spent",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    // const today =  new Date()
    // const getMonth = new Date(today.getMonth()) as string

    return (
        <Card>
            <CardHeader>
                <CardTitle>Summary of Expenses this month</CardTitle>
                <CardDescription>{ }</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="bg-white">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="_id"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => (value ? value.toUpperCase() : "")}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="totalSpent" fill="#4caf50" radius={8}>
                            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing summary of the total Expense on each category.
                </div>
            </CardFooter>
        </Card>
    );
}

