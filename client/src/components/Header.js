import React from 'react';  
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import { logout } from "../actions/userActions";


const Header = () => {

  const token = localStorage.getItem('token')
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <div>
       <header>
              
              <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 fixed-top">
               <div className="navbar-brand">Paid Survey</div>
               <div className="collapse navbar-collapse">
               </div>
               <div>
                 <ul className="navbar-nav">
                   <li className="nav-item active">
                     <a className="nav-link" href="#">About Us</a>
                   </li>
                   <li className="nav-item">
                      <Link to="/list-surveys"  style={{textDecoration:"none"}} >
                        <a className="nav-link">
                          Surveys
                        </a>
                      </Link>
                    </li>
                   <li className="nav-item">
                     <a className="nav-link" href="#">About Us</a>
                   </li>
                  
                   {user!==null ? (
                     <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       {user?.username}
                       </a>
                       <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                         <a className="dropdown-item" href="#">Complete Profile</a>
                         <a className="dropdown-item" href="#">Update Profile</a>
                         <a className="dropdown-item" href="#">Settings</a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                       </div>
                     </li>
                   ) : (
                    
                       <li className="nav-item">
                        <Link to="/login"  style={{textDecoration:"none"}} >
                           <a className="nav-link">Sign In</a>
                        </Link>
                       </li>
                     
                   )}
                   {user!==null && user?.type==="admin" && (
                     <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Admin
                       </a>
                       <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                       <Link to="/list-users"  style={{textDecoration:"none"}} >
                         <a className="dropdown-item" href="#">Users</a>
                        </Link>
                        <Link to="/list-surveys"  style={{textDecoration:"none"}} >
                         <a className="dropdown-item" href="#">Surveys</a>
                        </Link>
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
    </div>
  
  )
}

export default Header
