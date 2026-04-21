import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsAPI } from '../api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, MoreHorizontal, Loader2 } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getById(id);
        setPost(response.data.post);
      } catch (error) {
        toast.error('Post not found');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="post-detail-loading">
        <Loader2 size={40} className="animate-spin accent-text" />
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="post-detail">
      <header className="post-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={18} /> Back to feed
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="post-title-section"
          >
            <div className="post-meta">
              <span className="post-category">INSIGHTS</span>
              <span className="dot">•</span>
              <span className="read-time">5 MIN READ</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-info">
              <div className="author-large">
                <div className="author-avatar-large">{post.author?.name?.charAt(0) || 'A'}</div>
                <div className="author-details">
                  <span className="author-name-large">{post.author?.name || 'Anonymous'}</span>
                  <span className="post-date-large">{formattedDate}</span>
                </div>
              </div>
              
              <div className="post-actions">
                <button className="action-btn"><Share2 size={18} /></button>
                <button className="action-btn"><MoreHorizontal size={18} /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="post-body container-narrow">
        {/* Placeholder hero image */}
        <div className="post-hero-image">
          <div className="placeholder-overlay">STORYBASE</div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="post-content"
        >
          {post.content.split('\n').map((para, i) => (
            para ? <p key={i}>{para}</p> : <br key={i} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .post-detail { padding-bottom: 8rem; }
        .post-detail-loading { 
          height: 80vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }

        .post-header {
          padding: 4rem 0;
          background: linear-gradient(to bottom, rgba(255, 107, 44, 0.05) 0%, transparent 100%);
        }
        .btn-back {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--accent);
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 3rem;
          padding: 0;
        }
        .btn-back:hover { color: var(--accent-hover); }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .post-category { color: var(--accent); }
        .post-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 3rem;
          max-width: 900px;
        }

        .post-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 2rem;
        }
        .author-large { display: flex; align-items: center; gap: 1.2rem; }
        .author-avatar-large {
          width: 56px;
          height: 56px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
        }
        .author-details { display: flex; flex-direction: column; }
        .author-name-large { font-size: 1.1rem; font-weight: 700; }
        .post-date-large { color: var(--text-muted); font-size: 0.9rem; }

        .post-actions { display: flex; gap: 1rem; }
        .action-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .action-btn:hover { border-color: var(--accent); color: var(--accent); }

        .container-narrow {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .post-hero-image {
          width: 100%;
          height: 450px;
          background: #111;
          border-radius: 24px;
          margin-top: -2rem;
          margin-bottom: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .placeholder-overlay {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: 10px;
          color: rgba(255, 255, 255, 0.05);
        }

        .post-content p {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .post-title { font-size: 2.5rem; }
          .post-hero-image { height: 300px; }
        }
      `}</style>
    </article>
  );
};

export default PostDetail;
