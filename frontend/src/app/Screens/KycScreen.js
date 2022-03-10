import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader'
import { updateUserProfile } from '../../actions/userActions'
import { Form } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

const KycScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [error, seterror] = useState('')
  const [uploading, setUploading] = useState(false)
  const [aadhar, setAadhar] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [disableButton, setdisableButton] = useState(true)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    loading: updateLoading,
    error: updateError,
    success,
  } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (userInfo.isKyc) {
      history.push('/dashboard')
    } else if (success) {
      history.push('/dashboard')
    }
  }, [history, userInfo, success])

  const uploadFileHandler = async (e) => {
    seterror('')
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-API-KEY':
            'Aczvgg8H9jBprmzJUvQvY2Ucbnd0vjGtSBX9OD1iWGuiHsxgoWfLSH8sU6j2',
        },
      }

      const response = await axios.post(
        'https://nationalapi.docsumo.com/api/v1/national/extract/?side=front&save_data=false&return_redacted=false&fraud_check=true',
        formData,
        config
      )

      if (name != response.data.data.name.value) {
        seterror('Name is not matching with Document')
      } else if (number != response.data.data.no.value) {
        seterror('Aadhar Number is not matching with Document')
      }

      setdisableButton(false)

      setDob(response.data.data.dob.value)
      setGender(response.data.data.gender.value)
      setAadhar(response.data.data.no.value)

      setUploading(false)
    } catch (error) {
      seterror('Please upload a Valid Document')
      console.error(error)
      setUploading(false)
    }
  }

  const onclickHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUserProfile({
        id: userInfo._id,
        aadhar: number,
        dob: dob,
        gender: gender,
      })
    )
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <div className='d-flex align-items-center auth px-0 h-100'>
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
                  K Y C
                </h3>
              </div>
              <h4>It only takes a few steps.</h4>
              <h6 className='font-weight-light'>
                we doesn't share your information in any manner.
              </h6>
              <form className='pt-3'>
                {updateLoading ? (
                  <Loader />
                ) : (
                  updateError && (
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

                <Form.Group>
                  <div className='custom-file'>
                    <Form.Control
                      type='file'
                      className='form-control visibility-hidden'
                      id='customFileLang'
                      lang='es'
                      required
                      onChange={uploadFileHandler}
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='customFileLang'
                    >
                      Upload image
                    </label>
                  </div>
                </Form.Group>
                {uploading && <Loader />}

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
                    type='submit'
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onclickHandler}
                    disabled={disableButton}
                  >
                    SUBMIT
                  </button>
                </div>

                <div className='mt-3'>
                  <button
                    className='btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn'
                    onClick={logoutHandler}
                  >
                    LOGOUT
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

// {
//   "dob": {
//       "conf": 0.99,
//       "position": [
//           509,
//           261,
//           655,
//           294
//       ],
//       "review_required": false,
//       "value": "25/12/1993"
//   },
//   "gender": {
//       "conf": 0.99,
//       "position": [
//           283,
//           310,
//           412,
//           351
//       ],
//       "review_required": false,
//       "value": "male"
//   },
//   "name": {
//       "conf": 0.99,
//       "position": [
//           277,
//           219,
//           471,
//           258
//       ],
//       "review_required": false,
//       "value": "Ranajit Mondal"
//   },
//   "no": {
//       "conf": 0.98,
//       "position": [
//           307,
//           502,
//           548,
//           532
//       ],
//       "review_required": false,
//       "value": "396244635778"
//   }
// }
