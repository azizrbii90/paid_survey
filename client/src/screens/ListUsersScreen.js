import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';

import { updateUser } from '../actions/userActions';




const ListUsersScreen = () => {

  const dispatch = useDispatch() 

const conditionalRowStyles = [
    {
      when: row => row.type !== "dontExist",
      style: row => ({ backgroundColor: row.type==="company" ? '#F0F8FF' : row.type==="admin" ? 'inerit' : '#FAF0E6' }),
    },
 ];

const columns = [
    {
        name: 'Username',
        selector: row => row.username,
        grow: 2,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        grow: 2,
        sortable: true,
    },
    {
        name: 'Country',
        selector: row => row.country,
        sortable: true,
    },
    {
        name: 'Wallet',
        selector: row => row.wallet,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row.type,
        sortable: true
    },
    {
        name: 'Verified',
        selector: row => row.isVerified,
        cell: (row) => <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={row.isVerified} onChange={() => {
                                dispatch(updateUser(row, 'isVerified'))
                            }}  />
                        </div>,
        sortable: true,
    },
    {
        name: 'Blocked',
        selector: row => row.isBlocked,
        //format: row => row.isBlocked.toString(),
        cell: (row) => <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={row.isBlocked} onChange={() => {
                                dispatch(updateUser(row, 'isBlocked'))
                            }}  />
                        </div>,
        sortable: true,
    },
];


  const userReducer = useSelector((state) => state.userReducer);
  let { loading, users } = userReducer;
  
  return (
    <div>
      <br></br>
      <h3 className="mb-5">Users</h3>
      <DataTable
            pagination
            columns={columns}
            data={users}
            conditionalRowStyles={conditionalRowStyles}
       />
    </div>
  )
}

export default ListUsersScreen
