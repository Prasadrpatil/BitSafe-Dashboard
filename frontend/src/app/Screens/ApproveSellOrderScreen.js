import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listSellOrders, updateAdminSellOrder } from '../../actions/userActions'
import { UPDATE_BUY_ORDER_RESET } from '../../constants/userConstants'

const ApproveSellOrderScreen = ({ match, history }) => {
  const id = match.params.id

  const dispatch = useDispatch()

  const updateSellOrder = useSelector((state) => state.updateSellOrder)
  const { order } = updateSellOrder
  useEffect(() => {
    if (order) {
      // dispatch({ type: UPDATE_BUY_ORDER_RESET })
      dispatch(listSellOrders())
      history.push(`/a/orders/sell`)
    }
    dispatch(updateAdminSellOrder(id))
  }, [id])
  return (
    <div>
      <h1>Approving.....</h1>
    </div>
  )
}

export default ApproveSellOrderScreen
