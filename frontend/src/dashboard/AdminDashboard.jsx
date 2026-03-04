import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import api from '../services/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get('/admin/dashboard').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const chartData = {
    labels: ['Students', 'Active Users', 'Courses', 'Tests'],
    datasets: [{ data: [stats.totalStudents || 0, stats.activeUsers || 0, stats.totalCourses || 0, stats.totalTests || 0], backgroundColor: ['#2563eb', '#7c3aed', '#f97316', '#22c55e'] }],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">Revenue: ₹{stats.revenue || 0}</div>
        <div className="bg-white border rounded-xl p-4">Avg Score: {stats.averageScore || 0}</div>
        <div className="bg-white border rounded-xl p-4">Payments: Razorpay Ready</div>
        <div className="bg-white border rounded-xl p-4">Notifications: Enabled</div>
      </div>
      <div className="bg-white border rounded-xl p-4">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
