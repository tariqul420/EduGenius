import SparkleIcon from "@/components/icons/SparkleIcon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AISheet({ children }) {
  return (
    <Sheet>
      <SheetTrigger className="hover:bg-accent hover:text-accent-foreground focus:ring-ring flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
        <SparkleIcon className="text-muted-foreground h-4 w-4" />
        <span>
          <span className="hidden lg:inline">AI</span> Suggestion
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Choose a Suggestion</SheetTitle>
        </SheetHeader>
        <div className="text-muted-foreground overflow-y-auto text-sm">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
