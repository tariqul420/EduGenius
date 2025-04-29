/* eslint-disable no-shadow */
"use client";

import { useChat } from "@ai-sdk/react";

import { Chat } from "@/components/ui/chat";
import { cn } from "@/lib/utils";

export function GrokChat({ initialMessages }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
  } = useChat({
    initialMessages,
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  return (
    <div className={cn("flex h-full w-full flex-col")}>
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        suggestions={[
          "Generate a quiz with 5 questions on the basics of photosynthesis",
          "Create a personalized learning path for a student struggling with algebra.",
        ]}
      />
    </div>
  );
}
