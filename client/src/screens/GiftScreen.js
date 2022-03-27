import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createGift, updateGift } from '../actions/giftActions'

import { Store } from 'react-notifications-component';
import photo from '../images/empty.jpg';



const GiftScreen = () => {

  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
        name: "",
        description: "",
        stock: 0,
        price: 100,
        photo: {
            name: "",
            mimetype: "",
            size: ""}
  })
  const giftReducer = useSelector((state) => state.giftReducer);
  let { loading, gifts } = giftReducer;

  const token = localStorage.getItem('token')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();

  const URL = 'http://localhost:5000/'

  useEffect(() => {
    if(id!=='-1') {
      for(let i=0; i < gifts.length; i++) {
        if(gifts[i]?._id===id) {
          let giftUpdate = Object.assign({}, gifts[i])
          setFormData(giftUpdate);
          break
        }
      }
    }
  },[gifts,id])

  useEffect(() => {
    if(id!==-1) {
      for(let i=0; i < gifts.length; i++) {
        if(gifts[i]?._id===id) {
          let giftUpdate = Object.assign({}, gifts[i])
          setFormData(giftUpdate);
          break
        }
      }
    }
  },[])

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFormData = input => e => {

    let value = e.target.value
    
    setFormData(prevState => ({
      ...prevState,
      [input]: value
    }));
  }

  const submitHandler = (e) => {
    e.preventDefault(); 
    let valid = true;
      if(formData.name==='') {
        document.getElementById('titleMessage').style.display = 'block';  
        valid = false  
      }
      if(formData.price==='') {
        document.getElementById('priceMessage').style.display = 'block';    
        valid = false
      }
      if(formData.stock==='') {
        document.getElementById('stockMessage').style.display = 'block';   
        valid = false 
      }
    
      if(valid) {
        const formData1 = new FormData();
        formData1.append('name', formData.name);
        formData1.append('description', formData.description);
        formData1.append('stock', formData.stock);
        formData1.append('price', formData.price);   
        formData1.append('file', file);
    
        if(id==='-1') {
          dispatch(createGift(formData1)).then((data) => {
            if(data._id) {
                Store.addNotification({
                  title: "Gift successfully created!",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  dismiss: {
                    duration: 2000,
                  }
                });
                navigate('/list-gifts')
              } else {
                Store.addNotification({
                  title: "Gift is not created!",
                  type: "danger",
                  insert: "top",
                  container: "top-right",
                  dismiss: {
                    duration: 2000,
                  }
                });
              }
          })
        } else {
          formData1.append('_id',id);
          dispatch(updateGift(formData1)).then((data) => {
            if(data._id) {
                Store.addNotification({
                  title: "Gift successfully updated!",
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  dismiss: {
                    duration: 2000,
                  }
                });
                navigate('/list-gifts')
              } else {
                Store.addNotification({
                  title: "Gift is not updated!",
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
  }
  return (
    <div className="row d-flex justify-content-between">
    <div className="col-5">
      <form onSubmit={submitHandler}>
        <div className="form-group mt-3">
            <label className="form-label" htmlFor="title">Title</label>
            <input type="text" className="form-control-sm form-control" id="title" value={formData.name} aria-describedby="titleHelp" placeholder="Enter title" onChange={handleFormData("name")} disabled={token!==undefined}/>
            <small id ="titleMessage" style= {{display: 'none'}} className="form-text text-danger">Title is required</small>
        </div>
        <div className="form-group mt-3">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea className="form-control form-control-sm" id="description" value={formData.description} rows="3" placeholder="Enter description" onChange={handleFormData("description")} disabled={token!==undefined}></textarea>
        </div>
        <div className="form-group mt-3">
            <label className="form-label" htmlFor="price">Price</label>
            <input type="number" className="form-control-sm form-control" id="price" value={formData.price} aria-describedby="priceHelp" placeholder="Enter price" onChange={handleFormData("price")} disabled={token!==undefined}/>
            <small id ="priceMessage" style= {{display: 'none'}} className="form-text text-danger">Price is required</small>
        </div>
        <div className="form-group mt-3">
            <label className="form-label" htmlFor="stock">Stock</label>
            <input type="number" className="form-control-sm form-control" id="stock" value={formData.stock} aria-describedby="stockHelp" placeholder="Enter stock" onChange={handleFormData("stock")} disabled={token!==undefined}/>
            <small id ="stockMessage" style= {{display: 'none'}} className="form-text text-danger">Stock is required</small>
        </div>
        <div className="form-group mt-3">
            <label htmlFor="photo" className="form-label" >Photo</label>
            <input className="form-control" type="file" id="photo" required={id==='-1' ? true : false} accept="image/*" onChange={onChange} disabled={token!==undefined}/>
            <small id ="photoMessage" style= {{display: 'none'}} className="form-text text-danger">Photo is required</small>
        </div>
        <div className="d-flex flex-row justify-content-between mb-3">
          <button type="submit" className="btn btn-sm btn-primary mt-4" disabled={token!==undefined}>submit</button>
          <button className="btn btn-sm btn-primary mt-4" onClick={() => navigate(`/list-gifts`)}>back</button>
        </div>
      </form>
    </div>
    <div className="col-5 d-flex align-items-center">
      <div style={{height: '300px'}}>
        {formData.photo.name!=="" ? (
          <img  style={{maxWidth: '100%',maxHeight: '100%'}} src={URL+formData.photo.name}/>
        ) : (
          <img style={{maxWidth: '100%',maxHeight: '100%'}} src={photo} alt="icon"/>
        )}
      </div>
    </div>
    </div>
  )
}

export default GiftScreen
