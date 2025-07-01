import { Bell } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
          <span className="bg-dark-btn absolute top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full" />
        )}
        <Bell size={16} />
      </PopoverTrigger>
      <PopoverContent className={"w-[350px] p-0"} side="bottom" align="end">
        <Alert>
          <AlertTitle className={"mb-2"}>Notifications</AlertTitle>
          <AlertDescription>
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
          </AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  );
}
