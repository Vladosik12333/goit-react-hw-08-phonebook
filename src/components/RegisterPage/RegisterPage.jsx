import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, InfoError } from './RegisterPage.styled';
import { userAPI } from 'redux/services';
import { useEffect } from 'react';
import { actions } from 'redux/user';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [register, { data, isError, isLoading, isSuccess, error }] =
    userAPI.useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('You are register.');
      Cookies.set('token', data.token);
      dispatch(actions.authUser(data));
      return;
    }

    if (isError) {
      switch (error.status) {
        case 400:
          toast.error(
            'You are entering incorrect data. Data may not be valid or your mail or name may be busy.',
          );
          return;
        case 500:
          toast.error('Something don`t work. Please try again later.');
          return;
        default:
          toast.error('Unknworn error.');
          return;
      }
    }
  }, [isError, isSuccess]);

  const formik = useFormik({
    initialValues: {
      login: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string()
        .min(3, 'Name must be 3 characters or more.')
        .max(15, 'Name must be 15 characters or less.'),
      email: Yup.string().email('Invalid email address.'),
      password: Yup.string()
        .min(7, 'Password must be 7 characters or more.')
        .max(20, 'Password must be 20 characters or less.'),
    }),
    onSubmit: values => {
      register({
        name: values.login,
        email: values.email,
        password: values.password,
      });
    },
  });

  const disabledButton = () => {
    if (
      isLoading ||
      formik.values.login === '' ||
      formik.values.email === '' ||
      formik.values.password === '' ||
      formik.errors.password ||
      formik.errors.email ||
      formik.errors.login
    )
      return true;
    return false;
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InfoError>
        {formik.values.login === ''
          ? ''
          : formik.errors.login
          ? formik.errors.login
          : ''}
      </InfoError>

      <Input
        name="login"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.login}
        placeholder="Vlad Babiak"
      />

      <InfoError>
        {formik.values.email === ''
          ? ''
          : formik.errors.email
          ? formik.errors.email
          : ''}
      </InfoError>

      <Input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="vlad@gmail.com"
      />

      <InfoError>
        {formik.values.password === ''
          ? ''
          : formik.errors.password
          ? formik.errors.password
          : ''}
      </InfoError>

      <Input
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="vlad123"
      />

      <Button type="submit" disabled={disabledButton()}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </Form>
  );
}
