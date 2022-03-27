import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';

import { createComplaint } from '../actions/complaintActions'


const ComplaintScreen = () => {
  
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        subject : '',   
        sender : user?._id, 
        receiver : null
    })

    useEffect(() => {
      if(user !== null) {
        if(user.type==='company') {
          setFormData({...formData, sender: user._id})
        } /*else {
          setFormData({...formData, receiver: user._id})
        }*/
      }
    },[user])
  
    useEffect(() => {
      if(user !== null) {
        if(user.type==='company') {
          setFormData({...formData, sender: user._id})
        } /*else {
          setFormData({...formData, receiver: user._id})
        }*/
      }
    },[])

    const handleFormData = input => e => {

        let value = e.target.value
        
        setFormData(prevState => ({
          ...prevState,
          [input]: value
        }));
    }

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createComplaint(formData)).then((data) => {
        if(data._id) {
            Store.addNotification({
              title: "Complaint successfully created!",
              type: "success",
              insert: "top",
              container: "top-right",
              dismiss: {
                duration: 2000,
              }
            });
            setFormData({
              subject : '',   
              sender : user?._id, 
              receiver : null
          })
          } else {
            Store.addNotification({
              title: "Complaint is not created!",
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
    <div><br/>
      <h1>Send complaint to admin</h1>
      <br/>
      <form onSubmit={submitHandler}>
        <div className="form-group mt-3">
            <textarea className="form-control form-control-sm" id="subject" value={formData.subject} required rows="10" placeholder="Enter subject" onChange={handleFormData("subject")}></textarea>
        </div>
        <div className="d-flex flex-row justify-content-between mb-3">
          <button type="submit" className="btn btn-sm btn-primary mt-4">submit</button>
          <button className="btn btn-sm btn-primary mt-4" onClick={() => navigate.goBack()}>back</button>
        </div>
      </form>
    </div>
  )
}

export default ComplaintScreen
