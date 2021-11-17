import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import razorpayRoutes from './routes/razorpayRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'))
}

app.use(express.json()) //allow to accept json data in body

app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/razorpay', razorpayRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
// }

//@middelwares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
)
