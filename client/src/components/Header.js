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
               <div className="navbar-brand">Easy Win</div>
               <div className="collapse navbar-collapse">
               </div>
               <div>
                 <ul className="navbar-nav">
                 <li className="nav-item active">
                    <Link to="/"  style={{textDecoration:"none"}} >
                     <a className="nav-link">Home</a>
                    </Link>
                   </li>
                   <li className="nav-item active">
                    <Link to="/about-us"  style={{textDecoration:"none"}} >
                     <a className="nav-link">About Us</a>
                    </Link>
                   </li>
                   <li className="nav-item">
                      <Link to="/list-surveys"  style={{textDecoration:"none"}} >
                        <a className="nav-link">
                          Surveys
                        </a>
                      </Link>
                    </li>
                    {user?.type!=="company" && (
                      <li className="nav-item">
                        <Link to="/list-gifts"  style={{textDecoration:"none"}} >
                          <a className="nav-link">
                            Gifts
                          </a>
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link to="/contact-us"  style={{textDecoration:"none"}} >
                        <a className="nav-link">
                          Contact Us
                        </a>
                      </Link>
                    </li>  
                   {user!==null ? (
                     <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       {user?.username}
                       </a>
                       <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                         <Link to="/profile"  style={{textDecoration:"none"}} >
                          <a className="dropdown-item" href="#">Update Profile</a>
                         </Link>
                         <Link to="/settings-password"  style={{textDecoration:"none"}} >
                          <a className="dropdown-item">Settings</a>
                         </Link>
                         {user?.type==='participant' && (
                          <>
                            <Link to="/profile" style={{ textDecoration: "none" }}>
                              <a className="dropdown-item">Wallet ${user?.wallet}</a>
                            </Link>
                            <Link to="/list-orders" style={{ textDecoration: "none" }}>
                              <a className="dropdown-item" href="#">Orders</a>
                            </Link>
                            <Link to="/cart" style={{ textDecoration: "none" }}>
                              <a className="dropdown-item" href="#">Cart</a>
                            </Link>
                          </>
                         )}
                          {user?.type==='admin' && (
                          <>
                            <Link to="/list-orders" style={{ textDecoration: "none" }}>
                              <a className="dropdown-item" href="#">Orders</a>
                            </Link>
                            <Link to="/list-users"  style={{textDecoration:"none"}} >
                              <a className="dropdown-item" href="#">Users</a>
                            </Link>
                          </>
                         )}
                         {(user?.type==='admin' || user?.type==='company') && (
                          <Link to={user?.type==='admin' ? '/list-complaints' : '/complaint' } style={{textDecoration:"none"}} >
                            <a className="dropdown-item" href="#">Complaints</a>
                          </Link>
                         )}
                         
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
                 {/*  {user!==null && user?.type==="admin" && (
                     <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Admin
                       </a>
                       <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      
                        <Link to="/list-surveys"  style={{textDecoration:"none"}} >
                         <a className="dropdown-item" href="#">Surveys</a>
                        </Link>
                        <Link to="/list-gifts"  style={{textDecoration:"none"}} >
                         <a className="dropdown-item" href="#">Gifts</a>
                        </Link>
                         <a className="dropdown-item" href="#">complaints</a>
                         <div className="dropdown-divider"></div>
                         <a className="dropdown-item" href="#">Something else here</a>
                       </div>
                     </li>
                 )} */}
                 </ul>
               </div>
             </nav>
           </header>
    </div>
  
  )
}

export default Header
