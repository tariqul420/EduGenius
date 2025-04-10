
import { StudentsDataTable } from "@/components/StudentsDataTable";
import data from "@/constant/data.json";

export default function StudentCourse() {
  return   <section className="py-6">
        <StudentsDataTable data={data} />
      </section>;
}
