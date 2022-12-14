import { FC, useEffect, useState } from 'react';
import { Position } from './Position';
import { Upload } from './Upload';
import { useAddUserMutation } from '../../services/UsersApi';
import success from '../../images/success-image.svg';
import { Loader } from '../Loader/Loader';
import { SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';
import { useAppDispatch } from '../../app/hooks';
import { clearUsers, setPageUsers } from '../../app/users';
import './signup.scss';

type Inputs = {
  name: string,
  phone: string,
  email: string,
  position: string,
  photo: unknown;
};

export const SignUp: FC = () => {
  const [ addUser,
    {
      isLoading,
      isSuccess,
      error
    }
  ] = useAddUserMutation();
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm<Inputs>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    reset,
  } = methods;

  useEffect(()=> {
    if (isSuccess) {
      reset();
      dispatch(clearUsers());
      dispatch(setPageUsers(1));
      setErrorMsg('');
    }

    if (error) {
      if ('data' in error) {
        setErrorMsg(error.data.message);
      }
    }

  },[isSuccess, error]);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    const files: FileList = data.photo as FileList;

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', data.position);
    formData.append('photo', files.item(0) as Blob);

    addUser(formData).unwrap();
  };

  return (
    <section className="signup" id="sign">
      <div className="container">
        {
          isSuccess
            ? (
              <>
                <h2 className="title">User successfully registered</h2>
                <img
                  className="signup__success"
                  src={success}
                />
              </>
            )
            : (
              <>
                <h2 className="signup__title title">
                  Working with POST request
                </h2>
                <FormProvider {...methods}>
                  <form
                    className="signup__form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <label className='signup__label' htmlFor="name">
                      <input
                        className={
                          classNames(
                            'signup__input',
                            {'signup__input-error': errors.name}
                          )}
                        placeholder=" "
                        { ...register("name") }
                      />
                      <span
                        className={
                          classNames(
                            'signup__placeholder',
                            {'signup__placeholder-error': errors.name}
                          )}
                      >
                      Your name
                      </span>
                      <p className='signup__error'>
                        {errors.name?.message}
                      </p>
                    </label>

                    <label
                      className='signup__label'
                      htmlFor="email"
                    >
                      <input
                        className={
                          classNames(
                            'signup__input',
                            {'signup__input-error': errors.email || error }
                          )}
                        placeholder=" "
                        { ...register("email") }
                      />
                      <span
                        className={
                          classNames(
                            'signup__placeholder',
                            {'signup__placeholder-error': errors.email || error}
                          )}
                      >
                      Email
                      </span>
                      <p className='signup__error'>
                        {
                          errors.email?.message
                        || errorMsg
                        }
                      </p>
                    </label>


                    <label className='signup__label' htmlFor="phone" >
                      <input
                        className={
                          classNames(
                            'signup__input',
                            {'signup__input-error': errors.phone || error }
                          )}
                        placeholder=" "
                        { ...register("phone") }
                      />
                      <span className={
                        classNames(
                          'signup__placeholder',
                          {'signup__placeholder-error': errors.phone || error }
                        )}>
                      Phone
                      </span>
                      <span className='signup__help-phone'>
                      +38 (XXX) XXX - XX - XX
                      </span>
                      <p className='signup__error signup__error-phone'>
                        {
                          errors.phone?.message
                        || errorMsg
                        }
                      </p>
                    </label>

                    <Position />

                    <Upload/>

                    {
                      isLoading
                        ? (<Loader />)
                        : (
                          <button
                            className={
                              classNames(
                                'signup__btn',
                                'lnk',
                                {'lnk-disable' : !isValid}
                              )
                            }
                            type="submit"
                            disabled={!isValid}
                          >
                            Sign up
                          </button>
                        )
                    }
                  </form>
                </FormProvider>
              </>
            )
        }

      </div>
    </section>
  );
};