import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import api from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post('/auth/register', form);
      setMessage('Registration successful! Welcome email sent. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'Full Name', icon: FaUser },
    { name: 'email', type: 'email', placeholder: 'Email Address', icon: FaEnvelope },
    { name: 'phone', type: 'tel', placeholder: 'Phone Number', icon: FaPhone },
    { name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Password', icon: FaLock }
  ];

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mb-4"
          >
            <span className="text-2xl font-bold text-white">ப</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Join Our Community</h1>
          <p className="text-neutral-600">Start your UG TRB preparation journey today</p>
        </div>

        {/* Registration Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onSubmit={onSubmit}
          className="glass rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Create Account</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 rounded-xl bg-error/10 border border-error/20 text-error text-sm"
            >
              {error}
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 rounded-xl bg-success/10 border border-success/20 text-success text-sm"
            >
              {message}
            </motion.div>
          )}

          <div className="space-y-4">
            {inputFields.map((field) => (
              <div key={field.name} className="relative">
                <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  required
                />
                {field.name === 'password' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-300"
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Terms and Conditions */}
          <div className="mt-4 mb-6">
            <label className="flex items-start space-x-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </motion.button>

          {/* Login Link */}
          <p className="text-center text-neutral-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300"
            >
              Sign In
            </Link>
          </p>
        </motion.form>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: '🎓', text: 'Expert Faculty' },
            { icon: '📚', text: 'Study Materials' },
            { icon: '📊', text: 'Analytics' }
          ].map((benefit, index) => (
            <div key={index} className="text-neutral-600">
              <div className="text-2xl mb-1">{benefit.icon}</div>
              <div className="text-xs">{benefit.text}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
