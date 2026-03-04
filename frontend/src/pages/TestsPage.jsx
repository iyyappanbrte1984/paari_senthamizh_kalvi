import { useEffect, useState } from 'react';
import api from '../services/api';

const TestsPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get('/tests').then((res) => setTests(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Online Mock Tests</h1>
      <div className="space-y-3 mt-4">
        {tests.map((t) => (
          <div key={t._id} className="bg-white rounded-xl p-4 border flex justify-between">
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-slate-500">{t.subject} • {t.duration} mins • {t.totalQuestions} questions</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded">Start</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestsPage;
