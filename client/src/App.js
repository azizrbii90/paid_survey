import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';  
import { useDispatch } from 'react-redux';
import './App.css'

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecoverPasswordRequestScreen from './screens/RecoverPasswordRequestScreen';
import RecoverPasswordScreen from './screens/RecoverPasswordScreen';

import ListSurveysScreen from './screens/ListSurveysScreen';
import SurveyScreen from './screens/SurveyScreen';
import SurveyReplyScreen from './screens/SurveyReplyScreen';

import ListUsersScreen from './screens/ListUsersScreen';

import ListParticipantsScreen from './screens/ListParticipantsScreen';

import ListGiftsScreen from './screens/ListGiftsScreen';
import GiftScreen from './screens/GiftScreen';

import ProfileScreen from './screens/ProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

import OrderScreen from './screens/OrderScreen';
import ListOrdersScreen from './screens/ListOrdersScreen';

import CartScreen from './screens/CartScreen';

import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';

import ListComplaintsScreen from './screens/ListComplaintsScreen';
import ComplaintScreen from './screens/ComplaintScreen';

import { getInfoFromToken } from './actions/userActions'
import { listSurveys } from './actions/surveyActions'
import { listDomains } from './actions/domainActions'
import { listUsers } from './actions/userActions'
import { listGifts } from './actions/giftActions'
import { listOrders } from './actions/orderActions'
import { listComplaints } from './actions/complaintActions'


import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listSurveys())
    dispatch(listDomains())
    dispatch(listUsers())
    dispatch(listGifts())
    dispatch(listOrders())
    dispatch(listComplaints())
    let token = localStorage.getItem('token')
    if(token) 
      dispatch(getInfoFromToken())
  },[])

  return (
    <BrowserRouter>
    <div style={{  position: 'absolute', top:0}} >
    <ReactNotifications />
     </div>
    <Header />
    
      <main className="App">

        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/recover-password-request" element={<RecoverPasswordRequestScreen />} />
            <Route path="/recover-password" element={<RecoverPasswordScreen />} />
            <Route path="/list-surveys" element={<ListSurveysScreen />} />
            <Route path="/surveys/:id" element={<SurveyScreen />} />
            <Route path="/surveys/reply/:id" element={<SurveyReplyScreen />} />
            <Route path="/list-users" element={<ListUsersScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/settings-password" element={<ChangePasswordScreen />} />
            <Route path="/list-participants/:id" element={<ListParticipantsScreen />} />
            <Route path="/list-gifts" element={<ListGiftsScreen />} />
            <Route path="/gifts/:id" element={<GiftScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/list-orders" element={<ListOrdersScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/about-us" element={<AboutUsScreen />} />
            <Route path="/contact-us" element={<ContactUsScreen />} />
            <Route path="/list-complaints" element={<ListComplaintsScreen />} />
            <Route path="/complaint" element={<ComplaintScreen />} />
          </Routes>
        </Container>
      </main>
    <Footer />
  </BrowserRouter>
  )
}

export default App
