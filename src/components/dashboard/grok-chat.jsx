/* eslint-disable no-shadow */
"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const MODELS = [{ id: "grok-3", name: "Grok 3" }];

export function GrokChat(props) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages,
    error,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
    onError: (err) => {
      console.error("useChat error:", err);
      // Add more detailed logging
      console.error("Error details:", {
        message: err.message,
        cause: err.cause,
        stack: err.stack,
      });
    },
  });

  return (
    <div className={cn("flex", "flex-col", "h-[500px]", "w-full")}>
      <div className={cn("flex", "justify-end", "mb-2")}>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Chat
        className="grow overflow-hidden"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        suggestions={[
          "Explain the concept of machine learning in simple terms for beginners.",
          "Recommend advanced exercises to master data structures and algorithms.",
          "Suggest effective strategies to prepare for my upcoming exams.",
          "Recommend real-world projects to apply what I’ve learned.",
        ]}
      />
      {error && (
        <p className="mt-2 text-red-500">
          Error: {error.message || "An error occurred."}
        </p>
      )}
    </div>
  );
}
