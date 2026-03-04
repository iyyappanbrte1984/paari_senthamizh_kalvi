import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import useFetch from '../hooks/useFetch';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
  const { data: tests } = useFetch(() => api.get('/tests'), []);
  const { data: materials } = useFetch(() => api.get('/materials'), []);
  const { data: videos } = useFetch(() => api.get('/videos'), []);

  const marksData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    datasets: [{ label: 'Marks History', data: [65, 74, 81, 88], backgroundColor: '#2563eb' }]
  };

  const progressData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{ data: [68, 32], backgroundColor: ['#7c3aed', '#e5e7eb'] }]
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {['Profile', 'Enrolled Courses', 'Performance Analytics'].map((card) => (
          <div key={card} className="glass rounded-2xl p-4 font-semibold">{card}</div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-4"><Bar data={marksData} /></div>
        <div className="glass rounded-2xl p-4"><Doughnut data={progressData} /></div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-4"><h2 className="font-bold">Available Tests</h2>{tests.map((t) => <p key={t._id}>{t.title}</p>)}</div>
        <div className="glass rounded-2xl p-4"><h2 className="font-bold">Study Materials</h2>{materials.slice(0, 5).map((m) => <p key={m._id}>{m.title}</p>)}</div>
        <div className="glass rounded-2xl p-4"><h2 className="font-bold">Video Classes</h2>{videos.slice(0, 5).map((v) => <p key={v._id}>{v.title}</p>)}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;
