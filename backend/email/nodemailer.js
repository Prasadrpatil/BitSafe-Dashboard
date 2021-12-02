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
    subject: `OTP For Email Verification`,
    html: `
    <body link="#0090e7" vlink="#0090e7" alink="#0090e7">
    <div>
      <div class="adM"></div>
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        style="width: 80%; margin: 0 auto"
      >
        <tbody style="width: 100%">
          <tr
            style="
              /* background: url(https://i.ibb.co/6NGMT0k/logo1.png) no-repeat
                center center/cover; */
              background-size: cover;
              float: left;
              width: 100%;
            "
          >
            <td
              class="
                m_4727151339495101087less1
                m_4727151339495101087ninty
                m_4727151339495101087mrgin
              "
              style="
                text-align: center;
                font-size: 20px;
                width: 85%;
                display: block;
                margin: 10px auto 0 auto;
                color: rgb(0, 0, 0);
                text-transform: sentencecase;
                padding: 10px 0;
                background: #fff;
              "
            >
              Email Verification <br />
              for<br />
              BitSafe Registration!
            </td>
          </tr>
        </tbody>
      </table>
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        style="width: 75%; margin: 0 auto"
      >
        <tbody style="background: #f1f8ff">
          <tr
            class="m_4727151339495101087ninty"
            style="
              padding: 0px 15px 30px 15px;
              float: none;
              width: 75%;
              margin: 0 auto;
              background: #fff;
              clear: both;
              display: block;
              box-sizing: border-box;
            "
          >
            <th
              style="
                background: url(https://i.ibb.co/6NGMT0k/logo1.png) no-repeat
                  center center/cover;
                height: 75px;
                width: 75px;
                margin: 0 auto;
                display: block;
                border-radius: 50%;
                border-top-right-radius: 0;
              "
            ></th>
          </tr>
          <tr style="display: block; width: 100%; float: left">
            <td
              class="m_4727151339495101087hundred m_4727151339495101087less4"
              style="
                text-align: center;
                font-size: 16px;
                width: 80%;
                display: block;
                margin: 65px auto;
                color: #000;
                line-height: 1.5;
              "
            >
              <bF
                >Verify your email with the following One Time Password (OTP) -
                ${otp} and do not share this OTP with anyone. <br />
                <br />
                This OTP is Valid for 5 minutes.</bF
              >
            </td>
          </tr>
          <tr style="display: block; width: 100%; float: left">
            <td
              class="m_4727151339495101087hundred m_4727151339495101087less4"
              style="
                text-align: center;
                font-size: 14px;
                width: 80%;
                display: block;
                margin: 65px auto;
                color: #000;
                line-height: 1.5;
              "
            >
              <p>This is a system generated email please do not reply on it</p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>

      <p>&nbsp;</p>
      <div class="yj6qo"></div>
      <div class="adL"></div>
    </div>
  </body>
    `,
  }

  const result = await transport.sendMail(msg)
}

export { sendEmailToUserForBuy }
