import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import axios from 'axios'

const BuyScreen = () => {
  const [condition, setCondition] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [walletId, setWalletid] = useState('')
  const [pay, setPay] = useState()
  const [receive, setReceive] = useState()
  const [currency, setCurrency] = useState('btc')
  const [cryptoList, setCryptoList] = useState([])
  const [show, setShow] = useState(true)

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
      (coin) => coin.symbol.toLowerCase() === currency.toLowerCase()
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
      (coin) => coin.symbol.toLowerCase() === currency.toLowerCase()
    )
    setPay(Number(temp) * Number(filteredCoin[0].current_price))
  }

  const currencyOption = cryptoList.map((crypto) => {
    return (
      <option value={crypto.symbol} key={crypto.symbol}>
        {crypto.symbol}
      </option>
    )
  })

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
                <img src={require('../../assets/images/logo.svg')} alt='logo' />
              </div>
              <h4>New here?</h4>
              <h6 className='font-weight-light'>
                Signing up is easy. It only takes a few steps
              </h6>
              <form className='pt-3' onSubmit={submitHandler}>
                {/* {loading ? (
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
                )} */}

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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={condition}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='email'
                    placeholder='You Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={condition}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    type='number'
                    placeholder='You Phone Number'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    disabled={condition}
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
                    <button className='btn btn-block btn-success btn-lg font-weight-medium auth-form-btn'>
                      Pay ${pay}
                    </button>
                  ) : (
                    <button className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>
                      Submit
                    </button>
                  )}
                </div>
                <div className='text-center mt-4 font-weight-light'>
                  Already have an account?{' '}
                  <Link to='/login' className='text-primary'>
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyScreen
