import { FC } from 'react';
import './nav.scss';

export const Nav: FC =() => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <a className="nav__link lnk" href="#users">
          Users
        </a>
      </li>
      <li className="nav__item">
        <a className="nav__link lnk" href="#sign">
          Sign Up
        </a>
      </li>
    </ul>
  </nav>
);
