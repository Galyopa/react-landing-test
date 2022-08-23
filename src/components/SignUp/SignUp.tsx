import { FC} from 'react';
import { Position } from './Position';
import { Upload } from './Upload';

import './signup.scss';

export const SignUp: FC = () => {
  return (
    <section className="signup" id="sign">
      <div className="container">
        <h2 className="signup__title title">
          Working with POST request
        </h2>
        <form className="signup__form">
          <label className='signup__label' htmlFor="name" >
            <input
              className="signup__input"
              type="text"
              name="name"
              id="name"
              placeholder=" "
            />
            <span className="signup__placeholder">
              Your name
            </span>
          </label>

          <label className='signup__label' htmlFor="email" >
            <input
              className="signup__input"
              type="text"
              name="email"
              id="email"
              placeholder=" "
            />
            <span className="signup__placeholder">
              Email
            </span>
          </label>

          <label className='signup__label' htmlFor="phone" >
            <input
              className="signup__input"
              type="text"
              name="phone"
              id="phone"
              placeholder=" "
            />
            <span className="signup__placeholder">
              Phone
            </span>
            <span className='signup__help-phone'>
              +38 (xxx) xxx - xx - xx
            </span>
          </label>

          <Position />

          <Upload />

          <button className="signup__btn lnk lnk-disable" type="submit">
            Sugn up
          </button>
        </form>
      </div>
    </section>
  );
};