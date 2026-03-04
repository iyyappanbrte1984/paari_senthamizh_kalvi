import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const courseData = [
  { title: 'UG TRB Maths', description: 'Full syllabus + smart tests', price: 1999, duration: '6 Months' },
  { title: 'UG TRB Physics', description: 'Concept revision + PYQ', price: 1899, duration: '5 Months' },
  { title: 'UG TRB Chemistry', description: 'MCQ practice + guidance', price: 1799, duration: '5 Months' },
  { title: 'UG TRB Tamil', description: 'Tamil pedagogy special batch', price: 1499, duration: '4 Months' },
  { title: 'UG TRB English', description: 'Grammar + language aptitude', price: 1499, duration: '4 Months' }
];

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <Navbar />
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-extrabold text-slate-800 md:text-6xl">
          {t.heroTitle}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">{t.heroSub}</p>
        <button className="mt-8 rounded-2xl bg-primary px-7 py-3 text-white shadow-lg hover:bg-blue-700">{t.joinNow}</button>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-4">
        {['Live Classes', 'Mock Tests', 'Study Materials', 'Rank Analysis'].map((f) => (
          <div key={f} className="glass rounded-2xl p-4 text-center font-semibold text-secondary">{f}</div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">Courses</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {courseData.map((course) => <CourseCard key={course.title} course={course} />)}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-12 md:grid-cols-2">
        <div className="glass rounded-2xl p-6"><h3 className="text-2xl font-bold">{t.trbSyllabus}</h3><p>Detailed syllabus by subject and unit-wise progress tracking.</p></div>
        <div className="glass rounded-2xl p-6"><h3 className="text-2xl font-bold">{t.prevYear}</h3><p>Topic-tagged previous year UG TRB question bank with solutions.</p></div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-4 text-3xl font-bold">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {['Excellent mock tests!', 'Tamil explanations are very clear.', 'Analytics helped improve rank.'].map((text) => (
            <blockquote key={text} className="glass rounded-2xl p-4">“{text}”</blockquote>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
