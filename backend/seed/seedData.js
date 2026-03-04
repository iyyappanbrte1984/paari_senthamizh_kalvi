import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Course from '../models/Course.js';
import Material from '../models/Material.js';
import Payment from '../models/Payment.js';
import Question from '../models/Question.js';
import Test from '../models/Test.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany(),
    Course.deleteMany(),
    Test.deleteMany(),
    Question.deleteMany(),
    Material.deleteMany(),
    Video.deleteMany(),
    Payment.deleteMany()
  ]);

  const password = await bcrypt.hash('Admin@123', 10);
  const [admin, student] = await User.create([
    { name: 'Admin User', email: 'admin@ugtrb.com', phone: '9000000001', password, role: 'admin' },
    { name: 'Priya', email: 'student@ugtrb.com', phone: '9000000002', password, role: 'student' }
  ]);

  const courses = await Course.create([
    { title: 'UG TRB Maths', description: 'Complete UG TRB Maths coaching', price: 1999, duration: '6 Months', syllabus: ['Algebra', 'Calculus'], languageSupport: ['Tamil', 'English'] },
    { title: 'UG TRB Physics', description: 'Concept-driven coaching + mock tests', price: 1899, duration: '5 Months', syllabus: ['Mechanics', 'Modern Physics'], languageSupport: ['Tamil', 'English'] }
  ]);

  const test = await Test.create({ title: 'Daily Practice Test 1', subject: 'Maths', duration: 30, totalQuestions: 2, difficulty: 'easy', isDailyQuiz: true });
  await Question.create([
    {
      testId: test._id,
      question: 'If x + 3 = 7, what is x?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '4',
      explanation: 'x = 7 - 3 = 4'
    },
    {
      testId: test._id,
      question: 'Derivative of x^2 is?',
      options: ['x', '2x', 'x^2', '2'],
      correctAnswer: '2x',
      explanation: 'd/dx(x^2) = 2x'
    }
  ]);

  await Material.create({ title: 'Algebra Quick Notes', courseId: courses[0]._id, fileUrl: 'https://example.com/algebra.pdf', type: 'pdf' });
  await Video.create({ title: 'TRB Orientation Class', courseId: courses[0]._id, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' });
  await Payment.create({ userId: student._id, courseId: courses[0]._id, amount: 1999, status: 'success', transactionId: 'TXN-DEMO-001' });

  console.log('Seed complete');
  await mongoose.connection.close();
};

seed();
