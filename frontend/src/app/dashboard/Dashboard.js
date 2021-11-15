import React, { Component, useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Slider from 'react-slick'
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from 'react-jvectormap'
import { login } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
}
const Dashboard = ({ history, match }) => {
  const [transactionHistoryData, settransactionHistoryData] = useState({
    labels: ['Paypal', 'Stripe', 'Cash'],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ['#111111', '#00d25b', '#ffab00'],
      },
    ],
  })

  const [transactionHistoryOptions, settransactionHistoryOptions] = useState({
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  })

  const [sliderSettings, setsliderSettings] = useState({
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  })

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [coins, setCoins] = useState([])
  const [loading, setloading] = useState(false)

  const search = match.params.keyword ? match.params.keyword : ''

  const getData = () => {
    setloading(true)
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then((res) => {
        setCoins(res.data)
        console.log(res.data)
        setloading(false)
      })
      .catch((error) => {
        console.log(error)
        setloading(false)
      })
  }

  useEffect(() => {
    getData()

    const interval = setInterval(() => {
      getData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else if (!userInfo.isKyc) {
      history.push('/kyc')
    }
  }, [history, userInfo])

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className='row'>
        <div className='col-12 grid-margin stretch-card'>
          <div className='card corona-gradient-card'>
            <div className='card-body py-0 px-0 px-sm-3'>
              <div className='row align-items-center'>
                <div className='col-4 col-sm-3 col-xl-2'>
                  <img
                    src={require('../../assets/images/dashboard/Group126@2x.png')}
                    className='gradient-corona-img img-fluid'
                    alt='banner'
                  />
                </div>
                <div className='col-5 col-sm-7 col-xl-8 p-0'>
                  <h4 className='mb-1 mb-sm-0'>New refreshing look</h4>
                  <p className='mb-0 font-weight-normal d-none d-sm-block'>
                    Corona admin template now with a new facelift for enhanced
                    legibility and aesthetics!
                  </p>
                </div>
                <div className='col-3 col-sm-2 col-xl-2 pl-0 text-center'>
                  <button className='btn btn-outline-light btn-rounded get-started-btn'>
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row '>
        <div className='col-12 grid-margin'>
          {loading ? (
            <>
              <br />
              <br />
              <br />
              <br />
              <Loader />
            </>
          ) : (
            <div className='card'>
              <div className='card-body'>
                {search ? (
                  <h4 className='card-title'>
                    Search Result for- {match.params.keyword}
                  </h4>
                ) : (
                  <h4 className='card-title'>Crypto Currencies</h4>
                )}

                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th> Image </th>
                        <th> Symbol</th>
                        <th> Currency </th>
                        <th> Current Price </th>
                        <th> Total Volume </th>
                        <th> % Change </th>
                        <th> Market Capitalization </th>
                        <th> Buy Crypto </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCoins &&
                        filteredCoins.map((coin) => (
                          <tr key={coin.id}>
                            <td>
                              <img src={coin.image} alt='face' />
                            </td>
                            <td>
                              <span>{coin.symbol}</span>
                            </td>
                            <td>
                              <span>{coin.name}</span>
                            </td>
                            <td>
                              <span>${coin.current_price}</span>
                            </td>
                            <td>
                              <span>${coin.total_volume.toLocaleString()}</span>
                            </td>
                            <td>
                              {coin.price_change_percentage_24h < 0 ? (
                                <span style={{ color: '#fc424a' }}>
                                  {coin.price_change_percentage_24h.toFixed(2)}%
                                </span>
                              ) : (
                                <span style={{ color: '#00d25b' }}>
                                  +{coin.price_change_percentage_24h.toFixed(2)}
                                  %
                                </span>
                              )}
                            </td>
                            <td>
                              <span>${coin.market_cap.toLocaleString()}</span>
                            </td>
                            <td>
                              <div className='badge badge-outline-success'>
                                <Link
                                  style={{ color: '#00d25b' }}
                                  to='/buy/crypto'
                                >
                                  Buy Crypto
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
