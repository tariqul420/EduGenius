"use client";

import { Tooltip } from "@radix-ui/react-tooltip";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

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

export default function SellingReport() {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Selling Report</CardTitle>
          <CardDescription>
            Showing Selling Report for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="course"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="amt"
              stroke="#82ca9d"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
