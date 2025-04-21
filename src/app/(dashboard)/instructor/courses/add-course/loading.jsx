import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="container mx-auto max-w-3xl px-5 py-6">
          <Skeleton className="mb-5 h-10 w-40 rounded-md" />

          <div className="space-y-4">
            {/* Simulate 4 input fields */}
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}

            {/* Simulate a text area */}
            <Skeleton className="h-24 w-full rounded-md" />

            {/* Simulate a submit button */}
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
