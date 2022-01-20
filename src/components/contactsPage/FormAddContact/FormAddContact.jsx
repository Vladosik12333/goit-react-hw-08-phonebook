import React, { useEffect } from 'react';
import { contactsAPI } from 'redux/services';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, InfoError } from './FormAddContact.styled';
import toast from 'react-hot-toast';

export default function FormAddContact() {
  const token = Cookies.get('token');
  const [addContact, { isLoading, isSuccess, isError, error }] =
    contactsAPI.useAddContactMutation();
  const {
    data,
    isError: isErrorContacts,
    error: errorContacts,
  } = contactsAPI.useGetContactsQuery(token);

  useEffect(() => {
    if (isErrorContacts) {
      switch (errorContacts.status) {
        case 401:
          toast.error('Error with token.');
          return;
        case 404:
          console.log('Not contacts.');
          return;
        case 500:
          toast.error('Something don`t work. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
      }
    }
  }, [isErrorContacts]);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be 3 characters or more.')
        .max(20, 'Name must be 20 characters or less.'),
      phone: Yup.string().max(20, 'Password must be 20 characters or less.'),
    }),
    onSubmit: ({ name, phone }) => {
      if (data.length !== 0) {
        const result = data.find(
          contact => contact.name.toLowerCase() === name.toLowerCase(),
        );
        if (result) return toast.error('This name is busy.');
      }

      addContact({ contact: { name, number: phone }, token });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('You added contact.');
      return;
    }

    if (isError) {
      switch (error.status) {
        case 400:
          return toast.error('Incorrect contact information.');
        case 401:
          return toast.error('Error with token.');
        default:
          return toast.error('Unknworn error.');
      }
    }
  }, [isError, isSuccess]);

  const disabledButton = () => {
    if (
      isLoading ||
      formik.values.name === '' ||
      formik.values.phone === '' ||
      formik.errors.phone ||
      formik.errors.name
    )
      return true;
    return false;
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InfoError>
        {formik.values.name === ''
          ? ''
          : formik.errors.name
          ? formik.errors.name
          : ''}
      </InfoError>

      <Input
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Vlad Babiak"
      />

      <InfoError>
        {formik.values.phone === ''
          ? ''
          : formik.errors.phone
          ? formik.errors.phone
          : ''}
      </InfoError>

      <Input
        name="phone"
        type="tel"
        onChange={formik.handleChange}
        value={formik.values.phone}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        placeholder="098-022-55-64"
      />

      <Button type="submit" disabled={disabledButton()}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </Form>
  );
}
