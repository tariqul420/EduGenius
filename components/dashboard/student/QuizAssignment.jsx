import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuizAssignment({ course, slug }) {
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
        <div className="mx-auto max-w-2xl">
          {/* Check if no quiz exists */}
          {!course?.hasQuiz ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>No Quiz Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  There are no quizzes available for this course at the moment.
                  Check back later or contact your instructor.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Conditional Rendering Based on Submission */}
              {course?.hasQuizSubmitted ? (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Quiz Submitted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You have submitted the quiz. View your grade and feedback
                      below.
                    </p>
                    <Button asChild>
                      <Link href={`/student/quiz/${slug}`}>
                        View Grade and Feedback
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Quiz Not Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You haven&apos;t started this quiz yet. Start now to
                      complete it before the deadline!
                    </p>
                    <Button asChild>
                      <Link href={`/student/quiz/${slug}`}>Start Quiz</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </TabsContent>
      {/* Assignment Section */}
      <TabsContent value="assignment" className="mt-6">
        <div className="mx-auto max-w-2xl">
          {/* Check if no assignment exists */}
          {!course?.hasAssignment ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Assignment Unavailable</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  No assignment is currently available. Please try again later
                  or reach out to your instructor.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Conditional Rendering Based on Submission */}
              {course?.hasAssignmentSubmitted ? (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Submission Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You have not yet submitted this assignment. Begin working
                      on it now to meet the deadline!
                    </p>
                    <Button asChild>
                      <Link href={`/student/assignment/${slug}`}>
                        View Grade and Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Submission Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      You have not yet submitted this assignment. Begin working
                      on it now to meet the deadline!
                    </p>
                    <Button asChild>
                      <Link href={`/student/assignment/${slug}`}>
                        Begin Assignment
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
