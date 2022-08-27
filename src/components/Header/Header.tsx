import { FC } from "react";
import { Nav } from "./Nav";
import logo from '../../logo.svg';

import './header.scss';

export const Header: FC = () => (
  <header className="header">
    <div className="header__top">
      <div className="container">
        <div className="header__top-wrapper">
          <a className="logo" href="#">
            <img
              src={logo}
              alt="TESTTASK"
              width={104}
              height={26}
            />
          </a>
          <Nav />
        </div>
      </div>
    </div>
    <div className="header__bottom">
      <div className="container">
        <div className="header__content">
          <h1 className="header__title title">
            Test assignment for front-end developer
          </h1>
          <p className="header__text">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they&apos;ll be building web interfaces with
            accessibility in mind. They should also be excited to learn,
            as the world of Front-End Development keeps evolving.
          </p>
          <a className="header__link lnk" href="#sign">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </header>
);

