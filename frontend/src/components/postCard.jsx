import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="post-card"
    >
      <Link to={`/post/${post._id}`} className="card-link">
        <div className="card-image">
          {/* Placeholder for post image */}
          <div className="image-placeholder">
            <span>STORYBASE</span>
          </div>
        </div>
        <div className="card-content">
          <div className="card-meta">
            <span className="category">Insights</span>
            <span className="dot">•</span>
            <span className="read-time">5 min read</span>
          </div>
          <h3 className="card-title">{post.title}</h3>
          <p className="card-excerpt">
            {post.content.substring(0, 120)}...
          </p>
          <div className="card-footer">
            <div className="author-info">
              <div className="author-avatar">{post.author?.name?.charAt(0) || 'A'}</div>
              <span className="author-name">{post.author?.name || 'Anonymous'}</span>
            </div>
            <span className="post-date">{formattedDate}</span>
          </div>
        </div>
      </Link>

      <style>{`
        .post-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          transition: var(--transition-normal);
        }
        .post-card:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .image-placeholder {
          height: 200px;
          background: linear-gradient(135deg, #1a1a1a 0%, #050505 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: 4px;
          color: var(--bg-tertiary);
          font-size: 1.5rem;
        }
        .card-content {
          padding: 2rem;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }
        .category { color: var(--accent); }
        .dot { color: var(--text-muted); }
        .read-time { color: var(--text-muted); }
        .card-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .card-excerpt {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .author-info {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .author-avatar {
          width: 32px;
          height: 32px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          color: white;
        }
        .author-name {
          font-size: 0.9rem;
          font-weight: 500;
        }
        .post-date {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
      `}</style>
    </motion.div>
  );
};

export default PostCard;
