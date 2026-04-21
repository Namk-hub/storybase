import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="blob"></div>
          <div className="blob blob-2"></div>
        </div>
        
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <div className="badge animate-fade-in">
              <Sparkles size={14} className="accent-text" />
              <span>The future of digital storytelling</span>
            </div>
            <h1 className="hero-title">
              Write your story. <br />
              <span className="gradient-text">Inspire the world.</span>
            </h1>
            <p className="hero-description">
              A premium, distraction-free blogging platform designed for creators who value quality and aesthetics. Join a community of modern storytellers today.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn-primary">
                Start Writing <ArrowRight size={18} />
              </Link>
              <Link to="/home" className="btn-secondary">
                Explore Stories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="section-header">
          <h2 className="section-title">Designed for Excellence</h2>
          <p className="section-subtitle">Everything you need to create stunning content without the clutter.</p>
        </div>

        <div className="features-grid">
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Blazing Fast" 
            description="Built with the latest tech for a seamless, instant-loading experience."
          />
          <FeatureCard 
            icon={<Shield size={24} />} 
            title="Distraction Free" 
            description="Pure, clean interface that puts your content front and center."
          />
          <FeatureCard 
            icon={<Globe size={24} />} 
            title="Global Reach" 
            description="Share your ideas with a worldwide audience of high-value readers."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-container">
        <div className="container">
          <div className="cta-card glass">
            <h2>Ready to share your voice?</h2>
            <p>Join thousands of writers who have already found their home on Storybase.</p>
            <Link to="/signup" className="btn-primary">Get Started Now</Link>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo">STORY<span className="accent-text">BASE</span></span>
            <p>© 2026 Storybase Inc. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <Link to="/home">Explore</Link>
              <Link to="/home">Features</Link>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-page {
          overflow: hidden;
        }
        .hero {
          height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
        }
        .hero-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          filter: blur(100px);
          opacity: 0.4;
        }
        .blob {
          position: absolute;
          width: 40vw;
          height: 40vw;
          background: var(--accent);
          border-radius: 50%;
          top: -10%;
          left: -10%;
          animation: drift 20s infinite alternate;
        }
        .blob-2 {
          background: #3b82f6;
          top: auto;
          bottom: -10%;
          right: -10%;
          animation: drift 25s infinite alternate-reverse;
        }
        @keyframes drift {
          from { transform: translate(0, 0); }
          to { transform: translate(100px, 100px); }
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: var(--text-secondary);
        }
        .hero-title {
          font-size: 4.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }
        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin-bottom: 3rem;
        }
        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-normal);
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 107, 44, 0.3);
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          transition: var(--transition-normal);
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--border-hover);
        }

        .features {
          padding: 8rem 2rem;
        }
        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }
        .section-title { font-size: 3rem; margin-bottom: 1rem; }
        .section-subtitle { color: var(--text-secondary); font-size: 1.2rem; }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 3rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 24px;
          transition: var(--transition-normal);
        }
        .feature-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
        }
        .icon-box {
          width: 50px;
          height: 50px;
          background: var(--accent-muted);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .cta-container {
          padding: 4rem 0 8rem 0;
        }
        .cta-card {
          padding: 5rem;
          border-radius: 32px;
          text-align: center;
          background: linear-gradient(135deg, rgba(255, 107, 44, 0.1) 0%, rgba(5, 5, 5, 0.5) 100%);
        }
        .cta-card h2 { font-size: 3rem; margin-bottom: 1rem; }
        .cta-card p { margin-bottom: 3rem; color: var(--text-secondary); font-size: 1.2rem; }

        .footer {
          padding-bottom: 4rem;
          border-top: 1px solid var(--border);
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          padding-top: 4rem;
        }
        .footer-brand p { margin-top: 1rem; color: var(--text-muted); font-size: 0.9rem; }
        .footer-links { display: flex; gap: 4rem; }
        .link-group h4 { margin-bottom: 1.5rem; color: var(--text-primary); font-size: 1rem; }
        .link-group a { display: block; margin-bottom: 0.8rem; color: var(--text-muted); font-size: 0.9rem; }
        .link-group a:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .hero-actions { flex-direction: column; }
          .footer-content { flex-direction: column; gap: 3rem; }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="icon-box">{icon}</div>
    <h3>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>{description}</p>
  </div>
);

export default Landing;
