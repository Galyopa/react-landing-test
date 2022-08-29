import { FC, useEffect, Suspense, lazy } from 'react';
import { setToken } from './app/auth';
import { useGetTokenQuery } from './services/UsersApi';
import { Loader } from './components/Loader/Loader';

import './reset.css';
import './App.scss';

const Header = lazy(() => import("./components/Header")
  .then(({Header}) => ({default: Header})));

const Users = lazy(() => import("./components/Users")
  .then(({Users}) => ({default: Users})));

const SignUp = lazy(() => import("./components/SignUp")
  .then(({SignUp}) => ({default: SignUp})));

export const App: FC = () => {
  const { data } = useGetTokenQuery();

  useEffect(()=> {
    setToken(data?.token);
  },[]);


  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <div className="page__main">
        <Users />
        <SignUp />
      </div>
    </Suspense>
  );
};
