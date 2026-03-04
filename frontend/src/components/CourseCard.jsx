import { motion } from 'framer-motion';

const CourseCard = ({ course }) => (
  <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-5">
    <h3 className="text-xl font-bold text-primary">{course.title}</h3>
    <p className="mt-2 text-slate-600">{course.description}</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="font-semibold text-secondary">₹{course.price}</span>
      <span>{course.duration}</span>
    </div>
  </motion.div>
);

export default CourseCard;
