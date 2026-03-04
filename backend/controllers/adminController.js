import Payment from '../models/Payment.js';
import Result from '../models/Result.js';
import Test from '../models/Test.js';
import User from '../models/User.js';

export const getDashboardStats = async (req, res) => {
  const [totalStudents, activeUsers, testPerformance, revenueSummary] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'student', updatedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }),
    Result.aggregate([{ $group: { _id: '$testId', avgScore: { $avg: '$score' }, attempts: { $sum: 1 } } }]),
    Payment.aggregate([{ $match: { status: 'success' } }, { $group: { _id: null, revenue: { $sum: '$amount' } } }])
  ]);

  const tests = await Test.find({}, 'title').lean();
  const testMap = Object.fromEntries(tests.map((t) => [t._id.toString(), t.title]));

  const chartData = testPerformance.map((t) => ({
    test: testMap[t._id.toString()] || 'Unknown Test',
    average: Number(t.avgScore.toFixed(2)),
    attempts: t.attempts
  }));

  res.json({
    totalStudents,
    activeUsers,
    revenue: revenueSummary[0]?.revenue || 0,
    testPerformance: chartData
  });
};
