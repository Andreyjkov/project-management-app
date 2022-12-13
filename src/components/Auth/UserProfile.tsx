import { useForm } from 'react-hook-form';
import s from './auth.module.scss';
import { useEffect, useState } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, logout, updateUser } from '../../store/auth/authThunk';
import { callReset, setIsDelete } from '../../store/auth/sliceAuth';
import { IFormData } from './interfaceAuth';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState(false);

  const { isSuccess, user, token, message, isError, isDelete, isLoading } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: user?.name || '',
      login: user?.login || '',
    },
  });

  useEffect(() => {
    if (isDelete) {
      dispatch(callReset());
      // toast.success('Profile Deleted!');
      dispatch(logout());
      dispatch(setIsDelete());
      navigate('/');
    }

    if (isSuccess) {
      dispatch(callReset());
      // toast.success('Profile changed!');
      resetField('password');
    }

    if (isError) {
      // toast.error(message);
      dispatch(callReset());
    }
  }, [isDelete, isSuccess, isError, dispatch, resetField, message]);

  const onSubmit = (formData: IFormData) => {
    user && dispatch(updateUser({ formData, token, id: user._id }));
  };

  const handleDelete = () => {
    user && dispatch(deleteUser({ id: user._id, token }));
  };

  const handleOpenModal = () => {
    setIsShowModal(true);
  };

  // if (isLoading) {
  //   return <Preloader />;
  // }

  return (
    <>
      <h2>
        {/* {t('profile:profileName_h2')}: {user?.name} */}
        profileName
      </h2>
      <h2>
        {/* {t('profile:profileLogin_h2')}: {user?.login} */}
        profileLogin
      </h2>
      <form
        className={s.form}
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <section>
          <label className={s.label} htmlFor='name'>
            {/* {t('signup:formInput_name')} */}
            name
          </label>
          <input
            id='name'
            type='text'
            className={s.input}
            {...register('name', {
              required: 'error' /* `${t('signup:formInput_name_valid')}` */,
              minLength: {
                value: 3,
                message: 'error' /* `${t('signup:formInput_name_valid>3')}` */,
              },
              pattern: {
                value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                message: 'error' /* `${t('signup:formInput_name_validAlphabetic')}` */,
              },
            })}
          />
          <div className={s.errorForm}>{errors.name?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='login'>
            login
            {/* {t('signup:formInput_login')} */}
          </label>
          <input
            id='login'
            type='text'
            className={s.input}
            {...register('login', {
              required: 'error' /* `${t('signup:formInput_login_valid')}` */,
              minLength: {
                value: 3,
                message: 'error' /* `${t('signup:formInput_login_valid>3')}` */,
              },
            })}
          />
          <div className={s.errorForm}>{errors.login?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor='password'>
            {/* {t('signup:formInput_pass')} */}
            password
          </label>
          <input
            id='password'
            type='password'
            className={s.input}
            {...register('password', {
              required: 'error' /* `${t('signup:formInput_pass_valid')}` */,
              minLength: {
                value: 5,
                message: 'error' /* `${t('signup:formInput_pass_valid>5')}` */,
              },
            })}
          />
          <div className={s.errorForm}>{errors.password?.message}</div>
        </section>
        <button className={s.btn}>btnChange{/* {t('profile:btnChange')} */}</button>
      </form>
      <button onClick={handleOpenModal} className={s.btn} style={{ background: 'red' }}>
        {/* {t('profile:btnDelete')} */}btnDelete
      </button>
      {/* <Modal
        onConfirm={handleDelete}
        title={t('profile:modal_title')}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      /> */}
      {/* <ToastContainer position='top-center' autoClose={false} style={{ fontSize: '2rem' }} /> */}
    </>
  );
}
