import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';  

import './App.css'

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecoverPasswordRequestScreen from './screens/RecoverPasswordRequestScreen';
import RecoverPasswordScreen from './screens/RecoverPasswordScreen';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="App">
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/recover-password-request" element={<RecoverPasswordRequestScreen />} />
            <Route path="/recover-password" element={<RecoverPasswordScreen />} />
          </Routes>
        </Container>
      </main>
    <Footer />
  </BrowserRouter>
  )
}

export default App
