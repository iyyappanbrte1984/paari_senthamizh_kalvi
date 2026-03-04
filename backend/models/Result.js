import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, default: 0 },
    answers: [{ questionId: String, selectedOption: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Result', resultSchema);
