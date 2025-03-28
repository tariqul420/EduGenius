import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

export default function Notification() {
  return (
    <Popover>
      <PopoverTrigger className="relative flex cursor-pointer items-center gap-2 rounded-full bg-gray-500 p-2 text-3xl">
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 drop-shadow-2xl" />
        <Bell size={16} />
      </PopoverTrigger>
      <PopoverContent>
        <Alert>
          <AlertDescription>
            You have no new notifications. Check back later for updates.
          </AlertDescription>
        </Alert>
      </PopoverContent>
    </Popover>
  );
}
