import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'



const RegisterScreen = () => {
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const [message, setMessage] = useState(null)
    const [color, setColor] = useState('alert-danger')

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validatePassword = (password) => {
      const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
      return re.test(password);
    }

    const submitHandler =  (e) => {
        e.preventDefault()    
        if(password !== confirmPassword) {
            setMessage('Password do not match')
            setColor('alert-danger')
        } else if (!validatePassword(password)) {
            setMessage('length > 8 */+:! [A-Z] [a-z] [0-9]')
            setColor('alert-danger')
        } else if(error!=="") {
            setMessage(error)
            setColor('alert-danger')
        }
        else {
            dispatch(register(username, email, password)).then(data => {
              if(data.message==="success") {
                setMessage('Check Your email please!')
                setColor('alert-success')
                setTimeout(function(){ navigate('/login') }, 3000);
              }
            })
        }
    }
  
  return (
        <div className="row">
          <div className="col-6">
          <h1  className="mt-4">Sign UP</h1>
          {message && <div className={`alert mt-4 ${color}`}  role="alert">
            {message}
          </div>}
          {loading && <Loader />} 
          <form onSubmit={submitHandler}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"  
                  onChange={(e) => { 
                  setMessage('') 
                  setUsername(e.target.value)}} 
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={(e) => {
                setEmail(e.target.value)
                setMessage('') }}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" 
                onChange={(e) => {                  
                setMessage('') 
                setPassword(e.target.value)}}/>
              </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" 
                onChange={(e) => {                  
                setMessage('') 
                setConfirmPassword(e.target.value)}}/>
            </div>
  
            <button type="submit" className="btn btn-secondary mt-4">Register</button>
            <div className="row mt-3">
              <div className="col">
                <Link to="/login">
                  you have an account ? sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}

export default RegisterScreen
