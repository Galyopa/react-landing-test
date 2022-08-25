import { FC, useCallback, useEffect, useState} from 'react';
import { Position } from './Position';
import { Upload } from './Upload';
import { useAddUserMutation } from '../../services/UsersApi';
import './signup.scss';
import success from '../../images/success-image.svg';
import { Loader } from '../Loader/Loader';

export const SignUp: FC = () => {
  const [name, setName] =  useState('');
  const [email, setEmail] =  useState('');
  const [phone, setPhone] =  useState('');
  const [positionId, setPositionId] = useState('');
  const [ addUser,
    {
      isLoading,
      isSuccess,
    }
  ] = useAddUserMutation();
  const [
    selectedFile,
    setSelectedFile
  ] = useState<File | null>(null);

  useEffect(()=> {
    setName('');
    setEmail('');
    setPhone('');
    setPositionId('');
    setSelectedFile(null);
  }, [isSuccess]);

  const handlePosition = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPositionId(event.target.value);
  }, []);

  const handleSelectedFile = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setSelectedFile(event.target.files.item(0));
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', positionId);
    formData.append('photo', selectedFile);

    addUser(formData).unwrap();
  };

  return (
    <section className="signup" id="sign">
      <div className="container">
        <h2 className="signup__title title">
          Working with POST request
        </h2>
        {
          !isSuccess
            ? (
              <img
                className="signup__success"
                src={success}
              />
            )
            : (
              <form className="signup__form" onSubmit={handleSubmit}>
                <label className='signup__label' htmlFor="name" >
                  <input
                    value={name}
                    className="signup__input"
                    type="text"
                    name="name"
                    id="name"
                    placeholder=" "
                    onChange={(event) => setName(event.target.value)}
                  />
                  <span className="signup__placeholder">
                    Your name
                  </span>
                </label>

                <label className='signup__label' htmlFor="email" >
                  <input
                    value={email}
                    className="signup__input"
                    type="text"
                    name="email"
                    id="email"
                    placeholder=" "
                    onChange={event => setEmail(event.target.value)}
                  />
                  <span className="signup__placeholder">
                    Email
                  </span>
                </label>

                <label className='signup__label' htmlFor="phone" >
                  <input
                    value={phone}
                    className="signup__input"
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder=" "
                    onChange={event => setPhone(event.target.value)}
                  />
                  <span className="signup__placeholder">
                    Phone
                  </span>
                  <span className='signup__help-phone'>
                    +38 (xxx) xxx - xx - xx
                  </span>
                </label>

                <Position onChange={handlePosition} />

                <Upload
                  onChange={handleSelectedFile}
                  selectedFile={selectedFile}
                />
                {
                  isLoading
                    ? (<Loader />)
                    : (
                      <button
                        className="signup__btn lnk lnk-disable"
                        type="submit"
                      >
                        Sugn up
                      </button>
                    )
                }
              </form>
            )
        }

      </div>
    </section>
  );
};