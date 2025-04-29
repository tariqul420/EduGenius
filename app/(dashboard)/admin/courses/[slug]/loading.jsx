import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            {/* Page Header */}
            <div className="mb-5 space-y-2">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Main Tabs */}
            <div className="rounded border p-3 shadow-xl md:p-5">
              {/* Tabs List */}
              <div className="bg-muted mb-5 flex space-x-2 overflow-hidden rounded p-1.5">
                {["Basic Information", "Curriculum"].map((tab) => (
                  <Skeleton key={tab} className="h-12 w-32 rounded px-6 py-4" />
                ))}
              </div>

              {/* Tab Content - Basic Information */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            {/* Secondary Tabs */}
            <div className="rounded border p-3 shadow-xl md:p-5">
              {/* Tabs List */}
              <div className="bg-muted mb-5 flex space-x-2 overflow-hidden rounded p-1.5">
                {["Quiz", "Assignment"].map((tab) => (
                  <Skeleton key={tab} className="h-12 w-24 rounded px-6 py-4" />
                ))}
              </div>

              {/* Tab Content - Quiz */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
