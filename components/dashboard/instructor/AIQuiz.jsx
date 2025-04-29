"use client";

import { useEffect, useState } from "react";

import SparkleIcon from "@/components/icons/SparkleIcon";
import { Button } from "@/components/ui/button"; // Import Button
import { generateQuizzes } from "@/lib/actions/ai.action";

export default function AIQuiz({ desc, title, category, level, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        // Only fetch if essential props are present
        if (!title || !category || !level) {
          setSuggestions([]); // Clear suggestions if inputs are missing
          return;
        }

        setLoading(true);
        const generatedSuggestions = await generateQuizzes({
          desc,
          title,
          category,
          level,
        });
        // Ensure the result is always an array
        setSuggestions(
          Array.isArray(generatedSuggestions) ? generatedSuggestions : [],
        );
      } catch (error) {
        console.error("Error fetching AI quiz suggestions:", error);
        setSuggestions([]); // Clear suggestions on error
      } finally {
        setLoading(false);
      }
    }, 1000); // Increased debounce slightly

    return () => clearTimeout(delayDebounceFn);
  }, [desc, title, category, level]); // Dependencies are correct

  return (
    <div className="bg-background space-y-4 rounded-md border p-4 shadow-sm">
      <h3 className="flex items-center gap-2 text-lg font-semibold">
        <SparkleIcon className="h-5 w-5 text-purple-500" />
        AI Quiz Suggestions
      </h3>

      {loading && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <SparkleIcon className="h-4 w-4 animate-pulse text-purple-500" />
          Generating quiz suggestions based on course details...
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <>
          {/* Button to use all suggestions (if onSelect is provided) */}
          {onSelect && (
            <div className="flex justify-end border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(...suggestions)} // Pass all suggestions
              >
                <SparkleIcon className="mr-2 h-4 w-4" />
                Use These Suggestions
              </Button>
            </div>
          )}

          {/* List of suggestions */}
          <div className="mt-4 space-y-5 border-t pt-4">
            {suggestions.map((quiz, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border p-4 shadow-sm"
              >
                {/* Question */}
                <p className="mb-3 text-base font-semibold">
                  {index + 1}. {quiz.question}
                </p>

                {/* Options */}
                <div className="space-y-2 text-sm">
                  {quiz.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`flex items-start gap-2 rounded border p-2 transition-colors ${
                        option.isCorrect
                          ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30"
                          : "border-border bg-transparent"
                      }`}
                    >
                      {/* Option Label (A, B, C, D) */}
                      <span
                        className={`mt-px font-medium ${
                          option.isCorrect
                            ? "text-green-700 dark:text-green-300"
                            : "text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {/* Option Text */}
                      <span
                        className={`flex-1 ${
                          option.isCorrect
                            ? "text-green-800 dark:text-green-200"
                            : "text-foreground" // Use default text color for incorrect options
                        }`}
                      >
                        {option.option}
                      </span>
                      {/* Correct Indicator */}
                      {option.isCorrect && (
                        <span className="ml-2 rounded bg-green-200 px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap text-green-800 dark:bg-green-800 dark:text-green-100">
                          Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Message when no suggestions are available (and not loading) */}
      {!loading && suggestions.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No suggestions generated. Please ensure the course title, category,
          and level are provided above. Suggestions will appear here
          automatically.
        </p>
      )}
    </div>
  );
}
