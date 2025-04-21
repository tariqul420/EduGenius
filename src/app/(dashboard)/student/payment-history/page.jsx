import { getPaymentHistory } from "@/lib/actions/payment.action";

export default async function PaymentHistory({ searchParams }) {
  const { pageSize, pageIndex, search } = await searchParams;

  const { payments, pagination } = await getPaymentHistory({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search,
  });

  console.log(payments, pagination);
  return (
    <section className="@container/main flex flex-1 flex-col gap-2 px-4 py-6 lg:px-6"></section>
  );
}
