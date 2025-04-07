import { DataTable } from "@/components/data-table";
import data from "@/constant/data.json";

export default function Courses() {
  return (
    <section className="py-6">
      <DataTable data={data} />
    </section>
  );
}
