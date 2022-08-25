import { FC } from 'react';
import { Position } from './Position';
import { Upload } from './Upload';
import { useAddUserMutation } from '../../services/UsersApi';
import './signup.scss';
import success from '../../images/success-image.svg';
import { Loader } from '../Loader/Loader';
import { SubmitHandler, useForm, FormProvider} from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';

type Inputs = {
  name: string,
  phone: string,
  email: string,
  position: string,
  photo: FileList;
};

export const SignUp: FC = () => {
  const [ addUser,
    {
      isLoading,
      isSuccess,
    }
  ] = useAddUserMutation();

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', data.position);
    formData.append('photo', data.photo.item(0));

    addUser(formData).unwrap();
    reset();
  };

  return (
    <section className="signup" id="sign">
      <div className="container">
        <h2 className="signup__title title">
          Working with POST request
        </h2>
        {
          isSuccess
            ? (
              <img
                className="signup__success"
                src={success}
              />
            )
            : (
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
                          {'signup__input-error': errors.email}
                        )}
                      placeholder=" "
                      { ...register("email") }
                    />
                    <span
                      className={
                        classNames(
                          'signup__placeholder',
                          {'signup__placeholder-error': errors.email}
                        )}
                    >
                      Email
                    </span>
                    <p className='signup__error'>
                      {errors.email?.message}
                    </p>
                  </label>


                  <label className='signup__label' htmlFor="phone" >
                    <input
                      className={
                        classNames(
                          'signup__input',
                          {'signup__input-error': errors.phone}
                        )}
                      placeholder=" "
                      { ...register("phone") }
                    />
                    <span className={
                      classNames(
                        'signup__placeholder',
                        {'signup__placeholder-error': errors.phone}
                      )}>
                      Phone
                    </span>
                    <span className='signup__help-phone'>
                      +38 (xxx) xxx - xx - xx
                    </span>
                    <p className='signup__error'>
                      {errors.phone?.message}
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
                        Sugn up
                        </button>
                      )
                  }
                </form>
              </FormProvider>
            )
        }

      </div>
    </section>
  );
};