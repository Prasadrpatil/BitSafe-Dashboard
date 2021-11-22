import mongoose from 'mongoose'

const sellSchema = mongoose.Schema(
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
    amountReceive: {
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
    bankDetail: {
      type: String,
      required: true,
    },
    orderAction: {
      type: String,
      required: true,
      default: 'sell',
    },
    isConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Sell = mongoose.model('Sell', sellSchema)

export default Sell
