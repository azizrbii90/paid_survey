import React from 'react';  
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div 
    className="spinner-border" 
    animation="border"  
    role="status"
    style={{
        width: "100px",
        height: "100px",   
        margin: "auto", 
        display: "block"
    }}>
    <span className="st-only">Loading...</span>
  </div>
  )
}

export default Loader
