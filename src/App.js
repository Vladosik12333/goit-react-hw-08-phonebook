import React, { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PublicRouter from 'components/_routes/PublicRouter';
import PrivateRouter from 'components/_routes/PrivateRouter';
import ContactsView from 'views/ContactsView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import AppBar from 'components/AppBar/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { userAPI } from 'redux/services';
import { actions, selectors } from 'redux/user';
import HomeView from 'views/HomeView';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectors.gethasCurrentUser);
  const token = Cookies.get('token');
  const { isSuccess, data, isError, error } = userAPI.useUserQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) {
      dispatch(actions.hasCurrentUser());
    }

    if (isSuccess) {
      dispatch(actions.authUser({ user: data, token }));
      dispatch(actions.hasCurrentUser());
    }
    if (isError) {
      console.log(error);
      dispatch(actions.hasCurrentUser());
    }
  }, [isSuccess, isError]);

  return (
    status && (
      <div>
        <AppBar />

        <Switch>
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
          <Redirect to="/" />
        </Switch>
        <Toaster position="bottom-right" />
      </div>
    )
  );
}
