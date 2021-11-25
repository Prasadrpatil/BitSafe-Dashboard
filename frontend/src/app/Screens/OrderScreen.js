import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../actions/userActions'
import Loader from '../components/Loader'

const OrderScreen = () => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, ordersBuy, ordersSell } = orderList
  useEffect(() => {
    dispatch(listOrders())
  }, [])

  // console.log(ordersBuy, ordersSell)

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
              Crypto Orders
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
                      <th>Date & Time</th>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersBuy &&
                      ordersBuy.reverse().map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
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
                                Completed
                              </label>
                            </td>
                          ) : (
                            <td>
                              <label className='badge badge-danger'>
                                Pending
                              </label>
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

      <div className='row '>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Orders Placed for Sell</h4>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Date & Time</th>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Amount Recieve</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersSell &&
                      ordersSell.reverse().map((order, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
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
                          <td className='text-success'>
                            ${order.amountReceive}
                          </td>
                          {order.isConfirmed ? (
                            <td>
                              <label className='badge badge-success'>
                                Completed
                              </label>
                            </td>
                          ) : (
                            <td>
                              <label className='badge badge-danger'>
                                Pending
                              </label>
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

export default OrderScreen
