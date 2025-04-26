"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { checkQuizSubmission, saveQuizResult } from "@/lib/actions/quiz.action";

// Define form schema with Zod validation
const quizSubmissionSchema = z.object({
  answers: z
    .record(
      z.string(), // question ID as key
      z.array(z.string()), // array of selected option IDs
    )
    .refine(
      (answers) => {
        // Get all question IDs from the form
        const questionIds = Object.keys(answers);
        return questionIds.every((id) => answers[id].length > 0);
      },
      {
        message: "Please answer all questions",
        path: ["root"],
      },
    ),
});

export default function QuizSubmission({ quizzes }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const form = useForm({
    resolver: zodResolver(quizSubmissionSchema),
    defaultValues: {
      answers: {},
    },
  });

  // Calculate total questions
  const totalQuestions = quizzes.reduce(
    (total, quiz) => total + (quiz.questions?.length || 0),
    0,
  );
  useEffect(() => {
    const checkSubmission = async () => {
      try {
        const result = await checkQuizSubmission(quizzes[0]._id);
        setHasSubmitted(result.hasSubmitted);
        setSubmissionData(result.submission);
      } catch (error) {
        console.error("Error checking submission:", error);
      }
    };

    checkSubmission();
  }, [quizzes]);
  if (hasSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-dark-main mb-8 text-3xl font-bold dark:text-white">
          Quiz Results
        </h1>
        <div className="dark:bg-dark-bg rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">{quizzes[0].title}</h2>
          <div className="mb-6">
            <p className="text-lg">
              Your score:{" "}
              <span className="font-bold">
                {submissionData.score}/{submissionData.totalQuestions}
              </span>
            </p>
            <p className="text-lg">
              Percentage:{" "}
              <span className="font-bold">
                {Math.round(submissionData.percentage)}%
              </span>
            </p>
            <p className="text-muted-foreground mt-2">
              Submitted on:{" "}
              {new Date(submissionData.submittedAt).toLocaleString()}
            </p>
          </div>
          {/* You could add more detailed results here */}
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const answeredQuestions = Object.keys(data.answers).length;

    if (answeredQuestions !== totalQuestions) {
      toast.error(
        `Please answer all questions (${answeredQuestions}/${totalQuestions} answered)`,
        { description: "You must complete all quizzes before submitting." },
      );
      return;
    }

    try {
      const result = await saveQuizResult({
        quizId: quizzes[0]._id, // Assuming one quiz for simplicity
        data: {
          answers: data.answers,
        },
      });

      if (result.success) {
        toast.success(result.message, {
          description: `Score: ${result.data.score}/${result.data.totalQuestions} (${Math.round(result.data.percentage)}%)`,
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
        Available Quizzes
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border-border dark:border-dark-border dark:bg-dark-bg rounded-2xl border bg-white p-6 shadow-md"
            >
              <div className="border-border mb-4 border-b pb-4">
                <h2 className="text-dark-main text-xl font-semibold dark:text-white">
                  {quiz.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  Course:{" "}
                  <span className="font-medium">{quiz.course.title}</span> |
                  Questions:{" "}
                  <span className="font-medium">
                    {quiz.questions?.length || 0}
                  </span>
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
          ))}

          <div className="mt-8 flex justify-end">
            <Button type="submit" className="bg-main hover:bg-main-dark">
              Submit Answers
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
