import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listSurveys } from "../actions/surveyActions";

import slide4 from '../images/slide4.jfif';
import slide2 from '../images/slide2.png';
import slide3 from '../images/slide3.png';
import slide5 from '../images/slide5.jpg';


import ListSurveysScreen from './ListSurveysScreen';




const HomeScreen = () => {
  
  return (
    <div>
      
   <div className="row">
    <img src={slide5} style={{height: '260px'}} />
   </div>
   <br></br>
  <div className="row text-center bg-light p-2">
  <h2>Get started in three easy steps</h2>
    <div className="col-4"> 
    <br/><br/>
     <h4>Join us</h4>
     <p>Sign up for Easy Win and confirm your email address</p>
    </div>
    <div className="col-4"> 
    <br/><br/>
    <h4>Respond to surveys</h4>
    <p>We will regularly email you invitations to participate in surveys. Surveys are quick and easy to answer</p>
    </div>
    <div className="col-4"> 
    <br/><br/>
    <h4>Earn rewards and get paid</h4>
    <p>When you complete a survey you earn points which can be redeemed for cash, data, broadcast time or vouchers</p>
    </div>
    
   </div>
   <br/><hr/><br/>
   <div className="row bg-light p-2">
     <h2>Helping governments, brands and NGOs make informed decisions in Africa.</h2><br/><br/>
     <p>
     When you join AfriSight, you will be asked for your opinion and perspective on:<br></br><br/>
     <ul>
       <li>Products and brands</li>
       <li>Markets and companies</li>
       <li>health and wellbeing</li>
       <li>People</li>
       <li>Policy and governance</li>
       <li>And many others...</li>
     </ul>
     Your opinion is appreciated and it helps companies to better understand their customers, to develop new products and services.
     </p>
   </div>
   <br/><hr/><br/>

   <div className="row bg-light p-2">
     <h3>Testimonials</h3>
     <div className="col-6">
      <p>
      <br/>
      As a student, Easy Win was a blessing. Now I earn a few extra pennies that allow me to buy airtime, data, and hang out with my girlfriend...<br/>
     <span className="text-secondary" style={{fontSize:'13px'}}>- azizrbii</span>
      </p>
      <p>
        <br/>
        Easy Win allows me to express my opinion, which I like to do. I made more friends, increased my knowledge of current affairs<br/>
        <span className="text-secondary" style={{fontSize:'13px'}}>- montassar riahi</span>

      </p>
     </div>
     <div className="col-6">
       <p><br/>
       As a banker, I was delighted that my expertise in the sector was valued. I recently received a copy of the research study in which I participated.<br/>
       <span className="text-secondary" style={{fontSize:'13px'}}>- salah mejri</span>
       </p>
       <p> <br/>
       It is a very practical and simple source of money, it really helps me in my life, , earned money for myself. thank you very much!<br/>
       <span className="text-secondary" style={{fontSize:'13px'}}>- amal zardoub</span>
       </p>
     </div>
   </div>

        <div>
        </div>
    </div>
  )
}

export default HomeScreen
