import mongoose from 'mongoose'

const buySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    currency: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    walletId: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Buy = mongoose.model('Buy', buySchema)

export default Buy