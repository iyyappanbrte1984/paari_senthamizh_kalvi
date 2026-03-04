import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    languagePreference: { type: String, enum: ['en', 'ta'], default: 'en' },
    streak: { type: Number, default: 0 },
    badges: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
