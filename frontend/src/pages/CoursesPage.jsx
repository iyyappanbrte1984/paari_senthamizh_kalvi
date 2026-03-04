import { useEffect, useState } from 'react';
import api from '../services/api';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Course Management</h1>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white border rounded-2xl p-5">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{c.description}</p>
            <p className="mt-2 font-bold text-secondary">₹{c.price}</p>
            <p className="text-sm">Duration: {c.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
