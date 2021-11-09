import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const KycScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  const onclickHandler = (e) => {
    e.preventDefault()
    // dispatch(register(name, email, password, confirmPassword))
  }
  return (
    <div>
      <div className='d-flex align-items-center auth px-0 h-100'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto'>
            <div className='card text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <img src={require('../../assets/images/logo.svg')} alt='logo' />
              </div>
              <h4>New here?</h4>
              <h6 className='font-weight-light'>
                Signing up is easy. It only takes a few steps
              </h6>
              <form className='pt-3'>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='exampleInputUsername1'
                    placeholder='Enter Name As per Aadhar'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='number'
                    className='form-control form-control-lg'
                    id='aadharNumber'
                    placeholder='Aadhar Number'
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>

                <input
                  type='file'
                  className='form-control '
                  id='newfile'
                  required
                />

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
                  <button type='submit'
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onclickHandler}
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KycScreen
