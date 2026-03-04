import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    duration: { type: String, required: true },
    syllabus: [{ type: String }],
    languageSupport: [{ type: String, enum: ['Tamil', 'English'] }]
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
