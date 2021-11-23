import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBuyOrders, updateAdminBuyOrder } from '../../actions/userActions'
import { UPDATE_BUY_ORDER_RESET } from '../../constants/userConstants'

const ApproveBuyOrderScreen = ({ match, history }) => {
  const id = match.params.id

  const dispatch = useDispatch()

  const updateBuyOrder = useSelector((state) => state.updateBuyOrder)
  const { order } = updateBuyOrder
  useEffect(() => {
    if (order) {
      // dispatch({ type: UPDATE_BUY_ORDER_RESET })
      dispatch(listBuyOrders())
      history.push(`/a/orders/buy`)
    }
    dispatch(updateAdminBuyOrder(id))
  }, [id])
  return (
    <div>
      <h1>Approving.....</h1>
    </div>
  )
}

export default ApproveBuyOrderScreen
