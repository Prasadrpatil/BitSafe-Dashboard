import User from '../models/userModel.js'
import asycHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Buy from '../models/buyModel.js'
import Otp from '../models/otpModel.js'
import otpGenerator from 'otp-generator'
import {
  sendEmailVerification,
  sendEmailForBuy,
  sendEmailForSell,
} from '../email/nodemailer.js'
import Sell from '../models/sellModel.js'
import axios from 'axios'

// @des     Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asycHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      postal: user.postal,
      state: user.state,
      country: user.country,
      isAdmin: user.isAdmin,
      isKyc: user.isKyc,
      dob: user.dob,
      aadhar: user.aadhar,
      gender: user.gender,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

// @des    Register a New User
// @route   POST /api/users
// @access  Public
const registerUser = asycHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    address1,
    address2,
    city,
    postal,
    state,
    country,
    password,
    confirmPassword,
  } = req.body
  console.log(req.body)

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  // eslint-disable-next-line
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  if (phone.length != 10) {
    res.status(400)
    throw new Error('Phone Number Should 10 digit')
  } else if (password.length < 6) {
    res.status(400)
    throw new Error('Password Should AtLeast of 6 characters...')
  } else if (!format.test(password)) {
    res.status(400)
    throw new Error('Please Use AtLeast 1 Special Character in password...')
  } else if (password !== confirmPassword) {
    res.status(400)
    throw new Error('Passwords do not Match...')
  }

  const user = await User.create({
    name,
    email,
    phone,
    address1,
    address2,
    city,
    postal,
    state,
    country,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      postal: user.postal,
      state: user.state,
      country: user.country,
      isAdmin: user.isAdmin,
      isKyc: user.isKyc,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @des     Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asycHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      postal: user.postal,
      state: user.state,
      country: user.country,
      isAdmin: user.isAdmin,
      isKyc: user.isKyc,
      dob: user.dob,
      aadhar: user.aadhar,
      gender: user.gender,
    })
  } else {
    res.status(401)
    throw new Error('User not found')
  }
})

// @des     Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asycHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.address1 = req.body.address1 || user.address1
    user.address2 = req.body.address2 || user.address2
    user.city = req.body.city || user.city
    user.postal = req.body.postal || user.postal
    user.state = req.body.state || user.state
    user.country = req.body.country || user.country
    user.isKyc = true
    user.dob = req.body.dob
    user.aadhar = req.body.aadhar
    user.gender = req.body.gender
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address1: updatedUser.address1,
      address2: updatedUser.address2,
      city: updatedUser.city,
      postal: updatedUser.postal,
      state: updatedUser.state,
      country: updatedUser.country,
      isAdmin: updatedUser.isAdmin,
      isKyc: updatedUser.isKyc,
      dob: updatedUser.dob,
      aadhar: updatedUser.aadhar,
      gender: updatedUser.gender,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})

// @des     Get all Users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asycHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @des     Delete a User
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asycHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Removed Successfully' })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @des     Get User By id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asycHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @des     Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asycHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.isAdmin || req.body.isAdmin === false) {
      user.isAdmin = req.body.isAdmin
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('User Not Found')
  }
})

// @des     Vrify Email
// @route   POST /api/users/generateOtp
// @access  Public
const generateOtp = asycHandler(async (req, res) => {
  const { email } = req.body

  const otpExists = await Otp.findOne({ email })

  if (otpExists) {
    otpExists.email = email
    otpExists.otp = otpGenerator.generate(6, {
      upperCase: false,
      alphabets: false,
      specialChars: false,
    })
    const otpExistsNew = await otpExists.save()
    sendEmailVerification(otpExistsNew.email, otpExistsNew.otp)
    res.json(otpExistsNew)
  } else {
    const otp = await Otp.create({
      email: email,
      otp: otpGenerator.generate(6, {
        upperCase: false,
        alphabets: false,
        specialChars: false,
      }),
    })

    if (otp) {
      sendEmailVerification(otp.email, otp.otp)
      res.status(201).json({
        otp: otp.otp,
        email: otp.email,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Otp Data')
    }
  }
})

// @des     Verify Email
// @route   POST /api/users/verifyEmail
// @access  Public
const verifyEmail = asycHandler(async (req, res) => {
  const { email, otp } = req.body

  const otpExists = await Otp.findOne({ email })

  if (otpExists) {
    if (otpExists.otp === otp) {
      res.status(201).json('OTP Verified')
    } else {
      res.status(401)
      throw new Error('OTP does not match')
    }
  } else {
    res.status(401)
    throw new Error('Resend OTP Again')
  }
})

// @des     Save Buy Crypto Order
// @route   POST /api/users/buyCrypto
// @access  Private
const buyCrypto = asycHandler(async (req, res) => {
  const { currency } = req.body
  const email = currency.email
  const name = currency.name

  const order = new Buy({
    user: req.user._id,
    currency: currency.currency,
    amountPaid: currency.amountPaid,
    units: currency.units,
    mobile: currency.mobile,
    walletId: currency.walletId,
    paymentInfo: currency.paymentInfo,
  })

  const createdOrder = await order.save()
  if (createdOrder) {
    sendEmailForBuy(email, name, createdOrder)
  }
  res.status(201).json(createdOrder)
})

// @des     Save Sell Crypto Order
// @route   POST /api/users/sellCrypto
// @access  Private
const sellCrypto = asycHandler(async (req, res) => {
  const { currency } = req.body
  const email = currency.email
  const name = currency.name

  const order = new Sell({
    user: req.user._id,
    currency: currency.currency,
    amountReceive: currency.amountReceive,
    units: currency.units,
    mobile: currency.mobile,
    walletId: currency.walletId,
    bankDetail: currency.bankDetail,
  })

  const createdOrder = await order.save()
  if (createdOrder) {
    sendEmailForSell(email, name, createdOrder)
  }
  res.status(201).json(createdOrder)
})

// @des     get all orders
// @route   POST /api/users/orders
// @access  Private
const getOrders = asycHandler(async (req, res) => {
  const { id } = req.body
  let orderBuy = await Buy.find({ user: id })
  let orderSell = await Sell.find({ user: id })
  res.status(200).json([orderBuy, orderSell])
})

// @des     get all buy orders
// @route   POST /api/users/buyOrders
// @access  Private/Admin
const getBuyOrders = asycHandler(async (req, res) => {
  let orderBuy = await Buy.find()
  res.status(200).json(orderBuy)
})

// @des     update buy order
// @route   POST /api/users/updateBuy/:id
// @access  Private/Admin
const updateBuyOrder = asycHandler(async (req, res) => {
  let order = await Buy.findById(req.params.id)

  if (order) {
    order.isConfirmed = true

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @des     get all sell orders
// @route   POST /api/users/sellOrders
// @access  Private/Admin
const getSellOrders = asycHandler(async (req, res) => {
  let orderSell = await Sell.find()
  res.status(200).json(orderSell)
})

// @des     update sell order
// @route   POST /api/users/updateSell/:id
// @access  Private/Admin
const updateSellOrder = asycHandler(async (req, res) => {
  let order = await Sell.findById(req.params.id)

  if (order) {
    order.isConfirmed = true

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @des     get portfolio
// @route   POST /api/users/portfolio
// @access  Private
const getPortfolio = asycHandler(async (req, res) => {
  const { id } = req.body
  let orderBuy = await Buy.find({ user: id, isConfirmed: true })

  // console.log(orderBuy)
  orderBuy.map(async (order) => {
    let selectOrder = await Buy.findById(order._id)
    // console.log(selectOrder)
    await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(async (res) => {
        const filteredCoin = res.data.filter(
          (coin) =>
            coin.name?.toLowerCase() === selectOrder.currency?.toLowerCase()
        )
        const changedCurrentPrice = filteredCoin[0].current_price
        selectOrder.current_price = changedCurrentPrice
        await selectOrder.save()
      })
  })
  let updatedOrderBuy = await Buy.find({ user: id, isConfirmed: true })

  let totalInvestment = 0
  let currentValue = 0
  let profitLoss
  updatedOrderBuy.map(async (order) => {
    totalInvestment = totalInvestment + order.amountPaid / order.units
    currentValue = currentValue + order.current_price
  })
  profitLoss = ((currentValue - totalInvestment) / totalInvestment) * 100

  res
    .status(200)
    .json([updatedOrderBuy, totalInvestment, currentValue, profitLoss])
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  generateOtp,
  verifyEmail,
  buyCrypto,
  sellCrypto,
  getOrders,
  getBuyOrders,
  updateBuyOrder,
  getSellOrders,
  updateSellOrder,
  getPortfolio,
}
