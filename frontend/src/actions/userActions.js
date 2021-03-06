import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  BUY_CRYPTO_REQUEST,
  BUY_CRYPTO_SUCCESS,
  BUY_CRYPTO_FAIL,
  SELL_CRYPTO_REQUEST,
  SELL_CRYPTO_SUCCESS,
  SELL_CRYPTO_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  BUY_ORDERS_LIST_REQUEST,
  BUY_ORDERS_LIST_SUCCESS,
  BUY_ORDERS_LIST_FAIL,
  UPDATE_BUY_ORDER_REQUEST,
  UPDATE_BUY_ORDER_SUCCESS,
  UPDATE_BUY_ORDER_FAIL,
  SELL_ORDERS_LIST_REQUEST,
  SELL_ORDERS_LIST_SUCCESS,
  SELL_ORDERS_LIST_FAIL,
  UPDATE_SELL_ORDER_REQUEST,
  UPDATE_SELL_ORDER_SUCCESS,
  UPDATE_SELL_ORDER_FAIL,
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from '../constants/userConstants'
import axios from 'axios'
import URL from '../URL'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    console.log(URL)

    const { data } = await axios.post(
      `${URL}/api/users/login`,
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })
  document.location.href = '/login'
}

export const register =
  (
    name,
    email,
    phone,
    address1,
    address2,
    city,
    postal,
    state,
    country,
    password,
    confirmPassword
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${URL}/api/users`,
        {
          name,
          email,
          phone,
          address1,
          address2,
          city,
          postal,
          state,
          country,
          password,
          confirmPassword,
        },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      document.location.href = '/login'
      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${URL}/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${URL}/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${URL}/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`${URL}/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `${URL}/api/users/${user.id}`,
      user,
      config
    )

    dispatch({ type: USER_UPDATE_SUCCESS })
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const buyCryptoAction =
  (currency, amountPaid, units, mobile, email, name, walletId, paymentInfo) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: BUY_CRYPTO_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `${URL}/api/users/buyCrypto`,
        {
          currency,
          amountPaid,
          units,
          mobile,
          email,
          name,
          walletId,
          paymentInfo,
        },
        config
      )

      dispatch({
        type: BUY_CRYPTO_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BUY_CRYPTO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const sellCryptoAction =
  (currency, amountReceive, units, mobile, email, name, walletId, bankDetail) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SELL_CRYPTO_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        `${URL}/api/users/sellCrypto`,
        {
          currency,
          amountReceive,
          units,
          mobile,
          email,
          name,
          walletId,
          bankDetail,
        },
        config
      )

      dispatch({
        type: SELL_CRYPTO_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SELL_CRYPTO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      })
    }
  }

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `${URL}/api/users/orders`,
      { id: userInfo._id },
      config
    )

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payloadBuy: data[0],
      payloadSell: data[1],
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listBuyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUY_ORDERS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${URL}/api/users/buyOrders`, config)

    dispatch({
      type: BUY_ORDERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BUY_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateAdminBuyOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_BUY_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`${URL}/api/users/updateBuy/${id}`, config)

    dispatch({
      type: UPDATE_BUY_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_BUY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const listSellOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELL_ORDERS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`${URL}/api/users/sellOrders`, config)

    dispatch({
      type: SELL_ORDERS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SELL_ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateAdminSellOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_SELL_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `${URL}/api/users/updateSell/${id}`,
      config
    )

    dispatch({
      type: UPDATE_SELL_ORDER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_SELL_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const getPortfolio = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PORTFOLIO_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `${URL}/api/users/portfolio`,
      { id: userInfo._id },
      config
    )

    dispatch({
      type: PORTFOLIO_LIST_SUCCESS,
      payloadPortfolio: data[0],
      payloadTotal: data[1],
      payloadCurrent: data[2],
      payloadPercentage: data[3],
    })
  } catch (error) {
    dispatch({
      type: PORTFOLIO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}
