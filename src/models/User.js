import mongoose from "mongoose";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true }, // Clerk user ID
    email: { type: String, required: true, unique: true }, // Clerk email
    firstName: { type: String }, // Clerk first name
    lastName: { type: String }, // Clerk last name
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
      required: true,
    }, // User role
    phone: { type: String },
    address: { type: String },
    profilePicture: { type: String },
    profession: { type: String },
    education: { type: String },
    aboutMe: { type: String, trim: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("firstName") || this.isModified("lastName")) {
    let slug = slugify(`${this.firstName} ${this.lastName}`, { lower: true });
    const existingUser = await mongoose.models.User.findOne({ slug });

    if (existingUser) {
      const uniqueSuffix = Date.now().toString(36);
      slug = `${slug}-${uniqueSuffix}`;
    }

    this.slug = slug;
  }
  next();
});

export default mongoose.models?.User || mongoose.model("User", userSchema);
