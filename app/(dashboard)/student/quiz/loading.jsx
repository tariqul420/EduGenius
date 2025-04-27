import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSkeleton() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6">
        {/* Skeleton for the table header */}
        <div className="flex gap-5 items-center">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-6 w-52" />
        </div>

        {/* Skeleton for multiple table rows */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 gap-4 rounded-md border p-4 shadow-sm"
            >
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
              <Skeleton className="col-span-1 h-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
