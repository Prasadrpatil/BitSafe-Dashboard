import express from 'express'
import { getOrderId } from '../controllers/razorpayController.js'

const router = express.Router()

router.route('/').post(getOrderId)
// router.route('/verify').post(verifyPayment)

export default router
