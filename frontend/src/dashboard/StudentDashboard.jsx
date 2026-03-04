import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const StudentDashboard = () => {
  const data = useMemo(() => ({
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    datasets: [{ label: 'Marks History', data: [45, 52, 60, 71], borderColor: '#2563eb', tension: 0.35 }],
  }), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {['Profile', 'Enrolled Courses', 'Available Tests', 'Completed Tests', 'Study Materials', 'Video Classes'].map((i) => (
          <div key={i} className="bg-white border rounded-xl p-4">{i}</div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">Performance Analytics</h2>
        <Line data={data} />
        <p className="text-sm mt-2">Current rank: 34 • Predicted score: 78</p>
      </div>
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
        <h3 className="font-semibold">AI Study Recommendation</h3>
        <p className="text-sm">Focus on Geometry and Teaching Aptitude this week based on recent performance.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
