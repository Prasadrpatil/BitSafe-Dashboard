import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPortfolio } from '../../actions/userActions'
import Loader from '../components/Loader'

const PortfolioScreen = () => {
  const dispatch = useDispatch()

  const portfolioList = useSelector((state) => state.portfolioList)
  const { loading, portfolio } = portfolioList

  useEffect(() => {
    dispatch(getPortfolio())
  }, [])

  console.log('ggggggggggggg', portfolio)

  return (
    <>
      <div className='page-header'>
        <h3 className='page-title'> Portfolio </h3>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/profile'>Profile</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Portfolio
            </li>
          </ol>
        </nav>
      </div>
      {loading && (
        <>
          <Loader /> <br />
        </>
      )}
      <div className='row'>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Revenue</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>$32123</h2>
                    <p className='text-success ml-2 mb-0 font-weight-medium'>
                      +3.5%
                    </p>
                  </div>
                  <h6 className='text-muted font-weight-normal'>
                    11.38% Since last month
                  </h6>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-codepen text-primary ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Sales</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>$45850</h2>
                    <p className='text-success ml-2 mb-0 font-weight-medium'>
                      +8.3%
                    </p>
                  </div>
                  <h6 className='text-muted font-weight-normal'>
                    {' '}
                    9.61% Since last month
                  </h6>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-wallet-travel text-danger ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Purchase</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    <h2 className='mb-0'>$2039</h2>
                    <p className='text-danger ml-2 mb-0 font-weight-medium'>
                      -2.1%{' '}
                    </p>
                  </div>
                  <h6 className='text-muted font-weight-normal'>
                    2.27% Since last month
                  </h6>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-monitor text-success ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row '>
        <div className='col-12 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>Crypto Currencies</h4>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Date & Time</th>
                      <th>Currency</th>
                      <th>Units</th>
                      <th>Bought At</th>
                      <th>Current Price</th>
                      <th>% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio &&
                      portfolio.reverse().map((order, index) => (
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
                          <td>
                            ${(order.amountPaid / order.units).toFixed(8)}
                          </td>
                          <td>${order.current_price}</td>
                          {((order.current_price -
                            order.amountPaid / order.units) /
                            (order.amountPaid / order.units).toFixed(8)) *
                            100 >
                          0 ? (
                            <td className='text-success'>
                              +
                              {(
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
                            </td>
                          ) : (
                            <td className='text-danger'>
                              {(
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
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
    </>
  )
}

export default PortfolioScreen
