import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

// Pre-save middleware to generate a slug from the category name
categorySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let slug = slugify(this.name, { lower: true });
    const existingUser = await mongoose.models?.Category.findOne({ slug });

    if (existingUser) {
      const uniqueSuffix = Date.now().toString(36);
      slug = `${slug}-${uniqueSuffix}`;
    }

    this.slug = slug;
  }
  next();
});

export default mongoose.models?.Category ||
  mongoose.model("Category", categorySchema);
