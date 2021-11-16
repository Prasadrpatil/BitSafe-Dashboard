import asycHandler from 'express-async-handler'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: 'rzp_test_JlcMX9ylmcUBPj',
  key_secret: 'v76YWC1Onvam5sLgD7FHEP8l',
})

const getOrderId = asycHandler(async (req, res) => {
  const { pay } = req.body
  // pay = pay * 75

  let options = {
    amount: pay * 100 * 75,
    currency: 'INR',
  }

  razorpay.orders.create(options, (err, order) => {
    res.json(order)
  })
})

// const verifyPayment = asycHandler(async (req, res) => {
//   console.log(req.body)
//   // razorpay.payments
//   //   .fetch(req.body.razorpay_payment_id)
//   //   .then((paymentDocument) => {
//   //     if (paymentDocument.status == 'captured') {
//   //       req.send('payment success')
//   //     } else {
//   //       res.send('fail')
//   //     }
//   //   })
// })

export { getOrderId }
