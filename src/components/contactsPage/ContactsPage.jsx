import FormAddContact from 'components/contactsPage/FormAddContact';
import FindContact from 'components/contactsPage/FindContact';
import ContactsList from 'components/contactsPage/ContactsList';

export default function ContactsPage() {
  return (
    <section>
      <FormAddContact />
      <FindContact />
      <ContactsList />
    </section>
  );
}
