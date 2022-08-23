import { FC } from 'react';
import { Header } from './components/Header';
import { SignUp } from './components/SignUp';
import { Users } from './components/Users';

import './App.scss';


export const App: FC = () => (
  <>
    <Header />
    <div className="page__main">
      <Users />
      <SignUp />
    </div>
  </>
);

