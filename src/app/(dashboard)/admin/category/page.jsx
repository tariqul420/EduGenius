import CategoryTable from "@/components/dashboard/admin/CategoryTable";
import { getCategories } from "@/lib/actions/category.action";

export default async function AdminCategory({ searchParams }) {
  const { pageSize, pageIndex } = await searchParams;

  const { categories, pagination } = await getCategories();

  return (
    <section>
      <div className="@container/main flex flex-1 flex-col gap-2 py-4">
        <CategoryTable
          pageIndex={Number(pageIndex || "1")}
          pageSize={Number(pageSize || "10")}
          total={pagination?.totalItems || 0}
          data={categories || []}
        />
      </div>
    </section>
  );
}
