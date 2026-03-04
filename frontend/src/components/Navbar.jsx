import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/90 sticky top-0 border-b z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-primary text-xl">UG TRB Academy</Link>
        <div className="flex gap-4 items-center text-sm">
          <Link to="/courses">Courses</Link>
          <Link to="/tests">Mock Tests</Link>
          <Link to="/materials">Materials</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>Dashboard</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-secondary text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-primary text-white">Join Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
