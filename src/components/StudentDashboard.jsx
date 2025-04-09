import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const StudentDashboard = () => {
  return (
    <div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card mb-8 grid grid-cols-1 gap-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Course</CardDescription>
            <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
              01
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Assignment</CardDescription>
            <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
              2
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Quiz</CardDescription>
            <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
              525
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Certificate</CardDescription>
            <CardTitle className="font-semibold tabular-nums lg:text-2xl @[250px]/card:text-3xl">
              3
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
