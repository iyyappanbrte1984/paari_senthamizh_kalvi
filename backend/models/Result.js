import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, default: 0 },
    answers: [{ questionIndex: Number, selectedAnswer: Number }],
    predictedScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Result', resultSchema);
