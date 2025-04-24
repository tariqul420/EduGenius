import { Bell } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NotificationsBell() {
  return (
    <Popover>
      <PopoverTrigger className="relative flex cursor-pointer items-center gap-2 rounded-full border p-2 text-3xl shadow">
        <span className="bg-dark-btn absolute top-0 right-0 h-2 w-2 rounded-full drop-shadow-2xl" />
        <Bell size={16} />
      </PopoverTrigger>
      <PopoverContent>
        <Alert>
          <AlertDescription>
            <Tabs defaultValue="receive" className="w-full">
              <TabsList className="bg-light-bg dark:bg-dark-hover w-full rounded px-1.5 py-5 shadow-sm">
                <TabsTrigger
                  value="receive"
                  className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
                >
                  Receive
                </TabsTrigger>

                <TabsTrigger
                  value="send"
                  className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
                >
                  Send
                </TabsTrigger>
              </TabsList>

              <TabsContent value="receive" className="mt-6">
                You have no new notifications. Check back later for updates.
              </TabsContent>

              <TabsContent value="send" className="mt-6">
                You have no new notifications. Check back later for updates.
              </TabsContent>
            </Tabs>
          </AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  );
}
