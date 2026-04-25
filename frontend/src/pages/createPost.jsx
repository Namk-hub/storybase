import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../api';
import { toast } from 'react-hot-toast';
import { Send, Image as ImageIcon, X, Loader2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      return toast.error('Please fill in all fields');
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (image) {
      data.append('image', image);
    }

    setLoading(true);
    try {
      await postsAPI.create(data);
      toast.success('Your story has been published!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to publish story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page container">
      <header className="create-header">
        <div className="header-text">
          <h1>Write a Story</h1>
          <p>Share your ideas with the Storybase community.</p>
        </div>
        <div className="publish-actions">
          <button 
            type="submit" 
            form="create-post-form" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <>Publish <Send size={18} /></>}
          </button>
        </div>
      </header>

      <div className="editor-layout">
        <aside className="editor-sidebar">
          <div className="sidebar-card glass">
            <h3><Info size={18} /> Writing Tips</h3>
            <ul>
              <li>Use a clear, catchy title.</li>
              <li>Break your content into readable paragraphs.</li>
              <li>Focus on providing value to your readers.</li>
              <li>Be authentic and tell your unique story.</li>
            </ul>
          </div>
        </aside>

        <main className="editor-main">
          <form id="create-post-form" onSubmit={handleSubmit} className="post-form">
            <div className="image-upload-section">
              {!preview ? (
                <label className="image-placeholder glass">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="hidden-input"
                  />
                  <div className="placeholder-content">
                    <ImageIcon size={32} />
                    <span>Add a cover image</span>
                  </div>
                </label>
              ) : (
                <div className="image-preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="title-input-group">
              <input 
                type="text" 
                placeholder="Story Title..." 
                className="title-input"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="content-input-group">
              <textarea 
                placeholder="Tell your story..." 
                className="content-input"
                name="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>
          </form>
        </main>
      </div>

      <style>{`
        .create-page { padding-top: 4rem; padding-bottom: 8rem; }
        .create-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4rem;
        }
        .header-text h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header-text p { color: var(--text-secondary); }

        .editor-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 4rem;
        }

        .sidebar-card { padding: 2rem; border-radius: 20px; }
        .sidebar-card h3 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 1.1rem; color: var(--accent); }
        .sidebar-card ul { list-style: none; }
        .sidebar-card li { 
          margin-bottom: 1rem; 
          font-size: 0.9rem; 
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.5rem;
        }
        .sidebar-card li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: bold;
        }

        .post-form { display: flex; flex-direction: column; gap: 2rem; }
        
        .image-upload-section {
          width: 100%;
          margin-bottom: 1rem;
        }
        .image-placeholder {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          border-radius: 24px;
          cursor: pointer;
          border: 2px dashed var(--border);
          transition: var(--transition-normal);
        }
        .image-placeholder:hover {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.05);
        }
        .placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
        }
        .hidden-input { display: none; }
        
        .image-preview-container {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-image-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: var(--transition-normal);
        }
        .remove-image-btn:hover {
          background: var(--danger);
          transform: scale(1.1);
        }

        .title-input {
          width: 100%;
          background: none;
          border: none;
          border-left: 4px solid var(--accent);
          padding: 0 2rem;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          outline: none;
          font-family: var(--font-heading);
        }
        .title-input::placeholder { color: var(--bg-tertiary); }

        .content-input {
          width: 100%;
          min-height: 500px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          padding: 3rem;
          border-radius: 24px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.2rem;
          line-height: 1.8;
          outline: none;
          resize: vertical;
          transition: var(--transition-normal);
        }
        .content-input:focus {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-hover);
        }

        @media (max-width: 992px) {
          .editor-layout { grid-template-columns: 1fr; }
          .editor-sidebar { order: 2; }
          .editor-main { order: 1; }
          .title-input { font-size: 2rem; }
          .image-preview-container { height: 250px; }
        }
      `}</style>
    </div>
  );
};

export default CreatePost;
