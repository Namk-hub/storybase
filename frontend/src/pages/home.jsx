import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { postsAPI } from '../api';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Skeleton from '../components/Skeleton';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data.posts);
    } catch (error) {
      toast.error('Failed to load posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page container">
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">Explore Stories</h1>
          <p className="page-subtitle">Discover the latest insights from across the globe.</p>
        </div>
        
        <div className="search-bar glass">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search stories, authors, or topics..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="posts-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card glass" style={{ padding: '2rem', borderRadius: '20px' }}>
              <Skeleton height="200px" width="100%" />
              <div style={{ marginTop: '2rem' }}>
                <Skeleton height="30px" width="80%" />
                <div style={{ marginTop: '1rem' }}>
                  <Skeleton height="20px" width="100%" />
                  <Skeleton height="20px" width="60%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="posts-grid">
          {filteredPosts.map((post, index) => (
            <PostCard key={post._id} post={post} onRefresh={fetchPosts} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No stories found</h3>
          <p>Try adjusting your search or check back later.</p>
        </div>
      )}

      <style>{`
        .home-page {
          padding-top: 4rem;
          padding-bottom: 8rem;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          gap: 2rem;
        }
        .page-title { font-size: 3rem; margin-bottom: 0.5rem; }
        .page-subtitle { color: var(--text-secondary); font-size: 1.1rem; }

        .search-bar {
          display: flex;
          align-items: center;
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          width: 100%;
          max-width: 400px;
          gap: 1rem;
        }
        .search-icon { color: var(--text-muted); }
        .search-bar input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          outline: none;
        }
        .search-bar input::placeholder { color: var(--text-muted); }

        .loading-state, .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10rem 0;
          gap: 1.5rem;
          color: var(--text-secondary);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; }
          .posts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Home;
