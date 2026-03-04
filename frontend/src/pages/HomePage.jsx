import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const courses = ['UG TRB Maths', 'UG TRB Physics', 'UG TRB Chemistry', 'UG TRB Tamil', 'UG TRB English'];

const HomePage = () => (
  <div>
    <section className="bg-gradient-to-r from-primary via-secondary to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">UG TRB Online Coaching & Test Batch</h1>
        <p className="mt-4 text-lg">Live classes, mock tests, previous year question bank and bilingual support.</p>
        <Link to="/register" className="inline-block mt-6 bg-accent px-6 py-3 rounded-full font-semibold">Join Now</Link>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-4">
      {['Live Classes', 'Mock Tests', 'Study Materials', 'Rank Analysis'].map((item) => (
        <motion.div whileHover={{ y: -4 }} key={item} className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold text-primary">{item}</h3>
        </motion.div>
      ))}
    </section>

    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Courses</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course} className="rounded-2xl bg-white p-5 border">
            <h3 className="font-semibold">{course}</h3>
            <p className="text-sm text-slate-500 mt-2">Structured syllabus, daily practice and analytics.</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-2xl border">
        <h3 className="font-semibold">TRB Syllabus Section</h3>
        <p className="text-sm text-slate-600 mt-2">Topic-wise syllabus breakdown for all UG TRB subjects.</p>
      </div>
      <div className="bg-white p-5 rounded-2xl border">
        <h3 className="font-semibold">Previous Year Question Bank</h3>
        <p className="text-sm text-slate-600 mt-2">Solve past-year papers with detailed explanations.</p>
      </div>
      <div className="bg-white p-5 rounded-2xl border">
        <h3 className="font-semibold">Daily Practice Tests</h3>
        <p className="text-sm text-slate-600 mt-2">Attempt daily quizzes with difficulty levels and streak badges.</p>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-bold">Testimonials</h3>
        <p className="mt-3 text-slate-600">“Clear explanations and test analytics improved my score quickly.”</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-xl font-bold">About Institute</h3>
        <p className="mt-3 text-slate-600">Focused on Tamil Nadu UG TRB preparation with experienced faculty and modern online delivery.</p>
      </div>
    </section>
  </div>
);

export default HomePage;
