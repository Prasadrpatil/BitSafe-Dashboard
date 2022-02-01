import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios'
import URL from '../../URL'

const Register = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')
  const [state, setState] = useState('')
  const [otp, setotp] = useState('')
  const [isVerified, setisVerified] = useState(false)
  const [isOtpSend, setisOtpSend] = useState(false)
  const [submitButton, setsubmitButton] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loader, setloader] = useState(false)
  const [message, setmessage] = useState('')
  const [errmessage, seterrmessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
  }, [history, userInfo])

  const onclickHandler = (e) => {
    e.preventDefault()
    dispatch(
      register(
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
        confirmPassword
      )
    )
  }

  const sendOtpHandler = async (e) => {
    e.preventDefault()
    setloader(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(
      `${URL}/api/users/generateOtp`,
      { email },
      config
    )
    // console.log(res)
    if (res.status === 200 || res.status === 201) {
      setisOtpSend(true)
      setmessage('OTP Sent Successfully!')
      setloader(false)
    } else {
      setmessage('Send OTP Again')
      setloader(false)
    }
  }

  const verifyEmailHandler = async (e) => {
    e.preventDefault()
    setloader(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios
      .post(`${URL}/api/users/verifyEmail`, { email, otp }, config)
      .then(() => {
        setisOtpSend(false)
        setisVerified(true)
        setsubmitButton(false)
        setmessage('OTP Verified!')
        seterrmessage('')
        setloader(false)
      })
      .catch((err) => {
        seterrmessage('OTP does not Match, Send Again!')
        setloader(false)
      })
  }

  return (
    <div>
      <div className='d-flex align-items-center auth px-0 h-100'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-6 mx-auto'>
            <div className='card text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <h3
                  style={{
                    marginTop: '10px',
                    marginBottom: '-2px',
                    color: 'white',
                  }}
                >
                  B I T S A F E
                </h3>
              </div>
              <h4>New here?</h4>
              <h6 className='font-weight-light'>
                Signing up is easy. It only takes a few steps
              </h6>
              <form className='pt-3'>
                {loader && <Loader />}
                {loading && (
                  <>
                    <Loader />
                    <br />
                  </>
                )}

                {error && (
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
                )}

                {message && (
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      id='error'
                      style={{ color: '#00d25b', borderColor: '#00d25b' }}
                      value={message}
                      readonly
                    />
                  </div>
                )}
                {errmessage && (
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control form-control-lg'
                      id='error'
                      style={{ color: 'red', borderColor: 'red' }}
                      value={errmessage}
                      readonly
                    />
                  </div>
                )}

                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {!isVerified ? (
                  <>
                    <div className='row'>
                      <div className='col-lg-9 form-group'>
                        <input
                          type='email'
                          className='form-control form-control-lg'
                          id='exampleInputEmail1'
                          placeholder='Email'
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className='col-lg-3 form-group'>
                        <button
                          className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                          style={{ padding: '12px' }}
                          onClick={sendOtpHandler}
                          disabled={email ? false : true}
                        >
                          Send OTP
                        </button>
                      </div>
                    </div>
                    {isOtpSend && (
                      <div className='row'>
                        <div className='col-lg-9 form-group'>
                          <input
                            type='number'
                            className='form-control form-control-lg'
                            id='exampleInputEmail1'
                            placeholder='Enter OTP'
                            required
                            value={otp}
                            onChange={(e) => setotp(e.target.value)}
                          />
                        </div>
                        <div className='col-lg-3 form-group'>
                          <button
                            className='btn btn-block btn-success btn-lg font-weight-medium auth-form-btn'
                            style={{ padding: '12px' }}
                            onClick={verifyEmailHandler}
                            disabled={otp ? false : true}
                          >
                            Verify Email
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control form-control-lg'
                      id='exampleInputUsername1'
                      required
                      value={email}
                      disabled
                    />
                  </div>
                )}

                <div className='form-group'>
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Phone Number'
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Address1'
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Address2'
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='City'
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Postal Code'
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='State'
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    id='exampleFormControlSelect2'
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option selected disabled>
                      Country
                    </option>
                    <option value='India'>India</option>
                  </select>
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    id='exampleInputPassword1'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onclickHandler}
                    disabled={submitButton}
                  >
                    SIGN UP
                  </button>
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

export default Register
