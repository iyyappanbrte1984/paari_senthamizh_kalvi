import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  return res.json(course);
};
