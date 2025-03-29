import AddBlog from "@/components/dashboard/instructor/AddBlog";

export default function MyBlogs() {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <AddBlog />
      </div>
    </section>
  );
}
