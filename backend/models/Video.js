import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    videoUrl: { type: String, required: true },
    isYouTube: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Video', videoSchema);
