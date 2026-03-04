import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  },
  { _id: false }
);

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    duration: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    questions: [questionSchema],
    isDailyPractice: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Test', testSchema);
