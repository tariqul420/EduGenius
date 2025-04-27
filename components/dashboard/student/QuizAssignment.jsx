import { format } from "date-fns"; // For formatting the deadline date

import AssignmentSubmitForm from "./AssignmentSubmitForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuizAssignment({ assignment }) {
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
          <h2 className="mb-4 text-2xl font-bold">{assignment.title}</h2>
          <p className="mb-4">
            <strong>Course:</strong> {assignment.course.title}
          </p>
          <p className="mb-4">
            <strong>Instructor:</strong> {assignment.instructor.firstName}{" "}
            {assignment.instructor.lastName}
          </p>
          <p className="mb-4">
            <strong>Deadline:</strong>{" "}
            {format(new Date(assignment.deadline), "PPP 'at' p")}
          </p>
          <p className="mb-4">
            <strong>Total Marks:</strong> {assignment.totalMarks} |{" "}
            <strong>Pass Marks:</strong> {assignment.passMarks}
          </p>
          <div className="mb-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">View Description</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-h-[80vh] w-full overflow-x-auto rounded-lg p-6 shadow-xl md:min-w-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Assignment Description</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="dark:text-light-theme text-dark-input whitespace-pre-wrap">
                  {assignment?.description}
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogAction>Close</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Assignment Submission Form */}
          <AssignmentSubmitForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
