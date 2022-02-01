import React, { useEffect, useState } from 'react'
import { Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../actions/userActions'
import Loader from '../components/Loader'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getUserDetails('profile'))
    }
  }, [])
  return (
    <div>
      <div className='col-12 grid-margin'>
        <div className='card'>
          {loading && (
            <>
              <Loader />
            </>
          )}
          <div className='card-body'>
            <h4 className='card-title'>
              {user.name}, Welcome to your Profile!
            </h4>
            <p className='card-description'>ID- {user._id} </p>
            {/* <div style={{ minWidth: '500px' }}>
              <Image
                style={{
                  position: 'absolute',
                  marginRight: '5%',
                  marginTop: '1%',
                  right: '0',
                  top: '0',
                  width: '8%',
                }}
                src={require('../../assets/images/faces/users.jpg')}
                roundedCircle
              />
            </div> */}

            <form className='form-sample'>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Name</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.name} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Email</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.email} />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Phone</label>
                    <div className='col-sm-9'>
                      <Form.Control value={`+91 ` + user.phone} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Aadhar no</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.aadhar} />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Gender</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.gender} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>
                      Date of Birth
                    </label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.dob} />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <p className='card-description'> Address </p>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Address 1</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.address1} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Address 2</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.address2} />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>City</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.city} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>
                      Postal code
                    </label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.postal} />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>State</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.state} />
                    </div>
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='row'>
                    <label className='col-sm-3 col-form-label'>Country</label>
                    <div className='col-sm-9'>
                      <Form.Control value={user.country} />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
