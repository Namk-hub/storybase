import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'; 

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash
    });

    const access_token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_accessToken,
      { expiresIn: '15m' }
    );

    const refresh_token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_refreshToken,
      { expiresIn: '7d' }
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true, // Required for sameSite: "none"
      sameSite: "none", // Required for cross-domain cookies (Render)
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'User registered successfully',
      access_token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const access_token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_accessToken,
      { expiresIn: '15m' }
    );

    const refresh_token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_refreshToken,
      { expiresIn: "7d" }
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Login successful',
      access_token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error logging in' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    jwt.verify(refresh_token, process.env.JWT_SECRET_refreshToken, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const access_token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_accessToken,
        { expiresIn: '15m' }
      );

      res.json({
        access_token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error refreshing token' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

export { register, login, refreshToken, logout };