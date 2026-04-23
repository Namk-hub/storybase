import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/createPost';
import Login from './pages/login';
import Signup from './pages/Signup';
import { isTokenExpired } from './utils/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      } else {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/home" /> : <Landing />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route
              path="/create"
              element={user ? <CreatePost /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/home" /> : <Signup setUser={setUser} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
