import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const dispatch = useDispatch()  

    useEffect(() => {
      setMessage(error)
    }, [error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password)).then((data) => {
          if(data?.message==="success") {
            alert('success')
          } 
        })
    }
  
  return (
    <div className="row">
      <div className="col-6">
      <h1 className="mt-4">Sign IN</h1>
      {(message!=="") ? <div className="alert alert-danger mt-4" role="alert">
        {message}
      </div> : null}
      {loading && <Loader />} 

      <form onSubmit={submitHandler}>
        <div className="form-group mt-4">
         <label htmlFor="exampleInputEmail1">Email</label>
         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
           setEmail(e.target.value)
           setMessage("")
          }}/>
        </div>
        <div className="form-group mt-3">
         <label htmlFor="exampleInputPassword1">Password</label>
         <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => {
           setPassword(e.target.value)
           setMessage("")
         }}/>
        </div>
       
       <button type="submit" className="btn btn-secondary mt-4">Login</button>
        <div className="row mt-3">
          <div className="col-8 align-self-start">
            <Link to="/register">
              you dont have an account ? sign up
            </Link>
          </div>
          <div className="col align-self-end">
            <Link to="/recover-password-request">
              forgot password ?
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>  
  )
}

export default LoginScreen
