import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Boards } from './pages/Boards';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Welcome } from './pages/Welcome';

function App() {
  const isLoggedIn = true;
  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Welcome /> : <Navigate to="/signin" />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
