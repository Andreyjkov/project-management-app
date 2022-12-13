import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getUserById, signIn } from '../../store/auth/authThunk';
import { callReset } from '../../store/auth/sliceAuth';
import { IFormSignIn, IParseToken } from './interfaceAuth';
import { parseJwt } from '../../utilities/parseJwt';
// import Preloader from '../Preloader/Preloader';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './auth.module.scss';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { parseJwt } from '../utilities/parseJwt';
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isError, isLoading, user, message, token } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignIn>();

  useEffect(() => {
    if (isError) {
      // toast.error(message);
      dispatch(callReset());
    }

    if (user && token) {
      dispatch(callReset());
      navigate('/boards');
    }
  }, [token, isError, user, message, dispatch]);

  useEffect(() => {
    if (token) {
      const parseToken: IParseToken = parseJwt(token);
      const idAndToken = { id: parseToken.id, token: token };
      dispatch(getUserById(idAndToken));
    }
  }, [dispatch, token]);

  const onSubmit = (formData: IFormSignIn) => {
    dispatch(signIn(formData));
    reset();
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <section>
          <label className={s.label} htmlFor='login'>
            {/* {t('formInput_login')} */}
            login
          </label>
          <input
            id='login'
            type='text'
            className={s.input}
            {...register('login', {
              required: 'error' /* `${t('formInput_login_valid')}` */,
              minLength: {
                value: 3,
                message: 'error' /* `${t('formInput_login_valid>3')}` */,
              },
            })}
          />
          <div className={s.errorForm}>{errors.login?.message ? errors.login?.message : ''}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='password'>
            {/* {t('formInput_password')} */}
            password
          </label>
          <input
            id='password'
            type='password'
            className={s.input}
            {...register('password', {
              required: 'error' /* `${t('formInput_pass_valid')}` */,
              minLength: {
                value: 5,
                message: 'error' /* `${t('formInput_pass_valid>5')}` */,
              },
            })}
          />
          <div className={s.errorForm}>{errors.password?.message}</div>
        </section>
        <button className={s.btn}>formBtn_signin{/* {t('formBtn_signin')} */}</button>
      </form>
      <Link className={s.signUpLink} to={'/signup'}>
        <strong>signUpLink{/* {t('signUpLink')} */}</strong>
      </Link>
      {/* <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} /> */}
    </>
  );
}
