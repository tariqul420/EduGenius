import BlogForm from "./BlogForm";

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
