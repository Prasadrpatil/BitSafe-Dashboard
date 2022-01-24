import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { sellCryptoAction } from '../../actions/userActions'
import { SELL_CRYPTO_RESET } from '../../constants/userConstants'

const SellScreen = ({ history }) => {
  const [condition, setCondition] = useState(false)
  const [showWalletId, setShowWalletId] = useState(false)
  const [walletId, setWalletid] = useState('')
  const [bankDetail, setBankDetail] = useState('')
  const [pay, setPay] = useState()
  const [receive, setReceive] = useState()
  const [currency, setCurrency] = useState('Bitcoin')
  const [cryptoList, setCryptoList] = useState([])

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const sellCrypto = useSelector((state) => state.sellCrypto)
  const { loading, success, error } = sellCrypto

  useEffect(() => {
    if (success) {
      dispatch({ type: SELL_CRYPTO_RESET })
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

  const depositIdChange = (e) => {
    setWalletid(e.target.value)
    if (e.target.value === '') {
      setShowWalletId(false)
    } else {
      setShowWalletId(true)
    }
  }

  const sellHandler = (e) => {
    e.preventDefault()
    dispatch(
      sellCryptoAction({
        currency: currency,
        amountReceive: pay,
        units: receive,
        mobile: userInfo.phone,
        email: userInfo.email,
        walletId: walletId,
        bankDetail: bankDetail,
      })
    )
  }

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
                <h3 style={{ marginBottom: '-5px' }}>Sell Crypto</h3>
              </div>
              {/* <h4>New here?</h4> */}
              <h6 className='font-weight-light'>
                Always The Real Thing, Always Cryptocurrency
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
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      type='number'
                      placeholder='You Send'
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

                <div className='row'>
                  <div className='col-lg-8 form-group'>
                    <input
                      type='number'
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      placeholder='You Receive'
                      onChange={(e) => onPayChange(e)}
                      value={pay}
                      required
                      min='1'
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
                    placeholder='Bank Details/Paypal ID'
                    onChange={(e) => setBankDetail(e.target.value)}
                    value={bankDetail}
                    disabled={condition}
                    required
                  />
                </div>
                {showWalletId && (
                  <div className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      type='text'
                      placeholder='You Wallet Id'
                      value={walletId}
                      disabled
                      required
                    />
                  </div>
                )}

                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    onChange={(e) => depositIdChange(e)}
                    disabled={condition}
                    required
                  >
                    <option value=''>Our Deposit Id</option>
                    <option value='Wallet Id : 1QHcDE4fMM3NQ7p3hYsZi3yNrbCBja6q5X'>
                      BTC Deposit Id
                    </option>
                    <option value='Wallet Id : DdzFFzCqrhsu8dHaH6KPKvyjvYoq9U4YwzCrSHSL4Rv9jhH4q5eRETwHfBdVB3q6gaoKkWfJdT4LcM9hLaa1gyWbtHdANYWnAxCHHJGZ'>
                      ADA Deposit Id
                    </option>
                    <option value='Wallet Id : rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh, Tag:102871980'>
                      XRP Deposit Id
                    </option>
                    <option value='Wallet Id : 0x031b8218feb1e9788dfeb352c3646b0450f93f29'>
                      ETH(ERC20) Deposit Id
                    </option>
                  </select>
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
                      onClick={sellHandler}
                    >
                      Sell {currency}
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

export default SellScreen
