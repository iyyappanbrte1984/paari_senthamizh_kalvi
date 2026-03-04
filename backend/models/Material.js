import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    fileUrl: { type: String, required: true },
    type: { type: String, enum: ['pdf', 'notes', 'link'], default: 'pdf' }
  },
  { timestamps: true }
);

export default mongoose.model('Material', materialSchema);
