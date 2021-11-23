import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import Loader from '../components/Loader'

const AllUsersScreen = () => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, users } = userList
  useEffect(() => {
    dispatch(listUsers())
  }, [])

  // console.log(users)

  return (
    <div>
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div className='page-header'>
        <h3 className='page-title'> Manage Users</h3>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Manage Users
            </li>
          </ol>
        </nav>
      </div>

      <div className='row '>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Aadhar</th>
                      <th>Gender</th>
                      <th>DOB</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users &&
                      users.reverse().map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td className='text-success'>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.aadhar}</td>
                          <td>{user.gender}</td>
                          <td>{user.dob}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllUsersScreen
