import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true },
);

// Pre-save middleware to generate unique certificateId
certificateSchema.pre("save", async function (next) {
  // Only generate if certificateId is not already set
  if (!this.certificateId) {
    const prefix = "CERT-";
    let isUnique = false;
    let newCertificateId;

    // Keep generating until we find a unique ID
    while (!isUnique) {
      // Generate a random 11-digit number (10000000000 to 99999)
      const randomNum = Math.floor(10000000000 + Math.random() * 99999999999);
      newCertificateId = `${prefix}${randomNum}`;

      // Check if this ID already exists in the database
      const existingCertificate = await mongoose.models.Certificate.findOne({
        certificateId: newCertificateId,
      });

      // If no existing certificate is found, the ID is unique
      if (!existingCertificate) {
        isUnique = true;
      }
    }

    this.certificateId = newCertificateId;
  }
  next();
});

export default mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);
