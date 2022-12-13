import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  BoardsPage,
  NotFoundPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  WelcomePage,
} from './pages';
import store from './store';

function App() {
  const isLoggedIn = true;
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={isLoggedIn ? <WelcomePage /> : <Navigate to='/signin' />} />
        <Route path='/boards' element={<BoardsPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
