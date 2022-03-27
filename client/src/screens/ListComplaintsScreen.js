import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import { Store } from 'react-notifications-component';

import { deleteComplaint } from '../actions/complaintActions';


const ListComplaintsScreen = () => {

  const complaintReducer = useSelector((state) => state.complaintReducer);
  let { loading, complaints } = complaintReducer;

  const dispatch = useDispatch()
  
  const ExpandedComponent = ({ data }) => <div className="m-4">
                                            {data.subject}
                                          </div>

  const columns = [
    {
        name: '#',
        cell: (row, index) => index+1,
    },
    {
      name: 'Username',
      selector: row => row?.sender?.username,
      grow: 2,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row?.sender?.email,
      grow: 3,
      sortable: true,
    },
    {
        name: 'Date',
        selector: row => moment(row.createdAt).format('L'),
        sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) =>  <div>
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
    dispatch(deleteComplaint(id)).then((data) => {
      if(data._id) {
        Store.addNotification({
          title: "Complaint successfully deleted!",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
          }
        });
      } else {
        Store.addNotification({
          title: "Complaint is not deleted!",
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
 
  return (
    <div>
    <br></br>
    <h1 className="mb-5">Complaints</h1>
    <DataTable
          pagination
          columns={columns}
          data={complaints}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
     />
  </div>
  )
}

export default ListComplaintsScreen
