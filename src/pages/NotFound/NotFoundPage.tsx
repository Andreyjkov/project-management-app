// import s from '../src/components/Auth/auth.module.scss';
import s from '../../components/Auth/auth.module.scss';

export function NotFoundPage() {
  // const { t } = useTranslation('common');
  return (
    <div className={s.container}>
      <main className={s.main}>
        <h1>NotFoundPage{/* {t('NotFoundPage')} */}</h1>
      </main>
    </div>
  );
}
