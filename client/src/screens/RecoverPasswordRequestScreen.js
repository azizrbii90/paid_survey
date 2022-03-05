import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { recoverPasswordRequest } from '../apis/userApis'
import Loader from '../components/Loader'

const RecoverPasswordRequestScreen = () => {
    const [email, setEmail] = useState('')

    const [message, setMessage] = useState('')
    const [color, setColor] = useState('alert-danger')
    const [loading, setLoading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            recoverPasswordRequest(email).then((data) =>  {
            setLoading(false)
            setMessage(data.data.message)
            if(data.data.message==="Check your email to recover your password!")  
                setColor("alert-success") 
            else {
              setColor("alert-danger")
            }
          })
        } catch (error) {
          console.log(error.response.data)
        }
    }

  return (
    <div className="row">
      <div className="col-6">
        <h1 className="mt-4">Forgot Password</h1>
        {message && <div className={`alert mt-4 ${color}`} role="alert">
          {message}
        </div>}
        {loading && <Loader />} 
        <form onSubmit={submitHandler}>
           <div className="form-group mt-4">
             <label className="form-label" htmlFor="exampleInputEmail1">Email</label>
             <input type="email" className="form-control-sm form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {
             setEmail(e.target.value)
             setMessage('')}}/>
           </div>
        
          <button type="submit" className="btn w-100 btn-sm  btn-secondary mt-4">Send</button>
            <div className="row mt-3">
              <div className="col-8 align-self-start">
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

export default RecoverPasswordRequestScreen
