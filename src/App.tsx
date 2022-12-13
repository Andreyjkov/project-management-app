import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BoardsPage } from './pages/Boards/BoardsPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SignInPage } from './pages/SignIn/SignInPage';
import { SignUpPage } from './pages/SignUp/SignUpPage';
import { WelcomePage } from './pages/Welcome/WelcomePage';
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
