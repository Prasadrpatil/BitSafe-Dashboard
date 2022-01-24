import nodemailer from 'nodemailer'

const sendEmailVerification = async function (email, otp) {
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
                margin: 40px auto;
                color: #000;
                line-height: 1.5;
              "
            >
              <p>This is a system generated email please do not reply on it</p>
              <div>
              <br />
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/twitter-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/facebook-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/youtube-teal.png"
              /></a>
              <a style="margin: 3px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/linkedin-teal.png"
              /></a>
            </div>
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

const sendEmailForBuy = async function (email, name, order) {
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
    subject: `Congratulations, ${name}! You have Bought Crypto Successfully!!`,
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
              Thank You ${name},<br />
              for Buying Crypto!
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
                >Thank you for purchasing your "${order.currency}" to the value of 
                $${order.amountPaid}.<br /><br />
                We will send your crypto to your address "${order.walletId}" as soon as
                we have received the funds. Please note that we will not be held responsible for deposits to
                incorrectly provided addresses.
              </bF>
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
                margin: 40px auto;
                color: #000;
                line-height: 1.5;
              "
            >
              <p>This is a system generated email please do not reply on it</p>
              <div>
              <br />
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/twitter-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/facebook-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/youtube-teal.png"
              /></a>
              <a style="margin: 3px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/linkedin-teal.png"
              /></a>
            </div>
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

const sendEmailForSell = async function (email, name, order) {
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
    subject: `Congratulations, ${name}! You have Sold Crypto Successfully!`,
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
              Thank You ${name},<br />
              for Selling Crypto!
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
                >Thank you for Selling your ${
                  order.currency
                } to the value of $${order.amountReceive.toFixed(3)}.
                <b></b>
                <br /><br />
                Hello ${name}<br />
                Thank you for selling your crypto "${order.currency}" to the
                value of $${order.amountReceive.toFixed(
                  3
                )}. We will initiate payment (minus 3.9%
                fee) to "${order.bankDetail}", once confirmation has been
                provided of the deposit.
              </bF>
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
                margin: 40px auto;
                color: #000;
                line-height: 1.5;
              "
            >
              <p>This is a system generated email please do not reply on it</p>
              <div>
              <br />
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/twitter-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/facebook-teal.png"
              /></a>
              <a style="margin: 2px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/youtube-teal.png"
              /></a>
              <a style="margin: 3px" href="https://bitsafe-dashboard.web.app/"
                ><img
                  src="https://info.tenable.com/rs/tenable/images/linkedin-teal.png"
              /></a>
            </div>
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

export { sendEmailVerification, sendEmailForBuy, sendEmailForSell }
