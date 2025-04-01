"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const data = [
  {
    day: "Saturday",
    course: 4000,
    amt: 2400,
  },
  {
    day: "Sunday",
    course: 3000,
    amt: 2210,
  },
  {
    day: "Monday",
    course: 2000,
    amt: 2290,
  },
  {
    day: "Tuesday",
    course: 2780,
    amt: 2000,
  },
  {
    day: "Wednesday",
    course: 1890,
    amt: 2181,
  },
  {
    day: "Thursday",
    course: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    day: "Friday",
    course: 3490,
    amt: 2100,
  },
];

const chartConfig = {
  course: {
    label: "course",
    color: "#673DE5",
  },
};

export default function CourseStatistic() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Course Statistic</CardTitle>
          <CardDescription>
            Showing Course Statistic for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">dropdown</div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            {/* <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="course" fill="#82ca9d" /> */}
            <Bar dataKey="course" fill="var(--color-course)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
