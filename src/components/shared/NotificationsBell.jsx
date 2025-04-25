import { Bell } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateNotificationMessage } from "@/constant/message-generator";
import { getReceiveNotification } from "@/lib/actions/notification.action";

export default async function NotificationsBell() {
  // Fetch received notifications
  const { notifications: receivedNotifications } = await getReceiveNotification(
    {
      page: 1,
      limit: 5,
    },
  );

  // Calculate unread notifications for the badge
  const unreadCount = receivedNotifications.filter(
    (n) =>
      !n.readBy.some((rb) => rb.user.toString() === n.recipient[0].toString()),
  ).length;

  return (
    <Popover>
      <PopoverTrigger className="relative flex cursor-pointer items-center gap-2 rounded-full border p-2 text-3xl shadow">
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
        )}
        <Bell size={16} />
      </PopoverTrigger>
      <PopoverContent className={"w-[350px] p-0"} side="bottom" align="end">
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

              <TabsContent value="receive" className="mt-2">
                {receivedNotifications.length > 0 ? (
                  <ul className="space-y-1">
                    {receivedNotifications.map((notification) => (
                      <li
                        key={notification._id}
                        className="bg-dark-bg dark:hover:bg-dark-hover rounded-md p-2 transition-all duration-300 hover:bg-gray-50"
                      >
                        {generateNotificationMessage(notification)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No new notifications. Check back later for updates.</p>
                )}
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
