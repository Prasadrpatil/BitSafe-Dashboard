import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPortfolio } from '../../actions/userActions'
import Loader from '../components/Loader'

const PortfolioScreen = () => {
  const dispatch = useDispatch()

  const portfolioList = useSelector((state) => state.portfolioList)
  const { loading, portfolio, totalValue, currentValue, percentage } =
    portfolioList

  useEffect(() => {
    dispatch(getPortfolio())

    const interval = setInterval(() => {
      dispatch(getPortfolio())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  console.log(
    'Portfolio',
    portfolio,
    'Total',
    totalValue,
    'Current',
    currentValue,
    'Percentage',
    percentage
  )

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
              <h5>Total Investment</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    {totalValue && (
                      <h3 className='mb-0'>${totalValue.toFixed(3)}</h3>
                    )}
                  </div>
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
              <h5>Current Value</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    {currentValue && (
                      <h3 className='mb-0'>${currentValue.toFixed(3)}</h3>
                    )}
                  </div>
                </div>
                <div className='col-4 col-sm-12 col-xl-4 text-center text-xl-right'>
                  <i className='icon-lg mdi mdi-wallet-travel text-info ml-auto'></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4 grid-margin'>
          <div className='card'>
            <div className='card-body'>
              <h5>Profit & Loss</h5>
              <div className='row'>
                <div className='col-8 col-sm-12 col-xl-8 my-auto'>
                  <div className='d-flex d-sm-block d-md-flex align-items-center'>
                    {totalValue &&
                    currentValue &&
                    currentValue - totalValue >= 0 ? (
                      <h3 className='mb-0 text-success'>
                        ${(currentValue - totalValue).toFixed(3)}
                      </h3>
                    ) : (
                      totalValue &&
                      currentValue && (
                        <h3 className='mb-0 text-danger '>
                          ${(currentValue - totalValue).toFixed(3)}
                        </h3>
                      )
                    )}
                    {percentage && percentage >= 0 ? (
                      <p className='text-success ml-2 mb-0 font-weight-medium'>
                        {percentage.toFixed(3)}%
                      </p>
                    ) : (
                      percentage && (
                        <p className='text-danger ml-2 mb-0 font-weight-medium'>
                          {percentage.toFixed(3)}%
                        </p>
                      )
                    )}
                  </div>
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
                      <th>LTP</th>
                      <th>P&L</th>
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
                          <td>{order.units.toFixed(4)}</td>
                          <td>
                            ${(order.amountPaid / order.units).toFixed(3)}
                          </td>
                          <td>${order.current_price}</td>

                          {((order.current_price -
                            order.amountPaid / order.units) /
                            (order.amountPaid / order.units)) *
                            100 >=
                          0 ? (
                            <td className='text-success'>
                              +
                              {(
                                (order.amountPaid / 100) *
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
                            </td>
                          ) : (
                            <td className='text-danger'>
                              {(
                                (order.amountPaid / 100) *
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
                            </td>
                          )}

                          {((order.current_price -
                            order.amountPaid / order.units) /
                            (order.amountPaid / order.units)) *
                            100 >=
                          0 ? (
                            <td className='text-success'>
                              +
                              {(
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
                              %
                            </td>
                          ) : (
                            <td className='text-danger'>
                              {(
                                ((order.current_price -
                                  order.amountPaid / order.units) /
                                  (order.amountPaid / order.units)) *
                                100
                              ).toFixed(3)}
                              %
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
