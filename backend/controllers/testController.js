import Question from '../models/Question.js';
import Result from '../models/Result.js';
import Test from '../models/Test.js';

export const getTests = async (req, res) => {
  const tests = await Test.find().sort({ createdAt: -1 });
  res.json(tests);
};

export const createTest = async (req, res) => {
  const { title, subject, duration, questions, difficulty, isDailyQuiz } = req.body;
  const test = await Test.create({
    title,
    subject,
    duration,
    totalQuestions: questions.length,
    difficulty,
    isDailyQuiz
  });

  await Question.insertMany(questions.map((q) => ({ ...q, testId: test._id })));
  res.status(201).json(test);
};

export const getTestById = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });
  const questions = await Question.find({ testId: test._id }).select('-correctAnswer');
  return res.json({ ...test.toObject(), questions });
};

export const submitTest = async (req, res) => {
  const { testId, answers } = req.body;
  const questions = await Question.find({ testId });
  const score = questions.reduce((acc, q) => {
    const submitted = answers.find((a) => a.questionId === q._id.toString());
    return submitted?.selectedOption === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const result = await Result.create({ userId: req.user._id, testId, score, answers });
  const higherScores = await Result.countDocuments({ testId, score: { $gt: score } });
  result.rank = higherScores + 1;
  await result.save();

  res.json({ score, total: questions.length, rank: result.rank, resultId: result._id });
};

export const getLeaderboard = async (req, res) => {
  const { testId } = req.params;
  const ranking = await Result.find({ testId })
    .sort({ score: -1, createdAt: 1 })
    .populate('userId', 'name')
    .limit(50);
  res.json(ranking);
};
