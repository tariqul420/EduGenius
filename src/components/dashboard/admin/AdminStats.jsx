import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getCoursesStats,
  getGrowthRate,
  getRevenueStats,
  getTotalEnrolmentStats,
  getTotalStudentStats,
} from "@/lib/actions/stats.action";

export async function AdminStats() {
  const revenueStats = await getRevenueStats();
  const studentsStats = await getTotalStudentStats();
  const enrolmentStats = await getTotalEnrolmentStats();
  const growthRateStats = await getGrowthRate();
  const coursesStats = await getCoursesStats();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${revenueStats.totalRevenue}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {revenueStats.trend === "Trending up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {revenueStats.trend === "Trending up" && "+"}
              {revenueStats.growthRate}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {revenueStats.trend} this month{" "}
            {revenueStats.trend === "Trending up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Revenue for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Courses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {coursesStats.totalCourses}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {revenueStats.trend === "Up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {coursesStats.trend === "Up" && "+"}
              {revenueStats.growthRate}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {revenueStats.trend} {coursesStats.growthRate}% this period{" "}
            {revenueStats.trend === "Up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Enrolment</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {enrolmentStats.totalEnrolment}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {revenueStats.trend === "Strong student retention" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {studentsStats.trend === "Strong student retention" && "+"}
              {studentsStats.growthRate}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {coursesStats.trend}
            {revenueStats.trend === "Strong student retention" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {growthRateStats.growthRate}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {revenueStats.trend === "increase" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {coursesStats.trend === "increase" && "+"}
              {growthRateStats.growthRate}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance {coursesStats.trend}{" "}
            {revenueStats.trend === "increase" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
