import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Store } from 'react-notifications-component';

import { deleteGift } from '../actions/giftActions';

const Gift = ({gift}) => {

  const URL = 'http://localhost:5000/'
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const DeleteHandler = (id) => {
    dispatch(deleteGift(id)).then((data) => {
      if(data._id) {
        Store.addNotification({
          title: "Gift successfully deleted!",
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
          }
        });
      } else {
        Store.addNotification({
          title: "Gift is not deleted!",
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 2000,
          }
        });
      }
    })
  };

  return (
    <div className="col-3">
    <div className="card my-3" style={{padding: '15px 15px 0'}}>
      <div style={{height: '200px'}}> 
        <img className="card-img-top" src={URL+gift.photo.name} style={{maxWidth: '100%',maxHeight: '100%'}} alt="Card image cap"/>
      </div>
      <div className="card-body">
        <h3 className="card-title text-center mt-3">{gift.name}</h3>
        <p className="card-text mt-3">{gift.description.length>130 ? `${gift.description.substring(0, 130)}...` : gift.description}</p>
        <h3 className="mt-2 text-center">${gift.price}</h3>
      </div>
      <div className="card-footer bg-transparent border-transparent d-flex justify-content-around">
        {user?.type==='admin' ? (
          <div>
          <button className="btn" style={{marginRight : '40px'}} onClick={() => navigate(`/gifts/${gift._id}`)}>
            <i className="fas fa-edit" style={{color:'#0099ff'}}></i>
          </button>
          <button type="button" className="btn" style={{marginLeft : '40px'}} data-toggle="modal" data-target={`#exampleModalCenter-${gift._id}`}>
            <i className="fas fa-trash" style={{color:'#ff1a1a'}}></i>
          </button>
          <div className="modal fade" id={`exampleModalCenter-${gift._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalCenterTitle-${gift._id}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`exampleModalLongTitle-${gift._id}`}>DELETE GIFT</h5>
                <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure ?
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary card-link" data-dismiss="modal"  onClick={() => DeleteHandler(gift._id)}>Yes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
          </div>
          </div>
          ) : (
          <div>
          <button className="btn" style={{marginRight : '40px'}} onClick={() => console.log("delete")}>
            <i className="fas fa-info" style={{color:'#0099ff'}}></i>
          </button>
          <button className="btn" style={{marginLeft : '40px'}} onClick={() => console.log("delete")}>
            <i className="fas fa-sync-alt" style={{color:'#ff1a1a'}}></i>
          </button>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

export default Gift
