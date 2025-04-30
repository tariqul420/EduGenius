"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { saveQuizResult } from "@/lib/actions/quiz.action";

const quizSubmissionSchema = z.object({
  answers: z.record(z.string(), z.array(z.string())).refine(
    (answers) => {
      const questionIds = Object.keys(answers);
      return questionIds.every((id) => answers[id].length > 0);
    },
    {
      message: "Please answer all questions",
      path: ["root"],
    },
  ),
});

export default function QuizSubmission({ quiz }) {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);

  const [submissionData, setSubmissionData] = useState(null);

  const form = useForm({
    resolver: zodResolver(quizSubmissionSchema),
    defaultValues: {
      answers: {},
    },
  });

  // Calculate total questions from the single quiz
  const totalQuestions = quiz?.questions?.length || 0;

  // Handle case when quiz is empty or invalid
  if (!quiz || !quiz._id || !quiz.questions) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-dark-main mb-8 text-3xl font-bold dark:text-white">
          Quiz Not Found
        </h1>
        <p className="text-muted-foreground">No quiz data available.</p>
      </div>
    );
  }

  if (quiz?.hasSubmitted) {
    const percentage = quiz?.percentage.toFixed(2);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-dark-main mb-8 text-3xl font-bold dark:text-white">
          Quiz Results
        </h1>
        <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold">{quiz.title}</h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Your Progress</span>
              <span className="font-bold">{percentage}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-4 rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{percentage}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm text-green-600 dark:text-green-300">
                Correct
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                {quiz?.score}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-sm text-red-600 dark:text-red-300">
                Incorrect
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-300">
                {Number(quiz?.totalQuestions) - Number(quiz?.score)}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Questions</span>
              <span className="font-medium">{quiz?.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Submitted On</span>
              <span className="font-medium">
                {format(new Date(quiz.createdAt), "MMMM d, yyyy h:mm a")}
              </span>
            </div>
          </div>

          {/* Detailed Results Button */}
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "View Question Details"}
          </Button>

          {/* Detailed Results */}
          {showDetails && (
            <div className="mt-4 space-y-4">
              {quiz.questions.map((question, index) => {
                const answer = submissionData?.answers?.find(
                  (a) => a.question.toString() === question._id.toString(),
                );
                const correctOptions = question.options.filter(
                  (opt) => opt.isCorrect,
                );

                return (
                  <div
                    key={question._id}
                    className={`rounded-lg p-4 ${
                      answer?.isCorrect
                        ? "bg-green-50 dark:bg-green-900/10"
                        : "bg-red-50 dark:bg-red-900/10"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">
                          Q{index + 1}: {question.question}
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {answer?.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">
                            Correct Answers:
                          </p>
                          <ul className="ml-4 list-disc text-sm text-green-600 dark:text-green-300">
                            {correctOptions.map((opt) => (
                              <li key={opt._id}>{opt.option}</li>
                            ))}
                          </ul>
                        </div>
                        {!answer?.isCorrect && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Your Answers:</p>
                            <ul className="ml-4 list-disc text-sm text-red-600 dark:text-red-300">
                              {answer?.selectedOptions.map((optId) => {
                                const opt = question?.options?.find(
                                  (o) => o._id.toString() === optId.toString(),
                                );
                                return <li key={optId}>{opt?.option}</li>;
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                      <span className="font-bold">
                        {answer?.isCorrect ? "1" : "0"}/1
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const answeredQuestions = Object.keys(data.answers).length;

    if (answeredQuestions !== totalQuestions) {
      toast.error("Please answer all questions  answered)", {
        description: "You must complete all questions before submitting.",
      });
      return;
    }

    try {
      const result = await saveQuizResult({
        quizId: quiz._id,
        data: {
          answers: data.answers,
        },
        path: pathname,
      });

      if (result.success) {
        setSubmissionData(result.data);
        toast.success("Quiz submitted successfully", {
          description: "Your answers have been recorded.",
        });
      }
    } catch (error) {
      toast.error("Submission failed", {
        description: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-dark-main mb-8 text-3xl font-bold dark:text-white">
        Available Quiz
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="border-border dark:border-dark-border dark:bg-dark-bg rounded-2xl border bg-white p-6 shadow-md">
            <div className="border-border mb-4 border-b pb-4">
              <h2 className="text-dark-main text-xl font-semibold dark:text-white">
                {quiz.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                Course: <span className="font-medium">{quiz.course.title}</span>{" "}
                | Questions:{" "}
                <span className="font-medium">{totalQuestions}</span>
              </p>
            </div>

            {quiz.questions?.map((question) => (
              <FormField
                key={question._id}
                control={form.control}
                name={`answers.${question._id}`}
                render={() => (
                  <FormItem className="border-border dark:bg-dark-foreground dark:border-dark-border mb-6 space-y-3 rounded-xl border bg-gray-50 p-4 dark:bg-transparent">
                    <FormLabel className="text-dark-main text-base font-semibold dark:text-white">
                      {question.question}
                    </FormLabel>
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <FormField
                          key={option._id}
                          control={form.control}
                          name={`answers.${question._id}`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-y-0 space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option._id)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    return checked
                                      ? field.onChange([
                                          ...currentValues,
                                          option._id,
                                        ])
                                      : field.onChange(
                                          currentValues.filter(
                                            (id) => id !== option._id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-muted-foreground font-normal">
                                {option.option}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              className="bg-main hover:bg-main-dark cursor-pointer text-white"
            >
              Submit Answers
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
