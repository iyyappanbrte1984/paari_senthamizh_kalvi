import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Test from '../models/Test.js';

dotenv.config();
await connectDB();

await Promise.all([User.deleteMany(), Course.deleteMany(), Test.deleteMany()]);

const adminPassword = await bcrypt.hash('admin123', 10);
await User.create({ name: 'Admin', email: 'admin@trb.com', phone: '9999999999', password: adminPassword, role: 'admin' });

const courses = await Course.insertMany([
  { title: 'UG TRB Maths', description: 'Comprehensive maths coaching', price: 2499, duration: '6 months' },
  { title: 'UG TRB Physics', description: 'Concept and problem solving', price: 2299, duration: '5 months' },
]);

await Test.create({
  title: 'Daily Practice - Algebra',
  subject: 'Mathematics',
  duration: 30,
  totalQuestions: 2,
  isDailyPractice: true,
  questions: [
    { question: '2 + 2 = ?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'Basic arithmetic', difficulty: 'easy' },
    { question: 'x^2 derivative?', options: ['x', '2x', 'x^3', '2'], correctAnswer: 1, explanation: 'Power rule', difficulty: 'easy' },
  ],
});

console.log('Seed data inserted', courses.length);
process.exit(0);
