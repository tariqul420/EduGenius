import BlogForm from "./blog-form";

export default function AddBlog({ userId, categories, pathname }) {
  return (
    <BlogForm
      userId={userId}
      categories={categories}
      pathname={pathname}
      isUpdate={false}
    />
  );
}
