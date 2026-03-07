import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass sticky top-4 z-50 mx-auto mt-2 flex w-[95%] max-w-7xl items-center justify-between rounded-2xl px-6 py-4 shadow-2xl"
    >
      <Link to="/" className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-xl">
          ப
        </div>
        <span className="text-xl font-bold text-gradient hidden sm:block">பாரி செந்தமிழ் கல்வி</span>
        <span className="text-lg font-bold text-primary-700 sm:hidden">பாரி</span>
      </Link>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow-accent"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
          className="rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow-secondary"
        >
          {language === 'en' ? 'தமிழ்' : 'EN'}
        </motion.button>
        {user && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(true)}
            className="relative rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow-primary"
          >
            <FaBell />
          </motion.button>
        )}

        {!user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="btn-primary text-sm">
                Register
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to={user.role === 'admin' ? '/admin' : '/dashboard'}
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-300"
            >
              Dashboard
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="btn-accent text-sm"
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
    <NotificationPanel
      isOpen={showNotifications}
      onClose={() => setShowNotifications(false)}
    />
  </>
);

export default Navbar;
