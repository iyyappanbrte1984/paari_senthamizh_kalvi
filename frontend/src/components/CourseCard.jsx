import { motion } from 'framer-motion';
import { FaClock, FaRupeeSign, FaStar } from 'react-icons/fa';

const CourseCard = ({ course, onEnroll }) => (
  <motion.div
    whileHover={{ y: -12, scale: 1.02, rotateY: 5 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="glass-ultra card-ultra-hover group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 interactive-element"
  >
    {/* Ultra-modern gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

    {/* Animated border */}
    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-500 animate-border-flow" />

    {/* Floating particles */}
    <div className="absolute top-4 right-4 w-3 h-3 bg-primary-400 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-60" />
    <div className="absolute bottom-4 left-4 w-2 h-2 bg-secondary-400 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-60" style={{ animationDelay: '0.5s' }} />
    <div className="absolute top-1/2 left-6 w-1 h-1 bg-accent-400 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-60" style={{ animationDelay: '1s' }} />

    <div className="relative z-10">
      {/* Course title with ultra-modern gradient */}
      <motion.h3
        whileHover={{ scale: 1.02 }}
        className="text-xl font-bold text-gradient-ultra mb-3 group-hover:scale-105 transition-transform duration-300 animate-text-shimmer"
      >
        {course.title}
      </motion.h3>

      {/* Description with enhanced typography */}
      <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors duration-300">{course.description}</p>

      {/* Enhanced features */}
      <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full"
        >
          <FaClock className="text-primary-500" />
          <span>{course.duration}</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full"
        >
          <FaStar className="text-accent-500" />
          <span>{course.rating || '4.8'}</span>
        </motion.div>
      </div>

      {/* Enhanced price and CTA */}
      <div className="flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 px-4 py-2 rounded-2xl"
        >
          <FaRupeeSign className="text-primary-600 dark:text-primary-400" />
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{course.price}</span>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">/course</span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="btn-ultra-primary text-sm px-6 py-3 shadow-glow-ultra hover:shadow-glow-ultra"
          onClick={onEnroll}
        >
          <span className="relative z-10 flex items-center gap-2">
            <FaRocket className="h-4 w-4" />
            Enroll Now
          </span>
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </motion.button>
      </div>
    </div>

    {/* Ultra-modern decorative elements */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-r from-accent-400/20 to-primary-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"
    />

    {/* Interactive hover effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-slide-in-left" />
  </motion.div>
);

export default CourseCard;
