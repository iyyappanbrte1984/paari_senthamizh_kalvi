import User from '../models/User.js';
import Course from '../models/Course.js';
import Test from '../models/Test.js';
import Result from '../models/Result.js';
import Payment from '../models/Payment.js';

export const getAdminDashboard = async (req, res) => {
  const [totalStudents, activeUsers, totalCourses, totalTests, revenueAgg, avgScoreAgg] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    User.countDocuments({ role: 'student', updatedAt: { $gte: new Date(Date.now() - 7 * 24 * 3600 * 1000) } }),
    Course.countDocuments(),
    Test.countDocuments(),
    Payment.aggregate([{ $match: { status: 'success' } }, { $group: { _id: null, revenue: { $sum: '$amount' } } }]),
    Result.aggregate([{ $group: { _id: null, averageScore: { $avg: '$score' } } }]),
  ]);

  res.json({
    totalStudents,
    activeUsers,
    totalCourses,
    totalTests,
    revenue: revenueAgg[0]?.revenue || 0,
    averageScore: Number((avgScoreAgg[0]?.averageScore || 0).toFixed(2)),
    pushNotificationReady: true,
  });
};
