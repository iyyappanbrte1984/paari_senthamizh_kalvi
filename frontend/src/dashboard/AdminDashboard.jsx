import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useFetch from '../hooks/useFetch';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { data, loading } = useFetch(() => api.get('/admin/dashboard'), []);

  if (loading) return <p className="p-6">Loading admin analytics...</p>;

  const chart = {
    labels: data.testPerformance?.map((x) => x.test) || [],
    datasets: [{ label: 'Average Score', data: data.testPerformance?.map((x) => x.average) || [], backgroundColor: '#f97316' }]
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-2xl p-5">Total Students: {data.totalStudents}</div>
        <div className="glass rounded-2xl p-5">Active Users: {data.activeUsers}</div>
        <div className="glass rounded-2xl p-5">Revenue: ₹{data.revenue}</div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h2 className="mb-4 text-xl font-semibold">Test Performance</h2>
        <Bar data={chart} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-4">Manage Students / Courses / Payments</div>
        <div className="glass rounded-2xl p-4">Create Test Series / Upload Materials / Videos</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
