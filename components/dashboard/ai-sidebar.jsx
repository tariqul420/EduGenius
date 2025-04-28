import { Bot } from "lucide-react";

import { GrokChat } from "./grok-chat";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AiSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Bot />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={"w-[400px] max-w-[90vw] p-4 sm:w-[540px]"}
      >
        <GrokChat />
      </SheetContent>
    </Sheet>
  );
}
