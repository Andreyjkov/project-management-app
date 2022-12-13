import UserProfile from '../../components/Auth/UserProfile';
import s from '../../components/Auth/auth.module.scss';

export function ProfilePage() {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <h1>profile{/* {t('profile_h1')} */}</h1>
        {<UserProfile />}
      </main>
    </div>
  );
}
