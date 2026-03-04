import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const courses = await Course.find(filter).sort({ createdAt: -1 });
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};
