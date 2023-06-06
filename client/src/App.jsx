import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{ duration: 2999 }} />
        <div className="flex-grow bg-gradient-to-b from-slate-800 to-red-500">
          <div className="flex items-center justify-center center h-full">
            <div className="text-center">
              <br />
              <br />
              <br />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </UserContextProvider>

  );
}

export default App;
