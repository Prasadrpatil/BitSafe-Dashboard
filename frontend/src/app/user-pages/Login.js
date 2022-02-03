import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import { login } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from '../../Firebase/firebase'
import GoogleButton from 'react-google-button'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const signInGoogle = (e) => {
    e.preventDefault()
    signInWithGoogle()
  }

  return (
    <div>
      <div className='d-flex align-items-center auth px-0'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto'>
            <div className='card text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <h3
                  style={{
                    marginTop: '-15px',
                    marginBottom: '-2px',
                    color: 'white',
                  }}
                >
                  B I T S A F E
                </h3>
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className='font-weight-light'>Sign in to continue.</h6>
              <Form className='pt-3'>
                {loading ? (
                  <>
                    <Loader />
                    <br />
                  </>
                ) : (
                  error && (
                    <Form.Group className='d-flex search-field'>
                      <Form.Control
                        style={{ color: 'red', borderColor: 'red' }}
                        type='name'
                        size='lg'
                        className='h-auto'
                        value={error}
                        readonly
                      />
                    </Form.Group>
                  )
                )}

                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    size='lg'
                    className='h-auto'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    size='lg'
                    className='h-auto'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className='mt-3'>
                  <button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={submitHandler}
                  >
                    SIGN IN
                  </button>
                </div>
                <div className='my-2 d-flex justify-content-between align-items-center'>
                  <div className='form-check'>
                    <label className='form-check-label text-muted'>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked
                      />
                      <i className='input-helper'></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href='!#'
                    onClick={(event) => event.preventDefault()}
                    className='auth-link text-muted'
                  >
                    Forgot password?
                  </a>
                </div>
                <div className='mb-2'>
                  <GoogleButton
                    style={{ width: '100%' }}
                    // onClick={signInWithGoogle}
                  />
                </div>
                <div className='text-center mt-4 font-weight-light'>
                  Don't have an account?{' '}
                  <Link to='/register' className='text-primary'>
                    Create
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
