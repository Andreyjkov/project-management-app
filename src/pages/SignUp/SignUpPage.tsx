import s from '../../components/Auth/auth.module.scss';
import SignUp from '../../components/Auth/SignUp';

export function SignUpPage() {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <h1>register{/* {t('register_h1')} */}</h1>
        <SignUp />
      </main>
    </div>
  );
}
