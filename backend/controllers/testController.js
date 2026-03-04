import Test from '../models/Test.js';
import Result from '../models/Result.js';

export const getTests = async (req, res) => {
  const tests = await Test.find().sort({ createdAt: -1 });
  res.json(tests);
};

export const getTestById = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });
  res.json(test);
};

export const createTest = async (req, res) => {
  const test = await Test.create(req.body);
  res.status(201).json(test);
};

export const submitTest = async (req, res) => {
  const { testId, answers } = req.body;
  const test = await Test.findById(testId);
  if (!test) return res.status(404).json({ message: 'Test not found' });

  const score = answers.reduce((acc, ans, idx) => (test.questions[idx]?.correctAnswer === ans ? acc + 1 : acc), 0);
  const result = await Result.create({
    userId: req.user._id,
    testId,
    score,
    answers: answers.map((a, i) => ({ questionIndex: i, selectedAnswer: a })),
    predictedScore: Math.min(test.totalQuestions, Math.round(score * 1.1)),
  });

  const higherScores = await Result.countDocuments({ testId, score: { $gt: score } });
  result.rank = higherScores + 1;
  await result.save();

  res.status(201).json(result);
};
