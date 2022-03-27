import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { Store } from 'react-notifications-component';

import { updateUser, deleteUser } from '../actions/userActions';

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
    {
        name: 'Actions',
        //selector: row => row.isBlocked,
        //format: row => row.isBlocked.toString(),
        cell: (row) =>  <div>
                            <button className="btn btn-sm" onClick={() => console.log("delete")}>
                                <i className="fas fa-edit" style={{color:'blue'}}></i>
                            </button>
                            <span>
                                <button className="btn btn-sm" data-toggle="modal" data-target={`#exampleModalCenter-${row._id}`}>
                                    <i className="fas fa-trash" style={{color:'red'}}></i>
                                </button>
                                <div className="modal fade" id={`exampleModalCenter-${row._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalCenterTitle-${row._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLongTitle-${row._id}`}>DELETE USER</h5>
                                                <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure ?
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary card-link" data-dismiss="modal"  onClick={() => DeleteHandler(row._id)}>Yes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
    },
  ];

  const DeleteHandler = (id) => {
    dispatch(deleteUser(id)).then((data) => {
        if(data._id) {
          Store.addNotification({
            title: "User successfully deleted!",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        } else {
          Store.addNotification({
            title: "User is not deleted!",
            type: "danger",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        }
      })
  }


  const userReducer = useSelector((state) => state.userReducer);
  let { loading, users } = userReducer;
  
  return (
    <div>
      <br></br>
      <h1 className="mb-5">Users</h1>
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
