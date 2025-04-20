import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 lg:px-6">
        {/* Table header skeleton */}
        <Skeleton className="h-6 w-48 rounded-md" />

        {/* Table body skeleton */}
        <div className="mt-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
