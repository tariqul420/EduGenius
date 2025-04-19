import DataTable from "@/components/dashboard/data-table";
import { categoryColumns } from "@/constant/columns";
import { getCategories } from "@/lib/actions/category.action";

export default async function AdminCategory({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { categories, pagination } = await getCategories({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search,
  });

  return (
    <section>
      <div className="@container/main flex flex-1 flex-col gap-2 px-4 py-4 lg:px-6">
        <DataTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={categories || []}
          columns={categoryColumns || []}
          uniqueIdProperty="_id"
        />
      </div>
    </section>
  );
}
