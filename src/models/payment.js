import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  originalPrice: { type: Number, required: true },
  discountRate: { type: Number, default: 0 },
  finalPrice: { type: Number, required: true },
  paymentStatus: { type: String, default: 'completed' },
  paymentDate: { type: Date, default: Date.now },
  courseDetails: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);