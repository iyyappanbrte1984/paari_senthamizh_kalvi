import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="glass sticky top-0 z-50 mx-auto mt-2 flex w-[95%] items-center justify-between rounded-2xl px-6 py-3">
      <Link to="/" className="text-lg font-bold text-primary">UG TRB Academy</Link>
      <div className="flex items-center gap-4">
        <button onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')} className="rounded-xl bg-secondary px-3 py-1 text-white">
          {language === 'en' ? 'தமிழ்' : 'EN'}
        </button>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="rounded-xl bg-primary px-3 py-1 text-white">Register</Link>
          </>
        ) : (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>Dashboard</Link>
            <button onClick={logout} className="rounded-xl bg-accent px-3 py-1 text-white">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
