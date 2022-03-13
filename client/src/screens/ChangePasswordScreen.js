import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from 'react-notifications-component';

import { updatePassword } from '../actions/userActions'
import Loader from '../components/Loader'

const ChangePasswordScreen = () => {

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')
    
  const userLogin = useSelector((state) => state.userLogin);
  const { user, loading } = userLogin;

  const dispatch = useDispatch()
  
  
  const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    return re.test(password);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword) {
        setMessage('Password do not match')
    } else if (!validatePassword(newPassword)) {
        setMessage('length > 8 */+:! [A-Z] [a-z] [0-9]')
    }
    else {
        dispatch(updatePassword(user._id,currentPassword,newPassword)).then((data) => {
            if(data._id) {
              Store.addNotification({
                title: "Password successfully updated!",
                type: "success",
                insert: "top",
                container: "top-right",
                dismiss: {
                  duration: 2000,
                }
              });
            } else {
              if(data.response.data.message==='Wrong Current Password') {
                setMessage('Old password is wrong')
              } else {
                Store.addNotification({
                    title: "Password is not updated!",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                      duration: 2000,
                    }
                  });
              }
            }
          })
    }
  }

  return (
    <div className="row">
            <h3 className="mb-5 mt-4">Update Password</h3>
            {(message!=="") ? 
            <div className="alert alert-danger mt-4" role="alert">
                {message}
            </div> : null}
            

            <form onSubmit={submitHandler}>
                <div className="col-5">
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">Old password</label>
                            <input type="text" className="form-control-sm form-control" id="exampleInputFirstName" aria-describedby="firstNameHelp" placeholder="Enter first name" onChange={(e) => {
                                setCurrentPassword(e.target.value)
                                setMessage("")
                            }}/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputEmail1">New password</label>
                            <input type="text" className="form-control-sm form-control" id="exampleInputLastName" aria-describedby="lastNameHelp" placeholder="Enter last name" onChange={(e) => {
                                setNewPassword(e.target.value)
                                setMessage("")
                            }}/>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label" htmlFor="exampleInputUsername1">Confirm password</label>
                            <input type="text" className="form-control-sm form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                setMessage("")
                            }}/>
                        </div>
                </div>
                <button type="submit" className="btn btn-sm btn-primary mt-5">update</button>
            </form>
    </div>
  )
}

export default ChangePasswordScreen
