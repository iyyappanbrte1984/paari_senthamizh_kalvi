import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers,
  FaBook,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaUserGraduate,
  FaClipboardList,
  FaVideo,
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUpload
} from 'react-icons/fa';
import api from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalTests: 0,
    totalRevenue: 0
  });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/courses')
      ]);

      setUsers(usersRes.data.users || []);
      setCourses(coursesRes.data.courses || []);
      setStats({
        totalUsers: usersRes.data.users?.length || 0,
        totalCourses: coursesRes.data.courses?.length || 0,
        totalTests: 0, // Will be implemented later
        totalRevenue: 0 // Will be implemented later
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'courses', label: 'Courses', icon: FaBook },
    { id: 'tests', label: 'Tests', icon: FaClipboardList },
    { id: 'videos', label: 'Videos', icon: FaVideo },
    { id: 'materials', label: 'Materials', icon: FaFileAlt },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-ultra p-6 rounded-2xl card-ultra-hover ${darkMode ? 'glass-ultra-dark' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={12}
        />
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={FaBook}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          trend={8}
        />
        <StatCard
          title="Active Tests"
          value={stats.totalTests}
          icon={FaClipboardList}
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend={15}
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={FaChartLine}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend={23}
        />
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`glass-ultra p-6 rounded-2xl ${darkMode ? 'glass-ultra-dark' : ''}`}
      >
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New user registered', user: 'Priya S', time: '2 minutes ago' },
            { action: 'Course completed', user: 'Arun K', time: '15 minutes ago' },
            { action: 'Test submitted', user: 'Kavi R', time: '1 hour ago' },
            { action: 'Material uploaded', user: 'Admin', time: '2 hours ago' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
            >
              <div>
                <p className="text-neutral-900 dark:text-white font-medium">{activity.action}</p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">by {activity.user}</p>
              </div>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Users Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-ultra-primary flex items-center gap-2"
        >
          <FaPlus className="h-4 w-4" />
          Add User
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search users..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${darkMode ? 'glass-ultra-dark' : 'glass-ultra'}`}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-ultra-secondary flex items-center gap-2"
        >
          <FaFilter className="h-4 w-4" />
          Filter
        </motion.button>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-ultra rounded-2xl overflow-hidden ${darkMode ? 'glass-ultra-dark' : ''}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-100 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      >
                        <FaEye className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors duration-200"
                      >
                        <FaEdit className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      >
                        <FaTrash className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Courses Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-ultra-primary flex items-center gap-2"
        >
          <FaPlus className="h-4 w-4" />
          Add Course
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-ultra p-6 rounded-2xl card-ultra-hover ${darkMode ? 'glass-ultra-dark' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{course.description}</p>
              </div>
              <span className="text-2xl font-bold text-gradient-ultra">₹{course.price}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <span>{course.duration}</span>
              <span>{course.syllabus?.length || 0} topics</span>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 btn-ultra-secondary text-sm py-2"
              >
                <FaEye className="h-3 w-3 inline mr-1" />
                View
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm py-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200"
              >
                <FaEdit className="h-3 w-3 inline mr-1" />
                Edit
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg-ultra flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-neutral-900' : 'gradient-bg-ultra'} transition-all duration-500`}>
      {/* Particles Background */}
      <div className="particles-container">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`particle bg-primary-400 absolute rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`fixed left-0 top-0 h-full w-80 glass-ultra z-50 p-6 ${darkMode ? 'glass-ultra-dark' : ''}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gradient-ultra">பாரி செந்தமிழ் கல்வி</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow-ultra'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <FaSignOutAlt className="h-5 w-5" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 glass-ultra backdrop-blur-2xl border-b border-neutral-200/20 dark:border-neutral-700/20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 lg:hidden"
              >
                <FaBars className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white capitalize">{activeTab}</h1>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-neutral-900 dark:text-white font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'courses' && renderCourses()}
          {/* Add other tab renders here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;