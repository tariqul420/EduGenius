import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuizAssignment() {
  return (
    <Tabs defaultValue="quiz" className="mt-8 w-full">
      <TabsList className="bg-light-bg dark:bg-dark-hover w-full rounded px-1.5 py-5 shadow-sm">
        <TabsTrigger
          value="quiz"
          className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Quiz
        </TabsTrigger>

        <TabsTrigger
          value="assignment"
          className="data-[state=active]:text-main dark:from-dark-bg dark:to-dark-hover rounded from-white to-white px-6 py-4 text-sm font-medium text-gray-500 transition-all data-[state=active]:bg-gradient-to-b data-[state=active]:shadow-sm dark:data-[state=active]:bg-gradient-to-b dark:data-[state=active]:text-white"
        >
          Assignment
        </TabsTrigger>
      </TabsList>
      {/* about ===================== */}
      <TabsContent value="quiz" className="mt-6">
        Quizzes
      </TabsContent>
      {/* course =================== */}
      <TabsContent value="assignment" className="mt-6">
        Assignment form
      </TabsContent>
    </Tabs>
  );
}
