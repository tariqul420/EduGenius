import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Section 1: Basic Info & Curriculum Tabs */}
      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            <Skeleton className="mb-5 h-10 w-40 rounded-md" />

            {/* Tab headers */}
            <div className="mb-6 flex gap-4">
              <Skeleton className="h-10 w-40 rounded-md" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>

            {/* Tab content: CourseForm or ModuleForm */}
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Quiz & Assignment Tabs */}
      <section>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="container mx-auto max-w-4xl px-5 py-6">
            {/* Tab headers */}
            <div className="mb-6 flex gap-4">
              <Skeleton className="h-10 w-40 rounded-md" />
              <Skeleton className="h-10 w-40 rounded-md" />
            </div>

            {/* Tab content: QuizForm or AssignmentForm */}
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
