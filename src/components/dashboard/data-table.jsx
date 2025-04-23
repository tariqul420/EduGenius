/* eslint-disable no-shadow */
"use client";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

import DataTableColumnSelector from "@/components/shared/DataTableColumnSelector";
import DataTableFooter from "@/components/shared/DataTableFooter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

// Create a separate component for the drag handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// Pass uniqueIdProperty directly to DraggableRow
function DraggableRow({ row, uniqueIdProperty }) {
  const id = row.original[uniqueIdProperty];

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default function DataTable({
  data: initialData = [],
  columns = [],
  pageSize = 10,
  pageIndex = 0,
  total = 0,
  uniqueIdProperty = "_id",
  defaultSort = [],
  enableRowSelection = true,
}) {
  // States for table functionality
  const [data, setData] = React.useState(initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState(defaultSort);
  const [pagination, setPagination] = React.useState({
    pageIndex: pageIndex ? pageIndex - 1 : 0,
    pageSize,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  // Store uniqueIdProperty in a ref to avoid it being undefined during renders
  const uniqueIdRef = React.useRef(uniqueIdProperty);
  uniqueIdRef.current = uniqueIdProperty;

  // Generate draggable IDs
  const dataIds = React.useMemo(() => {
    // Add safety checks
    if (!data || !Array.isArray(data)) return [];
    return data.map((item) => item?.[uniqueIdRef.current]).filter(Boolean);
  }, [data]);

  // Set up table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => {
      const id = row[uniqueIdRef.current];
      return id ? id.toString() : "";
    },
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Handle drag and drop reordering
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((dataTwo) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(dataTwo, oldIndex, newIndex);
        }
        return dataTwo;
      });
    }
  }

  // Update data when initialData changes
  React.useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: searchQuery,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["search"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParams, router]);

  const pathName = usePathname();

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex w-full items-center">
          <div className="flex flex-wrap justify-center gap-4 sm:flex-row sm:items-center sm:justify-normal sm:gap-2">
            <DataTableColumnSelector table={table} />
            {pathName === "/instructor/courses" ||
            pathName === "/instructor" ? (
              <Link
                href="/instructor/courses/add-course"
                className="bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium shadow-xs has-[>svg]:px-2.5"
              >
                <IconPlus size={16} />
                <span>Add course</span>
              </Link>
            ) : null}
            <div className="dark:bg-transparent rounded-md flex items-center gap-2 overflow-hidden bg-white">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:0 h-8 w-[200px] rounded-none border text-sm outline-none"
                placeholder="Search by title or name"
              />
            </div>
          </div>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto rounded-lg"
      >
        <div className="overflow-hidden rounded-lg border bg-white dark:bg-transparent">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-light-bg/50 dark:bg-dark-hover sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow
                        key={row.id}
                        row={row}
                        uniqueIdProperty={uniqueIdRef.current}
                      />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
 
          <DataTableFooter
            table={table}
            pageIndex={pagination.pageIndex}
            pageSize={pageSize}
            total={total}
          />
      </TabsContent>
    </Tabs>
  );
}

// Helper function to create a drag column
export function createDragColumn() {
  return {
    id: "drag",
    header: () => null,
    cell: ({ row }) => {
      // Access the id directly from the row original data
      const id = row.original._id || row.id;
      return <DragHandle id={id} />;
    },
  };
}

// Helper function to create a selection checkbox column
export function createSelectionColumn() {
  return {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className={"border-[#e9e4e4] dark:border-[#383838]"}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
