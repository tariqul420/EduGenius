/* eslint-disable no-undef */
import { getQuizzesForStudent } from "@/lib/actions/quiz.action";

export default async function QuizeSumbissionpage() {
  const { quizzes, pagination } = await getQuizzesForStudent({
    limit: Number(pageSize || 10),
    page: Number(pageIndex || 1),
    search: search?.trim(),
  });
  console.log("quizzes", quizzes);
  return (
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, minima
      delectus ut exercitationem neque, doloremque magni tempora aspernatur
      ratione eveniet, quod labore? Nulla tenetur eaque possimus tempore
      facilis. Quae, suscipit. page
    </div>
  );
}
