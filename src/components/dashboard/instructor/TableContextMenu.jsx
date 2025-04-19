import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCourse } from "@/lib/actions/course.action";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TableContextMenu({ row }) {
  const router = useRouter();

  function HandleDeleteCourse() {
    toast.promise(
      deleteCourse({
        courseId: row.original._id,
        path: "/instructor/courses",
      }),
      {
        loading: "Deleting course...",
        success: () => {
          router.push("/instructor/courses");
          router.refresh();

          return "Course deleted successfully";
        },
        error: (err) => `Error deleting course: ${err.message}`,
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem>
          <Link href={`/courses/${row.original.slug}`} className="block w-full">
            Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/instructor/courses/${row.original.slug}`}
            className="block w-full"
          >
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={HandleDeleteCourse}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
