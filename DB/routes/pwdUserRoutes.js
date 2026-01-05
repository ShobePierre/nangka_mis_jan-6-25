import express from 'express';
import {
  getAllPWDUsers,
  getPWDUserById,
  getPWDUsersByBarangay,
  createPWDUser,
  updatePWDUser,
  deletePWDUser,
  searchPWDUsers
} from '../controllers/pwdUserController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all PWD users
router.get('/', verifyAdminToken, getAllPWDUsers);

// Search PWD users
router.get('/search', verifyAdminToken, searchPWDUsers);

// Get PWD users by barangay
router.get('/barangay/:barangayId', verifyAdminToken, getPWDUsersByBarangay);

// Get specific PWD user
router.get('/:pwdId', verifyAdminToken, getPWDUserById);

// Create new PWD user
router.post('/', verifyAdminToken, createPWDUser);

// Update PWD user
router.put('/:pwdId', verifyAdminToken, updatePWDUser);

// Delete PWD user
router.delete('/:pwdId', verifyAdminToken, deletePWDUser);

export default router;
