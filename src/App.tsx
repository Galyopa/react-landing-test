import { FC, useEffect } from 'react';
import { Header } from './components/Header';
import { SignUp } from './components/SignUp';
import { Users } from './components/Users';
import { setToken } from './app/auth';
import { useGetTokenQuery } from './services/UsersApi';

import './reset.css';
import './App.scss';

export const App: FC = () => {
  const { data } = useGetTokenQuery();

  useEffect(()=> {
    setToken(data?.token);
  },[]);


  return (
    <>
      <Header />
      <div className="page__main">
        <Users />
        <SignUp />
      </div>
    </>
  );
};
