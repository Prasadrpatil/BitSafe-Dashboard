import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { buyCryptoAction } from '../../actions/userActions'
import URL from '../../URL'
import { BUY_CRYPTO_RESET } from '../../constants/userConstants'

const BuyScreen = ({ history }) => {
  const [condition, setCondition] = useState(false)
  const [walletId, setWalletid] = useState('')
  const [pay, setPay] = useState()
  const [receive, setReceive] = useState()
  const [currency, setCurrency] = useState('Bitcoin')
  const [cryptoList, setCryptoList] = useState([])

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const buyCrypto = useSelector((state) => state.buyCrypto)
  const { loading, success, error } = buyCrypto

  useEffect(() => {
    if (success) {
      dispatch({ type: BUY_CRYPTO_RESET })
      history.push('/orders/crypto')
    }
  }, [success])

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCryptoList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
  })

  const saveOrder = async (paymentId, orderId, razorpaySign) => {
    dispatch(
      buyCryptoAction({
        currency: currency,
        amountPaid: pay,
        units: receive.toFixed(8),
        mobile: userInfo.phone,
        email: userInfo.email,
        name: userInfo.name,
        walletId: walletId,
        paymentInfo: {
          paymentId: paymentId,
          orderId: orderId,
          razorpaySign: razorpaySign,
        },
      })
    )
  }

  const handler = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${URL}/api/razorpay`, { pay }, config)
    // console.log(data)
    var options = {
      key: 'rzp_test_JlcMX9ylmcUBPj',
      amount: data.amount,
      currency: data.currency,
      name: 'BitSafe',
      description: `Reliable Place to Buy Crypto`,
      image: 'https://i.ibb.co/6NGMT0k/logo1.png',
      order_id: data.id,
      handler: function (response) {
        let paymentId = response.razorpay_payment_id
        let orderId = response.razorpay_order_id
        let razorpaySign = response.razorpay_signature
        saveOrder(paymentId, orderId, razorpaySign)
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#0090e7',
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const onPayChange = async (e) => {
    setPay(e.target.value)

    let temp = e.target.value
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )

    const filteredCoin = response.data.filter(
      (coin) => coin.name.toLowerCase() === currency.toLowerCase()
    )

    setReceive(Number(temp) / Number(filteredCoin[0].current_price))
  }

  const onReceiveChange = async (e) => {
    setReceive(e.target.value)

    let temp = e.target.value
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )

    const filteredCoin = response.data.filter(
      (coin) => coin.name.toLowerCase() === currency.toLowerCase()
    )
    setPay(Number(temp) * Number(filteredCoin[0].current_price))
  }

  const currencyOption = cryptoList.map((crypto) => {
    return (
      <option value={crypto.name} key={crypto.name}>
        {crypto.name}
      </option>
    )
  })

  console.log(currencyOption)

  const submitHandler = (e) => {
    e.preventDefault()
    setCondition(true)
  }

  return (
    <div>
      <div className='d-flex align-items-center auth px-0 h-100'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-8 mx-auto'>
            <div className='card text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <h3 style={{ marginBottom: '-5px' }}>Buy Crypto</h3>
              </div>
              {/* <h4>New here?</h4> */}
              <h6 className='font-weight-light'>
                Don’t be late, Investing is great for secured future
              </h6>
              <form className='pt-3' onSubmit={submitHandler}>
                {loading ? (
                  <>
                    <Loader />
                    <br />
                  </>
                ) : (
                  error && (
                    <div className='form-group'>
                      <input
                        type='text'
                        className='form-control form-control-lg'
                        id='error'
                        style={{ color: 'red', borderColor: 'red' }}
                        value={error}
                        readonly
                      />
                    </div>
                  )
                )}

                <div className='row'>
                  <div className='col-lg-8 form-group'>
                    <input
                      type='number'
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      placeholder='You Pay'
                      onChange={(e) => onPayChange(e)}
                      value={pay}
                      required
                      min='1'
                      max='2000'
                      step='any'
                      disabled={condition}
                    />
                  </div>
                  <div className='col-lg-4 form-group'>
                    <select
                      className='form-control form-control-lg'
                      disabled={condition}
                    >
                      <option>USD</option>
                    </select>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-8 form-group'>
                    <input
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      type='number'
                      placeholder='You Receive'
                      onChange={onReceiveChange}
                      value={receive}
                      disabled={condition}
                      required
                    />
                  </div>
                  <div className='col-lg-4 form-group'>
                    <select
                      className='form-control form-control-lg'
                      onChange={(e) => setCurrency(e.target.value)}
                      value={currency}
                      disabled={condition}
                    >
                      {currencyOption}
                    </select>
                  </div>
                </div>

                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='text'
                    placeholder='You Name'
                    value={userInfo.name}
                    disabled
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='email'
                    placeholder='You Email'
                    value={userInfo.email}
                    disabled
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='number'
                    placeholder='You Phone Number'
                    value={userInfo.phone}
                    disabled
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='text'
                    placeholder='You Wallet Id'
                    onChange={(e) => setWalletid(e.target.value)}
                    value={walletId}
                    disabled={condition}
                    required
                  />
                </div>

                <div className='mb-4'>
                  <div className='form-check'>
                    <label className='form-check-label text-muted'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked
                      />
                      <i className='input-helper'></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className='mt-3'>
                  {condition ? (
                    <button
                      className='btn btn-block btn-success btn-lg font-weight-medium auth-form-btn'
                      onClick={handler}
                    >
                      Pay ${pay}
                    </button>
                  ) : (
                    <button className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
                      Submit
                    </button>
                  )}
                </div>
                {/* <div className='text-center mt-4 font-weight-light'>
                  Already have an account?{' '}
                  <Link to='/login' className='text-primary'>
                    Login
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyScreen
