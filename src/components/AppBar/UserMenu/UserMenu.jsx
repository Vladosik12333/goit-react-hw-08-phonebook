import { Container, Button } from './UserMenu.styled';
import { userAPI } from 'redux/services';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { actions, selectors } from 'redux/user';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function UserMenu() {
  const status = useSelector(selectors.getIsLoggined);
  const email = useSelector(selectors.getEmail);
  const dispatch = useDispatch();
  const [logout, { isLoading, isSuccess, isError, error }] =
    userAPI.useLogoutMutation();

  const handleLogout = () => {
    logout(Cookies.get('token'));
  };

  useEffect(() => {
    if (isSuccess) {
      Cookies.remove('token');
      dispatch(actions.exitUser());
      toast.success('You exited.');
      return;
    }

    if (isError) {
      switch (error.status) {
        case 401:
          toast.error('Error with token.');
          return;
        case 500:
          toast.error('Something don`t work. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
      }
    }
  }, [isSuccess, isError]);

  return (
    <Container>
      <p>{email}</p>
      <Button onClick={handleLogout} disabled={!status || isLoading}>
        {isLoading ? 'Loading...' : 'Logout'}
      </Button>
    </Container>
  );
}
