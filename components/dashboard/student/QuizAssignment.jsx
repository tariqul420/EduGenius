import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuizAssignment({ assignment, studentId, slug }) {
  // Check if the student has a submission
  const hasSubmission = assignment?.submissions?.some(
    (submission) => submission.studentId === studentId,
  );

  return (
    <Tabs defaultValue="quiz" className="mt-8 w-full">
      <TabsList className="bg-light-bg dark:bg-dark-hover w-full rounded px-1.5 py-5 shadow-sm">
        <TabsTrigger
          value="quiz"
          className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Quiz
        </TabsTrigger>
        <TabsTrigger
          value="assignment"
          className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Assignment
        </TabsTrigger>
      </TabsList>
      {/* Quiz Section */}
      <TabsContent value="quiz" className="mt-6">
        Quizzes
      </TabsContent>
      {/* Assignment Section */}
      <TabsContent value="assignment" className="mt-6">
        <div className="mx-auto max-w-2xl">
          {/* Check if no assignment exists */}
          {!assignment ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Assignment Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  No assignment is available at the moment. Please check back
                  later or contact your instructor.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Conditional Rendering Based on Submission */}
              {hasSubmission ? (
                <Button asChild variant="default">
                  <Link
                    href={`/student/assignment/${assignment?.course?.slug}`}
                  >
                    View Marks and Details
                  </Link>
                </Button>
              ) : (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>No Submission Yet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You haven&apos;t submitted this assignment yet. Start your
                      assignment now to complete it before the deadline!
                    </p>
                    <Button asChild>
                      <Link href={`/student/assignment/${slug}`}>
                        Start Assignment
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
