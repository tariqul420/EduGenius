import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AssignmentStats() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card mb-8 grid grid-cols-1 gap-5 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-4 @xl/main:grid-cols-2 @4xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Assignments</CardDescription>
          <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
            5
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Complete</CardDescription>
          <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
            5
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Padding</CardDescription>
          <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
            5
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Missed</CardDescription>
          <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
            1
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
