import { format } from "date-fns";
import {
  ClockIcon,
  FileTextIcon,
  LockIcon,
  MessageSquareIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

import AssignmentSubmitForm from "@/components/dashboard/student/AssignmentSubmitForm";
import TextSeeMore from "@/components/shared/text-see-more";
import { Badge } from "@/components/ui/badge";
import { getAssignmentForCourseSlug } from "@/lib/actions/assignment.action";

export default async function AssignmentDetailsPage({ params }) {
  const { slug } = await params;
  const assignment = await getAssignmentForCourseSlug(slug);

  const {
    _id,
    title,
    deadline,
    description,
    course,
    instructor,
    totalMarks,
    passMarks,
    createdAt,
    hasSubmitted,
    content,
    mark,
    feedback,
  } = assignment || {};

  return (
    <section className="py-6">
      <div className="@container/main flex flex-1 flex-col gap-4 px-4 lg:px-6">
        {/* Header Section */}
        <div className="text-dark-main dark:bg-dark-bg relative overflow-hidden rounded-xl bg-white p-6 dark:text-white">
          <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-white/10 dark:bg-white/10"></div>
          <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-white/5 dark:bg-white/5"></div>
          <div className="relative z-10">
            <div className="mb-1 flex items-center gap-2">
              <LockIcon className="text-dark-main/80 h-5 w-5 dark:text-white/80" />
              <span className="text-dark-main/80 text-sm font-medium tracking-wider uppercase dark:text-white/80">
                {title || "Untitled Assignment"}
              </span>
            </div>
            <h1 className="text-3xl leading-tight font-bold md:text-4xl">
              {course?.title || "Unknown Course"}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Badge
                variant="outline"
                className="border-dark-main/30 text-dark-main dark:border-white/30 dark:text-white"
              >
                <ClockIcon className="mr-1 h-4 w-4" />
                Due:{" "}
                {deadline && !isNaN(new Date(deadline).getTime())
                  ? format(new Date(deadline), "PPP")
                  : "N/A"}
              </Badge>
              <Badge
                variant="outline"
                className="border-dark-main/30 text-dark-main dark:border-white/30 dark:text-white"
              >
                <ShieldIcon className="mr-1 h-4 w-4" />
                <span className="dark:text-white">
                  {typeof totalMarks === "number" ? totalMarks : 0} Marks (Pass:{" "}
                  {typeof passMarks === "number" ? passMarks : 0})
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-dark-main/30 text-dark-main dark:border-white/30 dark:text-white"
              >
                <UserIcon className="mr-1 h-4 w-4" />
                <span className="dark:text-white">
                  {instructor && instructor.firstName && instructor.lastName
                    ? `${instructor.firstName} ${instructor.lastName}`
                    : "Unknown Instructor"}
                </span>
              </Badge>
            </div>
          </div>
        </div>

        {/* Assignment Description */}
        <div className="group text-dark-main dark:bg-dark-bg relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:text-white">
          <div className="from-dark-main/5 absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          <div className="p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="bg-dark-main/10 text-dark-main dark:bg-dark-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <FileTextIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Assignment Description
                </h2>
                <p className="text-muted-foreground text-sm">
                  Implementation guidelines and requirements
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Created:{" "}
                  {createdAt ? format(new Date(createdAt), "PPP") : "N/A"}
                </p>
              </div>
            </div>
            <TextSeeMore
              description={description || "No description provided"}
            />
          </div>
        </div>

        {/* Conditional Rendering: Submission Info or Submission Form */}
        {hasSubmitted ? (
          <div className="text-dark-main dark:bg-dark-bg rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-semibold">Your Submission</h2>
            <div className="space-y-4">
              {/* Submission Content */}
              <div className="dark:bg-dark-hover rounded-lg bg-white p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-dark-main/10 text-dark-main flex h-10 w-10 items-center justify-center rounded-lg">
                    <FileTextIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium">Submitted Work</h3>
                </div>
                <TextSeeMore
                  description={content || "No submission content provided"}
                />
              </div>

              {/* Status or Result */}
              {mark > 0 ? (
                <>
                  <div className="dark:bg-dark-hover flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${mark >= passMarks ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                    >
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Result</p>
                      <p className="font-medium">
                        Score: {mark}/{totalMarks} (
                        {((mark / totalMarks) * 100).toFixed(1)}%)
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {mark >= passMarks ? "Passed" : "Did not pass"}
                      </p>
                    </div>
                  </div>
                  <div className="dark:bg-dark-hover rounded-lg bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="bg-dark-main/10 text-dark-main flex h-10 w-10 items-center justify-center rounded-lg">
                        <MessageSquareIcon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-medium">
                        Instructor Feedback
                      </h3>
                    </div>
                    <TextSeeMore
                      description={feedback || "No feedback provided"}
                    />
                  </div>
                </>
              ) : (
                <div className="dark:bg-dark-hover flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Status</p>
                    <p className="font-medium">Your assignment is pending</p>
                    <p className="text-muted-foreground text-xs">
                      Check back later for grading results
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <AssignmentSubmitForm assignment={_id} course={course?._id} />
        )}
      </div>
    </section>
  );
}
