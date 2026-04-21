import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = ({ setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      const { token, user, message } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success(message || 'Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card glass"
      >
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus size={28} />
          </div>
          <h1>Create Account</h1>
          <p>Join the Storybase community today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                id="name"
                type="text" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                id="email"
                type="email" 
                placeholder="name@company.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign Up <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login instead</Link></p>
        </div>
      </motion.div>

      <style>{`
        .auth-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(circle at center, rgba(255, 107, 44, 0.05) 0%, transparent 70%);
        }
        .auth-card {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          border-radius: 24px;
        }
        .auth-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .auth-icon {
          width: 60px;
          height: 60px;
          background: var(--accent-muted);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          margin: 0 auto 1.5rem;
        }
        .auth-header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-secondary); }

        .auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
        }
        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          padding: 0.8rem 1rem 0.8rem 3rem;
          border-radius: 12px;
          color: white;
          outline: none;
          transition: var(--transition-fast);
        }
        .input-wrapper input:focus {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.08);
        }

        .auth-submit { width: 100%; justify-content: center; margin-top: 1rem; border: none; cursor: pointer; }
        .auth-footer { text-align: center; margin-top: 2rem; color: var(--text-secondary); font-size: 0.9rem; }
        .auth-footer a { color: var(--accent); font-weight: 600; }
        .auth-footer a:hover { color: var(--accent-hover); }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default Signup;
