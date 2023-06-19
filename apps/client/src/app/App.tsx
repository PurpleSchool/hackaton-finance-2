import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userActions } from '~/entities/User';
import { Sidebar } from '~/widgets/Sidebar';

import { AppRouter } from './providers';
import './styles/index.scss';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className="app">
      <Suspense fallback="">
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
