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
          "Generate a tasty vegan lasagna recipe for 3 people.",
          "Generate a list of 5 questions for a job interview for a software engineer.",
          "Who won the 2022 FIFA World Cup?",
        ]}
      />
    </div>
  );
}
