import { Link } from 'react-router-dom';
import { NavigationStyled } from './Navigation.styled';
import propTypes from 'prop-types';

export default function Navigation({ loggined }) {
  return (
    <NavigationStyled>
      {loggined ? (
        <Link to="/contacts">Contacts</Link>
      ) : (
        <>
          <Link to="register">Sign up</Link>
          <Link to="login">Log in</Link>
        </>
      )}
    </NavigationStyled>
  );
}

Navigation.propTypes = {
  loggined: propTypes.bool.isRequired,
};
