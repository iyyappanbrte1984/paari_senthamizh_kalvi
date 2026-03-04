import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    syllabus: [{ topic: String, weightage: Number }],
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
