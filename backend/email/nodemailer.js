import nodemailer from 'nodemailer'

const sendEmailToUserForBuy = async function (email, otp) {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: 'prasadrpatil525@gmail.com',
      pass: process.env.MAIL,
    },
  })

  const msg = {
    to: email,
    from: 'BitSafe <prasadrpatil525@gmail.com>',
    subject: `OTP For Verification!!`,
    html: `
    <body >

  <span>${otp}</span>
    </body>
    `,
  }

  const result = await transport.sendMail(msg)
}

export { sendEmailToUserForBuy }
