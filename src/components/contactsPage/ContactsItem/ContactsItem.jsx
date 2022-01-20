import { Item, Form, Input, Button, InfoError } from './ContactsItem.styled';
import propTypes from 'prop-types';
import { contactsAPI } from 'redux/services';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function ContactsItem({ contact, edit }) {
  const token = Cookies.get('token');
  const [deleteContact, { isError, error, isSuccess, isLoading }] =
    contactsAPI.useDeleteContactMutation();
  const [
    updateContact,
    {
      isError: isErrorUpdate,
      error: errorUpdate,
      isSuccess: isSuccessUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = contactsAPI.useUpdateContactMutation();
  const {
    data,
    isError: isErrorContacts,
    error: errorContacts,
  } = contactsAPI.useGetContactsQuery(token);

  const { id, name, number } = contact;

  useEffect(() => {
    if (isSuccess) {
      toast.success('You deleted contact.');
      return;
    }

    if (isError) {
      switch (error.status) {
        case 401:
          toast.error('Error with token.');
          return;
        case 404:
          toast.error('There is no such contact.');
          return;
        case 500:
          toast.error('Something don`t work. Please try again later.');
          return;
        default:
          toast.error('Unknwon error.');
          return;
      }
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdate) {
      toast.success('You changed contact.');
      return;
    }

    if (isErrorUpdate) {
      switch (errorUpdate.status) {
        case 400:
          toast.error('Error with update contact.');
          return;
        case 401:
          toast.error('Error with token.');
          return;
        default:
          toast.error('Unknwon error.');
          return;
      }
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  useEffect(() => {
    if (isErrorContacts) {
      switch (errorContacts.status) {
        case 401:
          toast.error('Error with token');
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
      name: name,
      phone: number,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Name must be 3 characters or more.')
        .max(20, 'Name must be 20 characters or less.'),
      phone: Yup.string().max(20, 'Password must be 20 characters or less.'),
    }),
    onSubmit: ({ name: newName, phone: newPhone }) => {
      if (name === newName && newPhone === number) {
        toast.error('You didn`t edit contact.');
        return;
      }
      if (data.length !== 0) {
        const result = data.find(
          contact => contact.name.toLowerCase() === newName.toLowerCase(),
        );
        if (result) return toast.error('This name is busy.');
      }
      updateContact({
        contact: { name: newName, number: newPhone },
        id,
        token,
      });
    },
  });

  const disabledButton = () => {
    if (
      isLoadingUpdate ||
      formik.values.name === '' ||
      formik.values.phone === '' ||
      formik.errors.phone ||
      formik.errors.name
    )
      return true;
    return false;
  };

  return edit ? (
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
        {isLoadingUpdate ? 'Loading...' : 'Edit'}
      </Button>
    </Form>
  ) : (
    <Item>
      <p>{name}:</p>
      <p>{number}</p>
      <button type="button" onClick={() => deleteContact({ id, token })}>
        {isLoading ? 'Loading...' : 'Delete'}
      </button>
    </Item>
  );
}

ContactsItem.propTypes = {
  contact: propTypes.object.isRequired,
  edit: propTypes.bool.isRequired,
};
