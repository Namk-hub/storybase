import { Link, useNavigate } from 'react-router-dom';
import { PenSquare, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="glass sticky-top" style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
          STORY<span className="accent-text">BASE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/home" className="nav-link">Explore</Link>
          {user ? (
            <>
              <Link to="/create" className="btn-create" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                background: 'var(--accent)',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                fontWeight: 600
              }}>
                <PenSquare size={18} /> Write
              </Link>
              <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{user.name}</span>
                <button onClick={handleLogout} className="btn-logout" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" className="nav-link" style={{ paddingTop: '0.5rem' }}>Login</Link>
              <Link to="/signup" className="btn-signup" style={{ 
                background: 'var(--text-primary)', 
                color: 'var(--bg-primary)',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                fontWeight: 600
              }}>
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
        .nav-link {
          font-weight: 500;
          color: var(--text-secondary);
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
