import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';

import { updateOrder } from '../actions/orderActions';

import moment from 'moment'

const ListOrdersScreen = () => {

  const dispatch = useDispatch()
  
  const [ordersUI,setOrdersUI] = useState([])

  const orderReducer = useSelector((state) => state.orderReducer);
  let { loading, orders } = orderReducer;

  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;

  const conditionalRowStyles = [
    {
      when: row => row.type !== "dontExist",
      style: row => ({ backgroundColor: row.isDelivered===true ? '#F0F8FF' : '#FAF0E6' }),
    },
  ];

  const ExpandedComponent = ({ data }) => <div>
                                            {data.orderItems.map((item,i) => {
                                              return (
                                                 <div className="m-4" key={i}>
                                                   <h6>{item.qty} of {item.gift.name} : ${item.qty * item.gift.price} </h6>
                                                 </div>
                                              )
                                            })}</div>

  const columns = [
    {
        name: '#',
        cell: (row, index) => index+1,
    },
    {
        name: 'Order date',
        selector: row => moment(row.createdAt).format('L'),
        sortable: true,
    },
    {
        name: 'Delivered',
        selector: row => row.isDelivered,
        cell: (row) => <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={row.isDelivered} disabled={user?.type!=='admin'} onChange={() => {
                                dispatch(updateOrder(row))
                            }}  />
                        </div>,
        sortable: true,
    },
    {
      name: 'Delivery date',
      selector: row => row.deliveredAt ? moment(row.deliveredAt).format('L') : '--',
      sortable: true,
  }
  ];

  useEffect(() => {
    var newOrders =  orders
    if(user?.type==="participant") {
        newOrders = orders?.filter(function (el) {
         return el?.user?._id === user?._id
      })
    }
    setOrdersUI(newOrders);
  },[user,orders])

  useEffect(() => {
    var newOrders =  orders
    if(user?.type==="participant") {
        newOrders = orders?.filter(function (el) {
         return el?.user?._id === user?._id
      })
    }
    setOrdersUI(newOrders);
  },[])

  return (
    <div>
      <br></br>
      <h1 className="mb-5">Orders</h1>
      <DataTable
            pagination
            columns={columns}
            data={ordersUI}
            conditionalRowStyles={conditionalRowStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
       />
    </div>
  )
}

export default ListOrdersScreen
