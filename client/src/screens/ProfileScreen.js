import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from 'react-notifications-component'

import { modifyProfile } from '../actions/userActions'


const ProfileScreen = () => {
  
  const [formData, setFormData] = useState({})
  const userLogin = useSelector((state) => state.userLogin);
  let { user } = userLogin;

  const countries = ['Tunisia', 'Algeria', 'Egypte'];

  const dispatch = useDispatch()

  useEffect(() => {
    setFormData(user)
  },[user])

  useEffect(() => {
    setFormData(user)
  },[]) 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(modifyProfile(formData)).then((data) => {
        if(data._id) {
          Store.addNotification({
            title: "Profile successfully updated!",
            type: "success",
            insert: "top",
            container: "top-right",
            dismiss: {
              duration: 2000,
            }
          });
        } else {
          Store.addNotification({
            title: "Profile is not updated!",
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
    <div className="row">
            <h3 className="mb-5 mt-4">User Profile</h3>
            <form onSubmit={submitHandler}>
                {formData?.type === 'admin' ? (
                    <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" className="form-control-sm form-control" value={formData?.firstName} onChange={handleInputData("firstName")} id="exampleInputFirstName" aria-describedby="firstNameHelp" placeholder="Enter first name"/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="text" className="form-control-sm form-control" value={formData.lastName} onChange={handleInputData("lastName")} id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="Enter last name"/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputUsername1">Username</label>
                            <input type="text" className="form-control-sm form-control" value={formData.username} onChange={handleInputData("username")} id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username"/>
                        </div>
                    </div>
                ) : formData?.type === 'participant' ? (
                    <div className="row">
                    <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputUsername1">Username</label>
                            <input type="text" className="form-control-sm form-control" value={formData?.username} onChange={handleInputData("username")} id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username"/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">First Name</label>
                            <input type="text" className="form-control-sm form-control" value={formData?.firstName} onChange={handleInputData("firstName")} id="exampleInputFirstName" aria-describedby="firstNameHelp" placeholder="Enter first name"/>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Country</label>
                            <select className="form-select form-select-sm" aria-label="Default select example" onChange={handleInputData("country")}>
                                {countries.map((country,i) => (
                                    <option value={`${i}`} selected={country===formData?.country}>{country}</option>
                                ))}  
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Last Name</label>
                            <input type="text" className="form-control-sm form-control" value={formData.lastName} onChange={handleInputData("lastName")} id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="Enter last name"/>
                        </div>
                    </div>
                </div>  
                ) : (
                    <div className="row">
                    <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputUsername1">Name</label>
                            <input type="text" className="form-control-sm form-control" value={formData?.username} onChange={handleInputData("username")} id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter name"/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Country</label>
                            <select className="form-select form-select-sm" aria-label="Default select example" onChange={handleInputData("country")}>
                                {countries.map((country,i) => (
                                    <option value={`${i}`} selected={country===formData?.country}>{country}</option>
                                ))}  
                            </select>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Business Area</label>
                            <input type="text" className="form-control-sm form-control" value={formData?.businessArea} onChange={handleInputData("businessArea")} id="exampleInputBusinessArea" aria-describedby="businessAreaHelp" placeholder="Enter business area"/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Employees Number</label>
                            <input type="number" className="form-control-sm form-control" value={formData?.nbrEmployees} onChange={handleInputData("nbrEmployees")} id="exampleInputNbrEmployees" aria-describedby="nbrEmployeesHelp" placeholder="Enter employees number"/>
                        </div>
                    </div>
                </div>    
                )}
                <button type="submit" className="btn btn-sm btn-primary mt-5">update</button>
            </form>
    </div>
  )
}

export default ProfileScreen
