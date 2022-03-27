import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'



const RegisterScreen = () => {
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isCompany, setIsCompany] = useState(false)
    
    const [message, setMessage] = useState(null)
    const [color, setColor] = useState('alert-danger')

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister 

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      setMessage('')
    }, [])

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
            let isVerified = true
            let type = 'participant'
            if(isCompany===true) {
                isVerified = false
                type='company'
            }
            dispatch(register(username, email, password, isVerified, type)).then(data => {
              if(data.message==="success") {
                setMessage('Check Your email please!')
                setColor('alert-success')
                setTimeout(function(){ navigate('/login') }, 3000);
              }
            })
        }
    }
  
  return (
        <div className="row justify-content-center">
          <div className="col-6">
          <h1  className="mt-4">Sign UP</h1>
          {message && <div className={`alert mt-4 ${color}`}  role="alert">
            {message}
          </div>}
          {loading && <Loader />} 
          <hr/>
          <form onSubmit={submitHandler}>
            <div className="form-group mt-4">
              <label className="form-label" htmlFor="exampleInputEmail1">Username</label>
              <input type="text" className="form-control-sm form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"  
                  onChange={(e) => { 
                  setMessage('') 
                  setUsername(e.target.value)}} 
              />
            </div>
            <div className="form-group mt-2">
              <label className="form-label" htmlFor="exampleInputEmail">Email</label>
              <input type="email" className="form-control-sm form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={(e) => {
                setEmail(e.target.value)
                setMessage('') }}/>
            </div>
            <div className="form-group mt-2">
              <label className="form-label" htmlFor="exampleInputPassword">Password</label>
              <input type="password" className="form-control-sm form-control" id="exampleInputPassword" placeholder="Password" 
                onChange={(e) => {                  
                setMessage('') 
                setPassword(e.target.value)}}/>
              </div>
            <div className="form-group mt-2">
              <label className="form-label" htmlFor="exampleInputPassword1">Confirm Password</label>
              <input type="password" className="form-control-sm form-control" id="exampleInputPassword1" placeholder="Confirm Password" 
                onChange={(e) => {                  
                setMessage('') 
                setConfirmPassword(e.target.value)}}/>
            </div>
            <div className="form-check form-switch mt-3">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                 onChange={(e) => { 
                 setMessage('') 
                 setIsCompany(e.target.checked)}}  />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">is a company account ?</label>
            </div>
  
            <button type="submit" className="btn w-100 btn-sm btn-secondary mt-4">Register</button>
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
