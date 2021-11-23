import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listBuyOrders } from '../../actions/userActions'
import Loader from '../components/Loader'

const AdminBuyOrdersScreen = () => {
  const dispatch = useDispatch()

  const buyOrdersList = useSelector((state) => state.buyOrdersList)
  const { loading, orders } = buyOrdersList

  const updateBuyOrder = useSelector((state) => state.updateBuyOrder)
  const { order: success } = updateBuyOrder

  useEffect(() => {
    dispatch(listBuyOrders())
  }, [success])

  // console.log('ssssssss', orders)

  return (
    <div>
      {loading && (
        <>
          <Loader />
        </>
      )}
      <div className='page-header'>
        <h3 className='page-title'> Crypto Orders </h3>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Buy Crypto Orders
            </li>
          </ol>
        </nav>
      </div>

      <div className='row '>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Orders Placed for Buy</h4>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>User ID</th>
                      <th>Date & Time</th>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Amount Paid</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.reverse().map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.user}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleString(
                              undefined,
                              {
                                timeZone: 'Asia/Kolkata',
                              }
                            )}
                          </td>
                          <td>{order.currency}</td>
                          <td>{order.units}</td>
                          <td className='text-success'>${order.amountPaid}</td>
                          {order.isConfirmed ? (
                            <td>
                              <label className='badge badge-success'>
                                Approved
                              </label>
                            </td>
                          ) : (
                            <td>
                              <Link
                                to={`/buy/order/${order._id}`}
                                className='badge badge-danger'
                              >
                                Approve
                              </Link>
                            </td>
                          )}
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

export default AdminBuyOrdersScreen
