import DataTable from "@/components/dashboard/data-table";
import { studentPaymentHistoryColumns } from "@/constant/columns";
import { getPaymentHistory } from "@/lib/actions/payment.action";

export default async function PaymentHistory({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { payments, pagination } = await getPaymentHistory({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search,
  });

  return (
    <section className="@container/main flex flex-1 flex-col gap-2 px-4 py-6 lg:px-6">
      <DataTable
        pageIndex={Number(pageIndex || "1")}
        pageSize={Number(pageSize || "10")}
        total={pagination?.totalItems || 0}
        data={payments || []}
        columns={studentPaymentHistoryColumns || []}
        uniqueIdProperty="_id"
      />
    </section>
  );
}
