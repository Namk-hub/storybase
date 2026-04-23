import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { postsAPI } from '../api';
import { toast } from 'react-hot-toast';

const PostCard = ({ post, onRefresh, currentUser }) => {
  const isOwner = currentUser?.id === post.author?._id;
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleEdit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newTitle = prompt('Enter new title:', post.title);
    if (newTitle === null) return; // Cancelled

    const newContent = prompt('Enter new content:', post.content);
    if (newContent === null) return; // Cancelled

    try {
      const loadingToast = toast.loading('Updating post...');
      await postsAPI.update(post._id, { 
        title: newTitle || post.title, 
        content: newContent || post.content 
      });
      toast.success('Post updated successfully', { id: loadingToast });
      
      if (onRefresh) {
        onRefresh();
      } else {
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You are not authorized to update this post');
      } else {
        toast.error('Failed to update post');
      }
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const loadingToast = toast.loading('Deleting post...');
      await postsAPI.delete(post._id);
      toast.success('Post deleted successfully', { id: loadingToast });
      
      if (onRefresh) {
        onRefresh();
      } else {
        window.location.reload();
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error('You are not authorized to delete this post');
      } else {
        toast.error('Failed to delete post');
      }
      console.error(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="post-card"
    >
      {isOwner && (
        <div className="card-actions">
          <button onClick={handleEdit} className="action-btn edit" title="Edit Post">
            <Pencil size={16} />
          </button>
          <button onClick={handleDelete} className="action-btn delete" title="Delete Post">
            <Trash2 size={16} />
          </button>
        </div>
      )}
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

        .post-card {
          position: relative;
        }

        .card-actions {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          z-index: 10;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }

        .post-card:hover .card-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
        }

        .action-btn.edit {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .action-btn.edit:hover {
          background: var(--accent);
          border-color: var(--accent);
          transform: scale(1.1);
        }

        .action-btn.delete {
          background: rgba(255, 59, 48, 0.1);
          color: #ff3b30;
          border: 1px solid rgba(255, 59, 48, 0.3);
        }

        .action-btn.delete:hover {
          background: #ff3b30;
          color: white;
          transform: scale(1.1);
        }
      `}</style>
    </motion.div>
  );
};

export default PostCard;
