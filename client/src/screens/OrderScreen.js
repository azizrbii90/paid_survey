import React, { useEffect, useState } from 'react';  
import { Link, useParams, useNavigate } from 'react-router-dom';    
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { Store } from 'react-notifications-component'


const WalletScreen = () => {

  const [qty, setQty] = useState(1);  
  const [gift, setGift] = useState({})

  const dispatch = useDispatch();   
  const navigate = useNavigate(); 

  const { id } = useParams();

  const giftReducer = useSelector((state) => state.giftReducer);
  let { loading, gifts } = giftReducer;

  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;

  const URL = 'http://localhost:5000/'

  useEffect(() => {
    if(id!=='-1') {
      for(let i=0; i < gifts.length; i++) {
        if(gifts[i]?._id===id) {
          let myGift = Object.assign({}, gifts[i])
          setGift(myGift);
          break
        }
      }
    }
  },[gifts,id])

  useEffect(() => {
    if(id!==-1) {
      for(let i=0; i < gifts.length; i++) {
        if(gifts[i]?._id===id) {
          let myGift = Object.assign({}, gifts[i])
          setGift(myGift);
          break
        }
      }
    }
  },[])

  const addToCartHandler = () => {
    var allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    var exist = false
    var i = 0
    for(; i <allOrders.length; i++) {
      if(allOrders[i].gift._id === gift._id) {
        exist = true
        break 
      }
    }
    if(exist) {
      allOrders[i].quantity += qty
    }
    else {
      allOrders.push({gift : gift, quantity: qty}); 
    }
    localStorage.setItem("allOrders", JSON.stringify(allOrders))

    var newWallet = Number(localStorage.getItem('wallet'))
    newWallet -= qty * gift.price

    localStorage.setItem("wallet", JSON.stringify(newWallet))

    Store.addNotification({
      title: "Gift successfully added to Cart!",
      type: "success",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 2000,
      }
    });

    navigate('/list-gifts')
  }

  return (
    <div>
     <div>
      <Link style={{float: 'right'}} className="btn btn-light" to="/list-gifts">
      Go Back
      </Link>  
     </div>
     <div>
      <br></br>
     {(gift.photo !==undefined && user!==null) && (
       <Row className="align-items-center">
       <Col md={6}>
           <Image src={URL+gift.photo.name} alt={gift.name} fluid />
       </Col>
       <Col md={6}>
           <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>{gift.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item className="m-2">Price: ${gift.price}</ListGroup.Item>
                <ListGroup.Item>
                    Description: {gift.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status: {gift.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                </ListGroup.Item>
                <ListGroup.Item> 
                <Row>
                            <Col md={3}>Quantity: </Col>
                            <Col>
                                <Form.Control
                                    as='select'
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                >
                                {[...Array(gift.stock).keys()].map((x) => (
                                    (x+1)*gift.price<=Number(localStorage.getItem('wallet')) && (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                    )
                                ))}
                                </Form.Control>
                            </Col>
                        </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <br></br>
                  <button className="btn btn-sm btn-primary w-100" onClick={addToCartHandler} disabled={Number(localStorage.getItem('wallet'))<gift.price}>
                    <strong>Add to Cart</strong> &nbsp; &nbsp;<i className="fas fa-shopping-cart"></i>
                  </button>
                </ListGroup.Item>
            </ListGroup>            
       </Col>
       </Row>
    )} 
     </div>
    
 </div>
  )
}

export default WalletScreen
