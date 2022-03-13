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

import { getInfoFromToken } from './actions/userActions'
import { listSurveys } from './actions/surveyActions'
import { listDomains } from './actions/domainActions'
import { listUsers } from './actions/userActions'


import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listSurveys())
    dispatch(listDomains())
    dispatch(listUsers())
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
          </Routes>
        </Container>
      </main>
    <Footer />
  </BrowserRouter>
  )
}

export default App
