import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectors } from 'redux/user';
import propTypes from 'prop-types';

export default function PrivateRouter({ children, ...routeProps }) {
  const status = useSelector(selectors.getIsLoggined);
  return (
    <Route {...routeProps}>{status ? children : <Redirect to="/" />}</Route>
  );
}

PrivateRouter.propTypes = {
  children: propTypes.element.isRequired,
  path: propTypes.string.isRequired,
};
