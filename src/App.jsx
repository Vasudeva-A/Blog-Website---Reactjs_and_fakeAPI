import { useState } from 'react'
import HomePage from './Components/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';

import Navbar from './Components/Navbar'

import Signup from './Components/Signup';
import Blog from './Components/Blog';
import PostDetail from './Components/PostDetails';
import { Logout } from '@mui/icons-material';
import ProtectedRoute from './Components/ProtectedRoute';
import PostPage from './Components/PostPage';

function App() {

 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED */}
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
