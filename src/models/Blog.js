import mongoose from "mongoose";
import slugify from "slugify";
import Category from "./Category";
import User from "./User";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: User },
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category },
  },
  { timestamps: true },
);

// Pre-save middleware to generate a unique slug from the title
blogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let uniqueSlug = slug;

    // Check if the slug already exists in the database
    const existingBlog = await mongoose.models.Blog.findOne({
      slug: uniqueSlug,
    });
    let counter = 1;

    // If the slug exists, append a unique suffix
    while (existingBlog) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
      const duplicateCheck = await mongoose.models.Blog.findOne({
        slug: uniqueSlug,
      });
      if (!duplicateCheck) break;
    }

    this.slug = uniqueSlug;
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
