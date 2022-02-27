import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';  

import './App.css'

import Footer from './components/Footer.js';
import Header from './components/Header.js';
import HomeScreen from './screens/HomeScreen.js';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <main className="App">
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
    <Footer />
  </BrowserRouter>
  )
}

export default App
