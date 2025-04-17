import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function DataTableFooter({ table, pageSize, pageIndex, total }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              let newUrl = "";

              if (value) {
                newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: "pageSize",
                  value: value,
                });
              } else {
                newUrl = removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["pageSize"],
                });
              }
              router.push(newUrl, { scroll: false });
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {pageIndex} of {Math.ceil(total / pageSize)}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              let newUrl = "";

              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "pageIndex",
                value: 1,
              });
              router.push(newUrl, { scroll: false });
              () => table.setPageIndex(1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              let newUrl = "";

              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "pageIndex",
                value: pageIndex--,
              });
              table.previousPage();
              router.push(newUrl, { scroll: false });
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              let newUrl = "";
              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "pageIndex",
                value: pageIndex++,
              });
              () => table.nextPage();
              router.push(newUrl, { scroll: false });
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => {
              let newUrl = "";
              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "pageIndex",
                value: table.getPageCount(),
              });
              table.setPageIndex(table.getPageCount());
              router.push(newUrl, { scroll: false });
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
