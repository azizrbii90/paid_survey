import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Gift from '../components/Gift'

const ListGiftsScreen = () => {
  
  const giftReducer = useSelector((state) => state.giftReducer);
  let { loading, gifts } = giftReducer;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const navigate = useNavigate()

  const newHandler = () => {
      navigate(`/gifts/-1`)
  }

  return (
    <div>
      <br></br>
      <div className="d-flex flex-row justify-content-between mb-3">
        <h3>Gifts</h3>
        {user?.type === 'admin' && (
          <button type="button" className="btn btn-sm btn-primary" onClick={newHandler}>new</button>
        )}
      </div>
      <div className="row">
        {gifts && (gifts.map((gift, i) => (
                <Gift key={i} gift={gift} />
        )))}
      </div>
    </div>
  )
}

export default ListGiftsScreen
