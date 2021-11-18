import mongoose from 'mongoose'

const otpSchema = mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: '5m', default: Date.now },
})

const Otp = mongoose.model('Otp', otpSchema)

export default Otp
