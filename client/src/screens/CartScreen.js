import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Store } from 'react-notifications-component';
import { createOrder } from '../actions/orderActions'
import { modifyProfile } from '../actions/userActions';

const CartScreen = () => {
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  const [allOrders, setAllOrders] = useState(JSON.parse(localStorage.getItem("allOrders")) || [])
  const [somme, setSomme] = useState(0)
  const URL = 'http://localhost:5000/'
  const countries = ['Tunisia', 'Algeria', 'Egypte']

  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;

  const [formData, setFormData] = useState({
            user: user?._id,
            
            orderItems: [],
            address : '',  
            city: '',   
            postalCode: '',
            country: 'Tunisia',  
            isDelivered: false
  })

  useEffect(() => {
    let s = 0;
    for(let i=0; i<allOrders.length; i++) {
        s+= allOrders[i].gift.price * allOrders[i].quantity
    }
    setSomme(s)
    setFormData(prevState => ({
        ...prevState,
        user: user?._id
      }));
  },[])

  useEffect(() => {
    let s = 0;
    for(let i=0; i<allOrders.length; i++) {
        s+= allOrders[i].gift.price * allOrders[i].quantity
    }
    setSomme(s)
    setFormData(prevState => ({
        ...prevState,
        user: user?._id
      }));
  },[allOrders,user])

  const DeleteHandler = (row) => {
    let newOrders = JSON.parse(localStorage.getItem("allOrders")) || []
    let i = 0;
    for(; i < newOrders.length; i++) {
        if(newOrders[i].gift._id===row.gift._id) {
            break;
        }
    }
    let newWallet = Number(localStorage.getItem("wallet"))
    newWallet += newOrders[i].quantity * newOrders[i].gift.price
    newOrders.splice(i, 1)
    localStorage.setItem("allOrders", JSON.stringify(newOrders))
    setAllOrders(newOrders)
    localStorage.setItem("wallet", JSON.stringify(newWallet))
  }

  const columns = [
    {
        name: 'Title',
        selector: row => row.gift.name,
        grow: 2,
        sortable: true,
    },
    {
        name: 'Photo',
        selector: row => row.gift.photo.name,
        cell: (row) => <img src={URL+row.gift.photo.name} style={{maxWidth: '100%',maxHeight: '100%'}} alt={URL+row.gift.photo.name}/>,
        sortable: true,
    },
    {
        name: 'Quantity',
        selector: row => row.quantity,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: (row) =>  <div>
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
                                                <button className="btn btn-primary card-link" data-dismiss="modal" onClick={() => DeleteHandler(row)}>Yes</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           
                        </div>
    },
  ];

  const ConfirmHandler = async () => {
    let valid = true;
    if(!document.getElementById('address').validity.valid) {
      document.getElementById('addressMessage').style.display = 'block';  
      valid = false  
    }
    if(!document.getElementById('postalCode').validity.valid) {
      document.getElementById('postalCodeMessage').style.display = 'block';    
      valid = false
    }
    if(!document.getElementById('city').validity.valid) {
      document.getElementById('cityMessage').style.display = 'block';   
      valid = false 
    }
   
    if(valid) {
        let orderItems = allOrders.map(function(o) {
                                return { gift: o.gift._id, qty: Number(o.quantity) };
                         });
         
                    dispatch(createOrder(formData, orderItems)).then((data) => {
                        if(data._id) {
                                let newUser =  Object.assign({}, user)
                                newUser.wallet -= somme
                                dispatch(modifyProfile(newUser)).then((data) => {
                                  if(data._id) {
                                    Store.addNotification({
                                        title: "Order successfully created!",
                                        type: "success",
                                        insert: "top",
                                        container: "top-right",
                                        dismiss: {
                                          duration: 2000,
                                        }
                                      });
                                      localStorage.setItem("allOrders", JSON.stringify([]))
                                      setShow(false) 
                                      navigate('/profile')
                                  }
                                })
                              
                             
                          } else {
                            Store.addNotification({
                              title: "Order is not created!",
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
    }

  const handleInputData = input => e => {
    let { value } = e.target
    if([input][0]==='country') {
        value = countries[value]
    }
    setFormData(prevState => ({
      ...prevState,
      [input]: value
    }));
   }

  return (
    <div>
      <br></br>
      <div className="d-flex flex-row justify-content-between mb-5">
      <h3>Cart</h3>
      <Button variant="primary sm" onClick={handleShow}>
        confirm
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Order : ${somme}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
                {allOrders.map((o) => {
                    return (
                    <li>
                        {o.quantity} of {o.gift.name} : ${o.gift.price * o.quantity}
                    </li>
                    )
                })}
                </ul>
               <hr></hr> 
               <div className="row mb-4">
                        <div className="col-6">
                            <div className="form-group mt-3">
                                <label className="form-label" htmlFor="exampleInputEmail1">Country</label>
                                <select className="form-select form-select-sm" aria-label="Default select example" onChange={handleInputData("country")}>
                                    {countries.map((country,i) => (
                                        <option value={`${i}`}>{country}</option>
                                    ))}  
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label mt-3" >Address</label>
                                <input id="address" type="text" className="form-control-sm form-control" required value={formData.name} placeholder="Enter address" onChange={handleInputData("address")}/>
                                <small id ="addressMessage" style= {{display: 'none'}} className="form-text text-danger">Address is required</small>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="form-label mt-3" >City</label>
                                <input id="city" type="text" className="form-control-sm form-control" required value={formData.city} placeholder="Enter city" onChange={handleInputData("city")}/>
                                <small id ="cityMessage" style= {{display: 'none'}} className="form-text text-danger">City is required</small>
                            </div>
                            <div className="form-group mt-3">
                                <label className="form-label" >Postal code</label>
                                <input id="postalCode" type="text" className="form-control-sm form-control" required value={formData.postalCode} placeholder="Enter postal code" onChange={handleInputData("postalCode")}/>
                                <small id ="postalCodeMessage" style= {{display: 'none'}} className="form-text text-danger">Postal code is required</small>
                            </div>
                        </div>
                    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ConfirmHandler}>
            convert
          </Button>
        </Modal.Footer>
      </Modal>
         
      </div>
      <DataTable
            pagination
            columns={columns}
            data={allOrders}
       />
    </div>
  )
}

export default CartScreen
