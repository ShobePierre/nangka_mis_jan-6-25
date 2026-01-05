import express from 'express';
import { loginAdmin, loginPWDUser, logout, getCurrentUser } from '../controllers/authController.js';
import { verifyToken, verifyAdminToken, verifyPWDUserToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin/Staff Login
router.post('/admin/login', loginAdmin);

// PWD User Login
router.post('/pwd/login', loginPWDUser);

// Logout
router.post('/logout', verifyToken, logout);

// Get current user info
router.get('/me', verifyToken, getCurrentUser);

// Protected routes for admin only
router.get('/admin/protected', verifyAdminToken, (req, res) => {
  res.json({ message: 'Admin only route', user: req.user });
});

// Protected routes for PWD users only
router.get('/pwd/protected', verifyPWDUserToken, (req, res) => {
  res.json({ message: 'PWD user only route', user: req.user });
});

export default router;
