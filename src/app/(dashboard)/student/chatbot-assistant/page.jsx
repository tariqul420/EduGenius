import { GrokChat } from "@/components/dashboard/grok-chat";

export default function page() {
  return (
    <section className="@container/main mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="rounded-lg border p-5">
        <GrokChat />
      </div>
    </section>
  );
}
