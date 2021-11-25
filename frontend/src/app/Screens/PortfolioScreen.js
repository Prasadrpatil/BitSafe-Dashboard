import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPortfolio } from '../../actions/userActions'
import Loader from '../components/Loader'
import axios from 'axios'

const PortfolioScreen = () => {
  const [coins, setcoins] = useState([])
  let arr
  let currentPrice = []
  const dispatch = useDispatch()

  console.log('ggggggggggggg', currentPrice)

  const portfolioList = useSelector((state) => state.portfolioList)
  const { loading, portfolio } = portfolioList
  useEffect(async () => {
    dispatch(getPortfolio())

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    setcoins(response.data)
  }, [])

  const getCoin = (currency) => {
    const filteredCoin = coins.filter(
      (coin) => coin.name.toLowerCase() === currency.toLowerCase()
    )
    // console.log(filteredCoin)
    currentPrice.push({
      currentPrice: filteredCoin[0].current_price,
      currency: filteredCoin[0].name,
    })
  }

  useEffect(() => {
    if (portfolio && coins) {
      arr = portfolio.map((crypto) => {
        return crypto.currency
      })
    }

    portfolio &&
      portfolio.map((crypto) => {
        getCoin(crypto.currency)
      })
  }, [portfolio, coins])

  // console.log(portfolio)

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
                          <td className='text-success'>${order.amountPaid}</td>
                          <td className='text-success'>
                            ${currentPrice[index]}
                          </td>
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
