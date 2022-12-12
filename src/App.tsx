import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Boards, NotFound, Profile, SignIn, SignUp, Welcome,
} from './pages';
import store from './store';

function App() {
  const isLoggedIn = true;
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Welcome /> : <Navigate to="/signin" />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
