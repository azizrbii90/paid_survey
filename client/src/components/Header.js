import React from 'react';  
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const Header = () => {

  const token = localStorage.getItem('token')
  const user = undefined
 console.log("test user ",user)

  return (
    <header>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand m-2" href="#">Paid Survey</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">About Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About Us</a>
      </li>
      {user ? (
         <li className="nav-item dropdown">
         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           {user?.name}
         </a>
         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
           <a className="dropdown-item" href="#">Profile</a>
           <a className="dropdown-item" href="#">Settings</a>
           <div className="dropdown-divider"></div>
           <a className="dropdown-item" href="#">Logout</a>
         </div>
       </li>
      ) : (
        <Link to="/login">
        <li className="nav-item">
          <a className="nav-link">Sign In</a>
        </li>
        </Link>
      )}
      {user && user?.type==="admin" && (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Users</a>
          <a className="dropdown-item" href="#">Surveys</a>
          <a className="dropdown-item" href="#">complaints</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      )}
      

        
     
    </ul>
    
  </div>
</nav>
   </header>
  )
}

export default Header
