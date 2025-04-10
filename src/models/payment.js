import mongoose from 'mongoose';
import Course from './Course';
import User from './User';

const paymentSchema = new mongoose.Schema({
  // courseId: { type: String, required: true },
  // courseTitle: { type: String, required: true },
  // userId: { type: String, required: true },
  // userEmail: { type: String, required: true },
  // userName: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  course: {type: mongoose.Schema.Types.ObjectId, ref: Course},
  student: {type: mongoose.Schema.Types.ObjectId, ref: User},
  // originalPrice: { type: Number, required: true },
  // discountRate: { type: Number, default: 0 },
  // finalPrice: { type: Number, required: true },
  // paymentStatus: { type: String, default: 'completed' },
  // paymentDate: { type: Date, default: Date.now },
  // courseDetails: { type: Object, default: {} }
}, { timestamps: true });
paymentSchema.pre('save', async function(next) {
  if (this.isModified('course')) {
    const course = await Course.findById(this.course);
    if (!course) {
      throw new Error('Course not found');
    }
  }
  if (this.isModified('student')) {
    const student = await User.findById(this.student);
    if (!student) {
      throw new Error('Student not found');
    }
  }
  next();
});
export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);