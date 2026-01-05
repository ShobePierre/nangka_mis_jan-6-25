import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword
} from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all admins
router.get('/', verifyAdminToken, getAllAdmins);

// Get specific admin
router.get('/:personId', verifyAdminToken, getAdminById);

// Create new admin
router.post('/', verifyAdminToken, createAdmin);

// Update admin
router.put('/:personId', verifyAdminToken, updateAdmin);

// Change password
router.post('/:personId/change-password', verifyAdminToken, changePassword);

// Delete admin
router.delete('/:personId', verifyAdminToken, deleteAdmin);

export default router;
