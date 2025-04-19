
export default async function CourseModulesPage({ params }) {
  const { slug } =await params;

  console.log(slug);

  return (
    <div>page</div>
  );
}
