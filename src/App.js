import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';
import { userAPI } from 'redux/services';
import { actions, selectors } from 'redux/user';
import PublicRouter from 'components/_routes/PublicRouter';
import PrivateRouter from 'components/_routes/PrivateRouter';
import AppBar from 'components/AppBar/AppBar';
import HomeView from 'views/HomeView';

const ContactsView = lazy(() => import('views/ContactsView'));
const LoginView = lazy(() => import('views/LoginView'));
const RegisterView = lazy(() => import('views/RegisterView'));

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectors.getisTriedLoadCurrentUser);
  const token = Cookies.get('token');
  const { isSuccess, data, isError, error } = userAPI.useUserQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      dispatch(actions.isTriedLoadCurrentUser());
    }

    if (isSuccess) {
      dispatch(actions.authUser({ user: data, token }));
      dispatch(actions.isTriedLoadCurrentUser());
    }

    if (isError) {
      console.log(error);
      dispatch(actions.isTriedLoadCurrentUser());
    }
  }, [isSuccess, isError]);

  const placeToaster = () =>
    window.innerWidth > 480
      ? { position: 'top-center' }
      : { position: 'bottom-center' };

  return (
    status && (
      <div>
        <AppBar />

        <Switch>
          <Suspense fallback={<h1 className="helloUser">Loading...</h1>}>
            <PublicRouter path="/" exact>
              <HomeView />
            </PublicRouter>
            <PublicRouter path="/login" restricted>
              <LoginView />
            </PublicRouter>
            <PublicRouter path="/register" restricted>
              <RegisterView />
            </PublicRouter>
            <PrivateRouter path="/contacts">
              <ContactsView />
            </PrivateRouter>
          </Suspense>
          <Redirect to="/" />
        </Switch>
        <Toaster {...placeToaster()} />
      </div>
    )
  );
}
