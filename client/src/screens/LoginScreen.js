import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    useEffect(() => {
      setMessage(error)
    }, [error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password)).then((data) => {
          if(data.message==="success") {
              navigate('/list-surveys')
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
        <div className="form-group mt-3">
         <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
         <input type="email" className="form-control-sm form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
           setEmail(e.target.value)
           setMessage("")
          }}/>
        </div>
        <div className="form-group mt-2">
         <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
         <input type="password" className="form-control-sm form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => {
           setPassword(e.target.value)
           setMessage("")
         }}/>
        </div>
       
       <button type="submit" className="btn w-100 btn-sm btn-secondary mt-4">Login</button>
        <div className="row mt-3">
          <div className="col-8">
            <Link to="/register">
              you dont have an account ? sign up
            </Link>
          </div>
          <div className="col">
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
