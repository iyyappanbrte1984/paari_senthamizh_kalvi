import { useEffect, useState } from 'react';
import api from '../services/api';

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/tests').then((res) => setTests(res.data));
  }, []);

  useEffect(() => {
    if (timer <= 0 || !selected) return undefined;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, selected]);

  const startTest = async (id) => {
    const { data } = await api.get(`/tests/${id}`);
    setSelected(data);
    setTimer((data.duration || 1) * 60);
    setResult(null);
    setAnswers({});
  };

  const submit = async () => {
    const payload = Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption }));
    const { data } = await api.post('/tests/submit', { testId: selected._id, answers: payload });
    setResult(data);
    setSelected(null);
  };

  if (!selected) {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">Online Mock Tests</h1>
        {result && <div className="mb-4 rounded bg-green-100 p-4">Score: {result.score}/{result.total} | Rank: {result.rank}</div>}
        <div className="grid gap-4 md:grid-cols-3">
          {tests.map((t) => (
            <button key={t._id} onClick={() => startTest(t._id)} className="glass rounded-2xl p-4 text-left">
              <p className="font-bold">{t.title}</p>
              <p>{t.subject} • {t.duration} min • {t.difficulty}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-3 text-2xl font-bold">{selected.title}</h2>
      <p className="mb-5">Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
      <div className="space-y-4">
        {selected.questions.map((q, i) => (
          <div key={q._id} className="glass rounded-2xl p-4">
            <p className="font-semibold">{i + 1}. {q.question}</p>
            {q.options.map((opt) => (
              <label key={opt} className="block">
                <input type="radio" name={q._id} onChange={() => setAnswers({ ...answers, [q._id]: opt })} /> {opt}
              </label>
            ))}
          </div>
        ))}
      </div>
      <button onClick={submit} className="mt-6 rounded-xl bg-primary px-6 py-2 text-white">Auto Submit</button>
    </div>
  );
};

export default TestPage;
