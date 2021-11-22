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

  console.log(ordersBuy && ordersBuy.reverse(), ordersSell)

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
      <div className='row'>
        <div className='col-lg-6 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Orders Placed for Buy</h4>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersBuy &&
                      ordersBuy.map((order) => (
                        <tr key={order._id}>
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
        <div className='col-lg-6 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Orders Placed for Sell</h4>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Amount Receive</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersSell &&
                      ordersSell.map((order) => (
                        <tr key={order._id}>
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
