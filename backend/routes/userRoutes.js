import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  buyCrypto,
  sellCrypto,
  verifyEmail,
  generateOtp,
  getOrders,
  getBuyOrders,
  updateBuyOrder,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router.route('/generateOtp').post(generateOtp)
router.route('/verifyEmail').post(verifyEmail)
router.route('/buyCrypto').post(protect, buyCrypto)
router.route('/sellCrypto').post(protect, sellCrypto)
router.route('/orders').post(protect, getOrders)
router.route('/buyOrders').post(getBuyOrders)
router.route('/updateBuy/:id').put(updateBuyOrder)
export default router
