import React from 'react';
import SignIn from '../../components/Auth/SignIn';
import s from '../../components/Auth/auth.module.scss';

export function SignInPage() {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <h1>login{/* {t('login')} */}</h1>
        <SignIn />
      </main>
    </div>
  );
}
