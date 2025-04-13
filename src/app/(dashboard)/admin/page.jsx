import AdminDashboard from "@/components/AdminDashboard";

export default function dashboard() {
  return (
    <section className="min-h-screen  py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your certificates
        </p>
      </div>
      <AdminDashboard></AdminDashboard>
    </div>
    </section>
  );
}
