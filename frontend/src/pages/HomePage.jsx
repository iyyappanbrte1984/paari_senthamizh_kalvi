import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaPlay, FaBook, FaChartLine, FaUsers, FaStar, FaAward, FaCheckCircle, FaRocket, FaBrain, FaTrophy, FaMoon, FaSun, FaMagic } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';

const courseData = [
  {
    title: 'UG TRB Mathematics',
    description: 'Complete mathematics syllabus with advanced problem-solving techniques and mock tests',
    price: 1999,
    duration: '6 Months',
    rating: 4.9,
    students: 1250
  },
  {
    title: 'UG TRB Physics',
    description: 'Comprehensive physics coverage with practical applications and concept clarity',
    price: 1899,
    duration: '5 Months',
    rating: 4.8,
    students: 980
  },
  {
    title: 'UG TRB Chemistry',
    description: 'In-depth chemistry curriculum with lab-based learning and MCQ practice',
    price: 1799,
    duration: '5 Months',
    rating: 4.7,
    students: 1100
  },
  {
    title: 'UG TRB Tamil Literature',
    description: 'Specialized Tamil pedagogy with literature analysis and teaching methodology',
    price: 1499,
    duration: '4 Months',
    rating: 4.9,
    students: 850
  },
  {
    title: 'UG TRB English',
    description: 'Grammar mastery, language aptitude, and communication skills development',
    price: 1499,
    duration: '4 Months',
    rating: 4.6,
    students: 720
  }
];

const features = [
  {
    icon: FaBrain,
    title: 'AI-Powered Learning',
    description: 'Personalized study plans with intelligent recommendations and adaptive testing'
  },
  {
    icon: FaBook,
    title: 'Comprehensive Study Materials',
    description: 'Topic-wise notes, PDFs, video lectures, and interactive quizzes'
  },
  {
    icon: FaChartLine,
    title: 'Advanced Analytics',
    description: 'Real-time performance tracking, detailed progress analytics, and rank prediction'
  },
  {
    icon: FaUsers,
    title: 'Community & Mentorship',
    description: 'Peer learning groups, expert mentorship, and collaborative study sessions'
  }
];

const stats = [
  { value: '5000+', label: 'Students Enrolled' },
  { value: '95%', label: 'Success Rate' },
  { value: '50+', label: 'Expert Faculty' },
  { value: '10+', label: 'Years Experience' }
];

const HomePage = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to static data if API fails
        setCourses(courseData);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (course) => {
    // Navigate to login for enrollment
    navigate('/login');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-neutral-900' : 'gradient-bg-ultra'} overflow-hidden`}>
      {/* Ultra-modern particle effects */}
      <AnimatePresence>
        {showParticles && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="particles-container"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="particle bg-gradient-to-r from-primary-400 to-secondary-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morphing background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="morphing-shape absolute top-20 left-20 w-64 h-64"
          animate={{
            borderRadius: ["50%", "30% 70% 70% 30% / 30% 30% 70% 70%", "70% 30% 30% 70% / 70% 70% 30% 30%", "50%"],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="morphing-shape absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-accent-400 to-primary-400"
          animate={{
            borderRadius: ["30% 70% 70% 30% / 30% 70% 70% 30%", "70% 30% 30% 70% / 70% 30% 30% 70%", "30% 70% 70% 30% / 30% 70% 70% 30%"],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <Navbar />

      {/* Hero Section with parallax */}
      <motion.section
        style={{ y }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-secondary-600/10 to-accent-600/10" />
        <div className="container-padding mx-auto max-w-7xl section-padding">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 text-sm font-semibold text-primary-700 mb-4 glass-ultra">
                  <FaMagic className="h-4 w-4" />
                  🎓 Tamil Nadu's Premier UG TRB Coaching
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-6xl lg:text-7xl"
              >
                Master Your{' '}
                <span className="text-gradient-ultra animate-text-shimmer">UG TRB</span>{' '}
                Journey
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300 max-w-xl"
              >
                Join thousands of aspiring teachers in Tamil Nadu's most comprehensive UG TRB preparation platform.
                Expert faculty, personalized learning, and guaranteed success.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ultra-primary flex items-center gap-2"
                  onClick={handleStartJourney}
                >
                  <FaRocket className="h-5 w-5" />
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ultra-secondary flex items-center gap-2"
                  onClick={handleWatchDemo}
                >
                  <FaPlay className="h-5 w-5" />
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-20 blur-2xl" />
                <div className="glass relative overflow-hidden rounded-3xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
                      <FaAward className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Success Stories</h3>
                    <p className="text-neutral-600 mb-4">Join 5000+ successful candidates</p>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="h-4 w-4 text-accent-500" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500 italic">
                      "The best TRB preparation platform with excellent faculty and resources."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="container-padding mx-auto max-w-7xl" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-gradient md:text-4xl">{stat.value}</div>
              <div className="text-neutral-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container-padding mx-auto max-w-7xl section-padding relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-4xl mb-4"
          >
            Why Choose{' '}
            <span className="text-gradient-ultra animate-text-shimmer">பாரி செந்தமிழ் கல்வி</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          >
            Ultra-modern learning platform designed specifically for Tamil Nadu's UG TRB aspirants with AI-powered features
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="glass-ultra card-ultra-hover text-center p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400 rounded-full animate-pulse-glow" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary-400 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mx-auto h-16 w-16 rounded-3xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center mb-6 shadow-glow-ultra relative"
              >
                <feature.icon className="h-8 w-8 text-white" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500 to-secondary-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-gradient-ultra transition-all duration-300"
              >
                {feature.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed"
              >
                {feature.description}
              </motion.p>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="container-padding mx-auto max-w-7xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Choose from our comprehensive UG TRB preparation courses
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass rounded-3xl p-6 animate-pulse"
              >
                <div className="h-6 bg-neutral-200 rounded mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-neutral-200 rounded w-16"></div>
                  <div className="h-8 bg-neutral-200 rounded w-20"></div>
                </div>
              </motion.div>
            ))
          ) : (
            courses.map((course, index) => (
              <motion.div
                key={course._id || course.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <CourseCard course={course} onEnroll={() => handleEnroll(course)} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Syllabus & PYQ Section */}
      <section className="container-padding mx-auto max-w-7xl section-padding">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass card-hover p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <FaBook className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">Detailed Syllabus</h3>
            </div>
            <p className="text-neutral-600 mb-6">
              Complete syllabus coverage with unit-wise breakdown, progress tracking, and personalized study plans.
            </p>
            <ul className="space-y-3">
              {['Subject-wise breakdown', 'Unit progress tracking', 'Personalized study plans', 'Regular assessments'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass card-hover p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center">
                <FaChartLine className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">Previous Year Questions</h3>
            </div>
            <p className="text-neutral-600 mb-6">
              Topic-tagged previous year UG TRB question bank with detailed solutions and explanations.
            </p>
            <ul className="space-y-3">
              {['10+ years question bank', 'Topic-wise categorization', 'Detailed explanations', 'Performance analytics'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container-padding mx-auto max-w-7xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Hear from our successful candidates
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: 'Priya S.',
              role: 'Mathematics Teacher',
              content: 'Excellent mock tests and Tamil explanations helped me secure rank 45. The faculty support was outstanding.',
              rating: 5
            },
            {
              name: 'Karthik R.',
              role: 'Physics Teacher',
              content: 'The study materials are comprehensive and the doubt clearing sessions were very helpful.',
              rating: 5
            },
            {
              name: 'Anitha M.',
              role: 'English Teacher',
              content: 'Best platform for TRB preparation. The analytics helped me identify my weak areas and improve.',
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass card-hover p-6 rounded-3xl text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="h-4 w-4 text-accent-500" />
                ))}
              </div>
              <blockquote className="text-neutral-700 mb-4 italic">
                "{testimonial.content}"
              </blockquote>
              <div>
                <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                <div className="text-sm text-neutral-600">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-padding mx-auto max-w-7xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass hero-gradient text-white p-12 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Ready to Start Your TRB Journey?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates. Get expert guidance, comprehensive study materials, and guaranteed success.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-700 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enroll Now - Limited Seats Available
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
