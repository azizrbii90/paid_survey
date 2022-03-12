import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StepOne = ({ nextStep, handleFormData, handleFormTables, values }) => {
  
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  
  const nextHandler = () => {
      let valid = true;
      if(!document.getElementById('title').validity.valid) {
        document.getElementById('titleMessage').style.display = 'block';  
        valid = false  
      }
      if(!document.getElementById('price').validity.valid) {
        document.getElementById('priceMessage').style.display = 'block';    
        valid = false
      }
      if(!document.getElementById('minResponses').validity.valid) {
        document.getElementById('minResponsesMessage').style.display = 'block';   
        valid = false 
      }
      if(valid)
        nextStep();
  };

  return (
  <div>
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="d-flex flex-row justify-content-between">
          <h4>Step One</h4>
          <button type="button" className="btn btn-sm btn-primary" onClick={() => navigate('/list-surveys')}>back</button>
        </div>
        <div className="form-group mt-5">
          <label className="form-label" >Title</label>
          <input id="title" type="text" className="form-control-sm form-control" placeholder="Enter title" required value={values.title} onChange={handleFormData("title")} />
          <small id ="titleMessage" style= {{display: 'none'}} className="form-text text-danger">Title is required</small>
        </div>
        <div className="form-group mt-3">
          <label className="form-label" >Price</label>
          <input id="price" type="number" className="form-control-sm form-control" placeholder="Enter Price" required value={values.price} onChange={handleFormData("price")} />
          <small id ="priceMessage" style= {{display: 'none'}} className="form-text text-danger">Price is required</small>

        </div>
        <div className="form-group mt-3">
          <label className="form-label" >Number of participants expected</label>
          <input id="minResponses" type="number" className="form-control-sm form-control" placeholder="Enter Number of participants expected" required value={values.minResponses} onChange={handleFormData("minResponses")} />
          <small id ="minResponsesMessage" style= {{display: 'none'}} className="form-text text-danger">Number of participants expected is required</small>
        </div>
        { user?.type==="admin" && (
          <div className="form-group mt-3">
          <label className="form-label" >Price participation</label>
          <input id="responsePrice" type="number" className="form-control-sm form-control" placeholder="Price participation" required value={values.responsePrice} onChange={handleFormData("responsePrice")} />
        </div>
        )}
        <button className="btn btn-primary btn-sm mt-5" style={{float: 'right', width:'80px'}} onClick={nextHandler} >next</button>
      </div>
    </div>
  </div>
 );
};

export default StepOne;